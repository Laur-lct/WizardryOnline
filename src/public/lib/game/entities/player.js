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

            emittedLight:{r:1,g:0.8,b:0.2},


            health: 100,
            maxHealth: 100,

            inputState: {dx:0, dy:0, da:0 },
            camPos:[{x:0,y:0,a:0},{x:0,y:0,a:0},{x:0,y:0,a:0}],
            camPosHead:null,
            camPosCur:{x:0,y:0,a:0},
            camPosIdx:0,
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
                for(var i=this.camPos.length; i < 6; i++){
                    this.camPos.push({x:this.pos.x,y:this.pos.y,a:this.pos.angle})
                }
                ig.system.camera.position[0] = this.pos.x + this.size.x/2;
                ig.system.camera.position[2] = this.pos.y + this.size.y/2;
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

                this.vel.x = -Math.sin(this.angle) * dy * this.moveSpeed - Math.sin(this.angle + Math.PI/2) * dx * this.moveSpeed;
                this.vel.y = -Math.cos(this.angle) * dy * this.moveSpeed - Math.cos(this.angle + Math.PI/2) * dx * this.moveSpeed;

                // Calculate new position based on velocity; update sector and light etc...
                this.parent();


                this.camPosHead = this.camPos[this.camPosIdx];
                this.camPosCur.x = this.camPosHead.x;
                this.camPosCur.y = this.camPosHead.y;
                this.camPosCur.a = this.camPosHead.a;
                // Update camera position and view angle
                ig.system.camera.setRotation(0,0, this.camPosCur.a );
                ig.system.camera.setPosition( this.camPosCur.x + this.size.x/2, this.camPosCur.y + this.size.y/2, -10 );
                //emit light
                if (this.emittedLight && ig.game.lightMap){
                    ig.game.lightMap.setLightSource(this.camPosCur.x+ this.size.x/2,this.camPosCur.y+ this.size.y/2,this.emittedLight);
                }

                this.camPosHead.x = this.pos.x;
                this.camPosHead.y = this.pos.y;
                this.camPosHead.a = this.angle;

                this.camPosIdx = (this.camPosIdx+1)%this.camPos.length;
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