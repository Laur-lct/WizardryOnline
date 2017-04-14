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
            pointerImage: new ig.Image('media/cursors.png'),
            pointerTile:null,
            width:800,
            height:600,
            x:0,
            y:0,
            dx:0,
            dy:0,
            show: true,
            lastMouseOver : null,
            pressed: false,
            clicked:false,
            init: function(width, height){
                this.width = width;
                this.height = height;
                this.pointerTile = new tpf.HudTile(this.pointerImage, 0, this.pointerImage.height);
                this.x = this.width / 2;
                this.y = this.height / 2;
                this.pointerTile.setPosition(this.x,this.y);

            },

            update: function() {
                this.clicked =ig.input.released('click');
                this.pressed = ig.input.pressed('click');
                if (ig.system.isFullscreen || ig.system.hasMouseLock ) {
                    this.dx = 0;
                    this.dy = 0;

                    if (ig.input.mouseDelta.x || ig.input.mouseDelta.y) {
                        this.dx = ig.input.mouseDelta.x * (this.width / ig.system.width);
                        this.dy = ig.input.mouseDelta.y * (this.height / ig.system.height);
                        this.x = (this.x + this.dx).limit(0, this.width - 2);
                        this.y = (this.y + this.dy).limit(0, this.height - 2);
                        this.pointerTile.setPosition(this.x, this.y, 0);
                        this._checkHudObjects();
                    }
                }
                else if (ig.ua.mobile && (this.clicked || this.pressed)){
                    this.dx=1;
                    this.x = ig.input.mouse.x * (this.width / ig.system.width);
                    this.y = ig.input.mouse.y * (this.height / ig.system.height);
                    this._checkHudObjects();
                }
                if (this.clicked && this.lastMouseOver)
                    this.lastMouseOver.onClicked(this.x, this.y);
            },

            _checkHudObjects: function () {
                var hud = ig.game.hud;
                var obj = null;
                if (hud){
                    for (var i= hud.elements.length-1; i >=0; i--){
                        obj = hud.elements[i].checkBounds(this.x,this.y);
                        if (obj)
                            break;
                    }
                    if(this.lastMouseOver && this.lastMouseOver!= obj)
                        this.lastMouseOver.onMouseOut();
                    if (obj)
                        obj.onMouseMove(this.x,this.y, this.pressed);
                    this.lastMouseOver = obj;
                }
            },

            draw:function () {
                if((ig.system.isFullscreen || ig.system.hasMouseLock) && this.show)
                    this.pointerTile.draw();
            }
        });
});