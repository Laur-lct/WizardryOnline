ig.module(
    'game.main'
)
    .requires(
        'impact.game',
        'impact.font',

        'plugins.twopointfive.game',
        'plugins.touch-button',
        'plugins.touch-field',
        'plugins.network',

        'game.levels.base1',

        'game.title',
        'game.ui.hud'
         //,'plugins.twopointfive.debug'
    )
    .defines(function(){ "use strict";

        var width = 800;
        var height = 600;

        var MyGame = tpf.Game.extend({
            maxPlayers:4,
            hud: null,
            pointer: null,

            dead: false,
            titleScreen: null,

            touchButtons: null,
            touchFieldMove: null,
            backImage: new ig.Image( 'media/backImagets.png' ),
            skyOffset: null,

            gravity: 4,
            prevInput: {dx:0,dy:0,da:0},
            init: function() {
                // Setup HTML Checkboxes and mouse lock on click
                if( !ig.ua.mobile ) {
                    ig.$('#requestFullscreen').addEventListener('click', function( ev ) {
                        ig.system.requestFullscreen();
                        ev.preventDefault();
                        this.blur();
                        return false;
                    },false);

                    ig.system.canvas.addEventListener('click', function(){
                        ig.system.requestMouseLock();
                    });
                }

                // Setup Controls
                ig.input.bind( ig.KEY.MOUSE1, 'click' );
                if( ig.ua.mobile )
                    this.setupTouchControls();
                else
                    this.setupDesktopControls();

                this.pointer = new Pointer(800,600);
                this.setTitle(MenuLoader, 'Connecting...');

                // Create the tile for the sky image
                this.backImageTile = new tpf.HudTile(this.backImage, 0, this.backImage.width, this.backImage.height);
                this.backImageTile.setPosition(0, 0,0);
                this.skyOffset = this.backImageTile.tileWidth / (Math.PI * 2);
            },

            setTitle: function(menuClass,text,action) {
                this.titleScreen = new MainTitle(menuClass,text,action);
            },

            setGame: function() {
                this.titleScreen = null;
                this.dead = false;
                this.hud = new MyHud( 800, 600 );
                // Load the last level we've been in or the default Base1
                //if (!this.player)
                //    this.loadLevel( this.lastLevel || LevelBase1 );
            },

            setupDesktopControls: function() {
                // Setup keyboard & mouse controls
                ig.input.bind( ig.KEY.UP_ARROW, 'forward' );
                ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
                ig.input.bind( ig.KEY.DOWN_ARROW, 'back' );
                ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

                ig.input.bind( ig.KEY.C, 'shoot' );
                ig.input.bind( ig.KEY.ENTER, 'shoot' );
                ig.input.bind( ig.KEY.X, 'run' );
                ig.input.bind( ig.KEY.V, 'weaponNext' );

                ig.input.bind( ig.KEY.ESC, 'pause' );

                ig.input.bind( ig.KEY.W, 'forward' );
                ig.input.bind( ig.KEY.A, 'left' );
                ig.input.bind( ig.KEY.S, 'back' );
                ig.input.bind( ig.KEY.D, 'right' );

                ig.input.bind( ig.KEY.SHIFT, 'run' );
                ig.input.bind( ig.KEY.CTRL, 'shoot' );

            },

            setupTouchControls: function() {
                if( this.touchButtons ) { this.touchButtons.remove(); }
                if( this.touchFieldMove ) { this.touchFieldMove.remove(); }

                // Touch buttons are anchored to either the left or right and top or bottom
                // edge of the screen.
                this.touchButtons = new ig.TouchButtonCollection([
                    new ig.TouchButton( 'shoot', {right: 0, bottom: 0}, ig.system.width/2, ig.system.height/4 )
                ]);
                this.touchButtons.align();

                this.touchFieldMove = new ig.TouchField(0, 0, ig.system.width/2, ig.system.height);
            },

            loadLevel: function( data ) {
                this.lastLevel = data;
                this.clearColor = null;

                // Find the info entity
                var info = null;
                for( var i = 0; i < data.entities.length; i++ ) {
                    if( data.entities[i].settings && data.entities[i].settings.name == 'info' ) {
                        info = data.entities[i].settings;
                    }
                }

                // Use the sector size specified in the info entity or default (4)
                this.sectorSize = (info && info.sectorSize) || 4;

                // Load the map
                this.parent( data );

                // Set the fog and fog color (never use fog on mobile)
                if( info && typeof info.fogColor !== 'undefined' && !ig.ua.mobile ) {
                    ig.system.renderer.setFog( parseInt(info.fogColor), info.fogNear, info.fogFar );
                }
                else {
                    ig.system.renderer.setFog( false );
                }

                // Remember the floor map, so we know where we can spawn entities
                this.floorMap = this.getMapByName('floor');
            },


            update: function() {
                this.pointer.update();
                if( this.titleScreen ) {
                    // If we have a menu don't update anything else
                    this.titleScreen.update();
                    return;
                }
                if( this.dead ) {
                    // Wait for keypress if we are dead
                    if( ig.input.released('shoot') || (!ig.ua.mobile && ig.input.released('click')) ) {
                        this.setTitle();
                    }
                }

                this.processInput();
                // Update all entities and backgroundMaps
                this.parent();
            },

            processInput:function () {
                var dx=0, dy=0, da=0; //from 1 to -1
                if(ig.input.state('forward')) dy = 0.5;
                else if(ig.input.state('back')) dy = -0.5;

                if(ig.input.state('left')) da = 0.75;
                else if(ig.input.state('right')) da = -0.75;

                // Sidestep
                if(ig.input.state('stepleft')) dx = 0.5;
                else if(ig.input.state('stepright')) dx = -0.5;

                // Touch controls
                if( ig.game.touchFieldMove ) {
                    var fi = ig.game.touchFieldMove.input;
                    //dx = -(fi.x/60).limit(-1, 1);
                    dy = -(fi.y/60).limit(-0.75, 0.75);
                    if (dy < 0.1 && dy > - 0.1)
                        dy=0;
                    da = -(fi.x/100).limit(-1, 1);
                    if (da < 0.1 && da > - 0.1)
                        da=0;
                }

                if (ig.client && ig.client.isMaster && (this.prevInput.dx!=dx ||this.prevInput.dy!=dy ||this.prevInput.da!=da)){
                    ig.client.inputMove({dx:dx, dy:dy, da:da});
                }
                //this.prevInput.dx =dx;
                this.prevInput.dy =dy;
                this.prevInput.da =da;

            },

            drawHud: function() {
                if( this.titleScreen )
                    this.titleScreen.draw();
                else if( this.player )
                    this.hud.draw();
                this.pointer.draw();
            }
        });


        document.body.className =
            (ig.System.hasWebGL() ? 'webgl' : 'no-webgl') + ' ' +
            (ig.ua.mobile ? 'mobile' : 'desktop');


        if( window.Ejecta ) {
            var canvas = ig.$('#canvas');
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
        }
        else if( ig.ua.mobile ) {
            ig.$('#game').className = 'mobile';
            var canvas = ig.$('#canvas');

            // Listen to the window's 'resize' event and set the canvas' size each time
            // it changes.
            // Wait 16ms, because iOS might report the wrong window size immediately
            // after rotation.
            window.addEventListener('resize', function(){ setTimeout(function(){
                if( ig.system ) { ig.system.resize( window.innerWidth, window.innerHeight ); }
                if( ig.game ) { ig.game.setupTouchControls(); }
            }, 16); }, false);

            width = window.innerWidth;
            height = window.innerHeight;
        }

        //ig.$("#debugOut").append(navigator.userAgent);

        //ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A];

        // Test WebGL support and init
        if( ig.System.hasWebGL() ) {
            ig.main( '#canvas', MyGame, 60, width, height, 1, tpf.Loader );
            ig.messages=['Welcome to Wizardry online!'];
            ig.system.setClient(NetworkManagerClient);

        }
        else {
            ig.$('#game').style.display = 'none';
            ig.$('#no-webgl').style.display = 'block';
        }

    });