/**
 * Created by Roman on 25.03.2017.
 */
ig.module(
    'game.ui.pointer')
    .requires(
        'plugins.mouse-delta',
        'plugins.twopointfive.world.tile'
    )
    .defines(function() {

        Pointer = ig.Class.extend({
            pointerImage: new ig.Image('media/cursor.png'),
            pointerTile:null,
            width:800,
            height:600,
            x:0,
            y:0,
            dx:0,
            dy:0,
            show: true,

            init: function(width, height){
                this.width = width;
                this.height = height;
                this.pointerTile = new tpf.HudTile(this.pointerImage, 0, this.pointerImage.width, this.pointerImage.height);
                this.x = this.width / 2;
                this.y = this.height / 2;
                this.pointerTile.setPosition(this.x,this.y);

            },

            update: function() {
                if (ig.system.isFullscreen || ig.system.hasMouseLock ) {
                    this.dx = 0;
                    this.dy = 0;
                    if (ig.input.mouseDelta.x || ig.input.mouseDelta.y) {
                        this.dx = ig.input.mouseDelta.x * (this.width / ig.system.width);
                        this.dy = ig.input.mouseDelta.y * (this.height / ig.system.height);
                        this.x = (this.x + this.dx).limit(0, this.width - 2);
                        this.y = (this.y + this.dy).limit(0, this.height - 2);
                        this.pointerTile.setPosition(this.x, this.y, 0);
                    }
                }
                else if (ig.ua.mobile && ig.input.released('click')){
                    this.dx=1;
                    this.x = ig.input.mouse.x * (this.width / ig.system.width);
                    this.y = ig.input.mouse.y * (this.height / ig.system.height);
                }
            },

            draw:function () {
                if((ig.system.isFullscreen || ig.system.hasMouseLock) && this.show)
                    this.pointerTile.draw();
            }
        });
});