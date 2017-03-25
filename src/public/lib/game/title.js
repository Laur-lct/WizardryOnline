ig.module(
    'game.title'
)
    .requires(
        'game.menu',
        'plugins.twopointfive.font',
        'plugins.twopointfive.world.tile'
    )
    .defines(function(){

        MenuMain = ig.Menu.extend({
            items: [{
                text: 'Create Game',
                disabled: function() {
                    return ig.client.playerNames.length > 0;
                },
                ok: function() {
                    //ig.client. restart game
                    ig.game.titleScreen.setMenu(MenuChoosePlayer);
                }
            }, {
                text: function () {
                    return 'Join Game ('+ig.client.playerNames.length +'/'+ig.game.maxPlayers+')';
                },
                disabled: function() {
                    return ig.client.playerNames.length >= ig.game.maxPlayers;
                },
                ok: function() {
                    ig.game.titleScreen.setMenu(MenuChoosePlayer);
                }
            }]
        });
        MenuLoader = ig.Menu.extend({
            items: [{text: 'Loading...'}],
            init: function (width, height, ypos, text, action) {
                this.parent(width, height, ypos);
                if (text)
                    this.items[0].text = text;
                if(action && typeof (action) == 'function')
                    this.items[0].ok = action;
            },
            update: function () {
                if (this.items[0].ok){
                    if (ig.input.released('click') && (ig.system.hasMouseLock || ig.ua.mobile))
                        this.items[0].ok();
                    else if (ig.input.released('shoot') && !ig.ua.mobile)
                        this.items[0].ok();
                }
            }
        });
        var joinAndSwitchFunc = function (nick) {
            return function () {
                if (nick) ig.client.emit('game.join', {nick: nick});
                else ig.client.emit('game.join');
                ig.game.titleScreen.setMenu(MenuLoader);
            }
        };
        MenuChoosePlayer = ig.Menu.extend({
            items: [{
                text: 'Mage',
                disabled: function () {return ig.client.playerNames.indexOf('Mage') >=0;},
                ok: joinAndSwitchFunc('Mage')
            }, {
                text: 'Warrior',
                disabled: function () {return ig.client.playerNames.indexOf('Warrior') >=0;},
                ok: joinAndSwitchFunc('Warrior')
            }, {
                text: 'Ranger',
                disabled: function () { return ig.client.playerNames.indexOf('Ranger') >=0;},
                ok: joinAndSwitchFunc('Ranger')
            }, {
                text: 'Losos',
                disabled: function () {return ig.client.playerNames.indexOf('Losos') >=0;},
                ok: joinAndSwitchFunc('Losos')
            }, {
                text: 'Join as spectator',
                disabled: function () {return true},
                ok: joinAndSwitchFunc()
            }]
        });

        MainTitle = ig.Class.extend({
            camera: null,
            fadeScreen: null,

            width: 800,
            height: 600,
            currentMenu: null,

            background:null,
            font: new tpf.Font( 'media/fredoka-one.font.png' ),

            titleImage: new ig.Image( 'media/title.jpg' ),
            cursorImage: new ig.Image('media/cursor.png'),
            animSheet: new ig.AnimationSheet('media/title-anim.jpg', 100, 98),

            titleTile: null,
            titleIAnimTile: null,
            titleIAnimation: null,

            cursor:null,

            init: function(menuClass, text, action) {

                // todo remove later
                this.background = new tpf.Quad(this.width, this.height);
                this.background.setPosition(this.width/2, this.height/2,0);
                this.background.setColor({r:0, g:0, b:0});

                // Create the tile for the title image
                this.titleTile = new tpf.HudTile( this.titleImage, 0, 640, 480);
                this.titleTile.setPosition(80, 60,0);

                this.titleIAnimation = new ig.Animation(this.animSheet, 0.07, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,16], false);
                this.titleIAnimation.gotoRandomFrame();

                this.titleAnim = new tpf.HudTile(this.animSheet.image, this.titleIAnimation.tile, 100, 98);
                this.titleAnim.setPosition(288+80, 209+60);

                this.camera = new tpf.OrthoCamera(this.width, this.height);

                this.cursor = new tpf.HudTile(this.cursorImage, 0, this.cursorImage.width, this.cursorImage.height);
                this.cursor.x = this.width / 2;
                this.cursor.y = this.height / 2;
                this.cursor.setPosition(this.cursor.x,this.cursor.y);


                this.setMenu(menuClass ? menuClass : MenuMain, text, action);
            },

            setMenu: function(MenuClass, text, action) {
                this.currentMenu = new(MenuClass)(this.width, this.height, 0, text, action);
            },

            update: function() {
                this.titleIAnimation.update();
                this.titleAnim.setTile(this.titleIAnimation.tile);

                if (ig.system.isFullscreen || ig.system.hasMouseLock ) {
                    if (ig.input.mouseDelta.x || ig.input.mouseDelta.y) {
                        var s = this.width / ig.system.width;
                        this.cursor.x = (this.cursor.x + ig.input.mouseDelta.x * s).limit(0, this.width - 2);
                        this.cursor.y = (this.cursor.y + ig.input.mouseDelta.y * s).limit(0, this.height - 2);
                        this.cursor.setPosition(this.cursor.x, this.cursor.y, 0);
                    }
                }
                else if (ig.ua.mobile && ig.input.released('click')){
                    var sw = this.width / ig.system.width;
                    var sh = this.height / ig.system.height;
                    this.cursor.x = ig.input.mouse.x * sw;
                    this.cursor.y = ig.input.mouse.y * sh;
                }
                this.currentMenu.update(this.cursor.x, this.cursor.y);
            },

            draw: function() {
                ig.system.renderer.setCamera(this.camera);
                ig.system.renderer.pushQuad(this.background);
                this.titleTile.draw();
                this.titleAnim.draw();
                this.currentMenu.draw();
                if(ig.system.hasMouseLock)
                    this.cursor.draw();
            }
        });

    });