/**
 * Created by Roman on 07.03.2017.
 */
ig.module(
    "game.entities.pointer"
).requires(
    'impact.entity',
    "plugins.twopointfive.entity"

).defines(function() {
    EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.B,
        size: {x : 1, y: 1},
        isClicking: false,
        lastMouseOver : null,
        lastClickedObject : null,
        pointerImage: new ig.Image('media/cursor.png'),
        init : function( x , y , settings ){
            this.parent( x, y, settings );
            //this.pos.z = ig.input.mouse.y;

            this.lastClickedObject = null;
            this.parent( x, y, settings );
            this.hudPointerTile = new tpf.HudTile( this.pointerImage, 0, 7, 7 );
            this.hudPointerTile.setPosition(ig.input.mouse.x, ig.input.mouse.y);
        },
        update: function() {
            if( ig.system.isFullscreen || ig.system.hasMouseLock ) {
                this.pos.x += ig.input.mouseDelta.x;
                this.pos.y += ig.input.mouseDelta.y;
            }

            //this.pos.z = ig.input.mouse.y;
            //check if somebody is clicking
            this.isClicking = ig.input.pressed('click');
            if (  this.lastMouseOver !== null)
                this.checkMouseOver();
            if ( this.lastClickedObject !== null ){
                var _this = this;
                //timeout used because on collision check we may get several entities, so we have to take
                //the one with the biggest zIndex ( the one on the top layer )
                setTimeout( function(){
                    if ( _this.lastClickedObject  !== null ){
                        if( typeof ( _this.lastClickedObject.clicked ) === 'function' ){
                            _this.lastClickedObject.clicked();
                            _this.lastClickedObject = null;
                        }
                    }
                },50);
            }
        },
        checkMouseOver : function (){
            if( this.lastMouseOver !== null && !this.touches( this.lastMouseOver ) && typeof( this.lastMouseOver.mouseOut ) === 'function' ) {
                this.lastMouseOver.mouseOut();
                this.lastMouseOver = null;
            }
        },

        draw: function() {
            this.hudPointerTile.draw();
        },

        //check click/hover
        check : function( other ) {
            if ( this.isClicking === false) {
                if ( typeof ( other.mouseOver ) === 'function' && this.lastMouseOver !== other ) {
                    other.mouseOver();
                    this.lastMouseOver = other;
                    return true;
                }
                return false;

            }

            if ( typeof ( other.clicked ) !== 'function' ) return false;
            if( this.lastClickedObject === null) return false;
            //check if this layer is above previous one
            if ( this.lastClickedObject.zIndex < other.zIndex ){
                this.lastClickedObject = other;
                return true;
            }
            return false;
        }
    });
});