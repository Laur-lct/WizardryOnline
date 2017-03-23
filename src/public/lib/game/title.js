ig.module(
    'game.title'
)
    .requires(
        'plugins.twopointfive.font',
        'plugins.twopointfive.world.tile'
    )
    .defines(function(){

        MyTitle = ig.Class.extend({
            camera: null,
            fadeScreen: null,

            width: 800,
            height: 600,
            message: '',

            font: new tpf.Font( 'media/fredoka-one.font.png' ),

            titleImage: new ig.Image( 'media/title.jpg' ),
            animSheet: new ig.AnimationSheet('media/title-anim.jpg', 100, 98),

            titleIAnimTile: null,
            titleIAnimation: null,
            title: null,
            timer: null,

            init: function(text, freeze) {
                // Create the tile for the title image
                this.title = new tpf.HudTile( this.titleImage, 0, 640, 480);
                this.titleIAnimation = new ig.Animation(this.animSheet, 0.07, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,16], false);
                this.titleIAnimation.gotoRandomFrame();

                this.titleAnim = new tpf.HudTile(this.animSheet.image, this.titleIAnimation.tile, 100, 98);
                this.title.setPosition(80, 60,0);
                this.titleAnim.setPosition(288+80, 209+60);

                this.camera = new tpf.OrthoCamera(this.width, this.height);
                this.timer = new ig.Timer();
                this.width = ig.system.width;
                this.height = ig.system.height;
                if (text){
                    this.message = text;
                    this.isFreeze =freeze;
                }
                else
                    this.message = ig.ua.mobile
                    ? 'Tap to Start'
                    : 'Click to Start';
            },

            update: function() {
                this.titleIAnimation.update();
                this.titleAnim.setTile(this.titleIAnimation.tile);
                if(!this.isFreeze && (ig.input.released('shoot') || ig.input.released('click'))) {
                    ig.client.emit('game.join',{nick:'zeb'});
                    this.message ="Loading...";
                    this.isFreeze =true;
                }
            },

            draw: function() {
                ig.system.renderer.setCamera(this.camera);
                this.title.draw();
                this.titleAnim.draw();

                    var alpha = (Math.sin(this.timer.delta() * 4) + 1) * 0.5;
                    this.font.draw(this.message, this.width / 2, 350, ig.Font.ALIGN.CENTER, alpha);
            }
        });

    });