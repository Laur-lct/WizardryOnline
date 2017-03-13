/**
 * Created by Roman on 07.03.2017.
 */
ig.module(
    'game.entities.player'
)
    .requires(
        'plugins.twopointfive.entity'
    )
    .defines(function(){
        EntityPlayer = ig.Entity.extend({
            type: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            size: {x: 32, y: 32},
            angle: 0,
            turnSpeed: (120).toRad(),
            moveSpeed: 192,

            health: 100,
            maxHealth: 100,

            inputState: {dx:0, dy:0, da:0 },
            //currentLightColor: {r:1, g:1, b:1, a:1},

            // hurtSounds: [
            //     new ig.Sound('media/sounds/hurt1.*'),
            //     new ig.Sound('media/sounds/hurt2.*'),
            //     new ig.Sound('media/sounds/hurt3.*')
            // ],

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                ig.game.player = this;
            },

            ready: function() {
                var cx = this.pos.x + this.size.x/2,
                    cy = this.pos.y + this.size.y/2;
                ig.system.camera.position[0] = cx;
                ig.system.camera.position[2] = cy;
            },

            update: function() {
                var dx=this.inputState.dx;
                var dy=this.inputState.dy;
                this.angle += this.turnSpeed * this.inputState.da * ig.system.tick;

                // Normalize movement vector
                if( Math.abs(dx) + Math.abs(dy) > 1 ) {
                    dx *= Math.SQRT1_2;
                    dy *= Math.SQRT1_2;
                }

                this.vel.x = -Math.sin(this.angle) * dy * this.moveSpeed - Math.sin(this.angle+Math.PI/2) * dx * this.moveSpeed;
                this.vel.y = -Math.cos(this.angle) * dy * this.moveSpeed - Math.cos(this.angle+Math.PI/2) * dx * this.moveSpeed;

                // Calculate new position based on velocity; update sector and light etc...
                this.parent();

                // Update camera position and view angle
                var cx = this.pos.x + this.size.x/2,
                    cy = this.pos.y + this.size.y/2;

                ig.system.camera.setRotation(0,0, this.angle );
                ig.system.camera.setPosition( cx, cy, 0 );
            },

            kill: function() {
                ig.game.hud.showMessage('You are Dead!', tpf.Hud.TIME.PERMANENT);
                ig.game.showDeathAnim();
                this.parent();
            },

            setLight: function( color ) {
                //this.currentLightColor = color;
                // if( this.currentWeapon ) {
                //     this.currentWeapon.setLight( color );
                // }
            }
        });

    });