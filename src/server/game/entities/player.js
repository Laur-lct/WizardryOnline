/**
 * Created by Roman on 07.03.2017.
 */
ig.module(
    'game.entities.player'
)
    .requires(
        'plugins.network'
    )
    .defines(function(){
        var _pi2 =Math.PI/2;
        var _2pi =Math.PI*2;
        EntityPlayer = ig.Entity.extend({
            type: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            size: {x: 32, y: 32},

            angle: 0,
            turnSpeed: (120).toRad(),
            moveSpeed: 192,

            health: 100,
            maxHealth: 100,

            connectedCharacters:{},
            inputState: {dx:0, dy:0, da:0 },

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                ig.game.player = this;
            },

            update: function() {
                var dx=this.inputState.dx;
                var dy=this.inputState.dy;
                this.angle += this.turnSpeed * this.inputState.da * ig.system.tick;
                while (this.angle > Math.PI)
                    this.angle-=_2pi;
                while (this.angle < -Math.PI)
                    this.angle+=_2pi;

                // Normalize movement vector
                if( Math.abs(dx) + Math.abs(dy) > 1 ) {
                    dx *= Math.SQRT1_2;
                    dy *= Math.SQRT1_2;
                }

                this.vel.x = -Math.sin(this.angle) * dy * this.moveSpeed - Math.sin(this.angle+_pi2) * dx * this.moveSpeed;
                this.vel.y = -Math.cos(this.angle) * dy * this.moveSpeed - Math.cos(this.angle+_pi2) * dx * this.moveSpeed;

                // Calculate new position based on velocity; update sector and light etc...
                this.parent();
            }
        });

    });