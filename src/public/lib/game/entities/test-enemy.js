/**
 * Created by Roman on 15.04.2017.
 */
ig.module(
    'game.entities.test-enemy'
)
    .requires(
        'plugins.twopointfive.entity'
    )
    .defines(function(){


        EntityTestEnemy = tpf.Entity.extend({
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,

            size: {x: 1, y: 1},
            friction:{x:50, y:50},
            scale: 0.3,
            health: 10,
            damage: 10,

            dynamicLight: true,
            _wmBoxColor: '#ff0000',
            emittedLight:{r:0.4,g:0.1,b:0.1},
            lightDissipation:1.8,

            angle: 0,
            speed: 80,
            animSheet: new ig.AnimationSheet( 'media/creatures/enemy_i.png', 58, 155 ),

            init: function( x, y, settings ) {
                if (settings.animSheet==null) {
                    delete settings.animSheet;
                    delete settings.anims;
                    delete settings.scale;
                }
                this.parent( x, y, settings );

                this.addAnim( 'idle', 1, [0] );
                this.hurtTimer = new ig.Timer();
                this.halfSize = this.size.x*this.scale/2;
            },


            update: function() {
                // this.angle = this.angleTo( ig.game.player );
                //
                // this.vel.x = Math.cos(this.angle) * this.speed;
                // this.vel.y = Math.sin(this.angle) * this.speed;
                //
                // if( ig.game.dead ) {
                //     // Move away from the player if he's dead
                //     this.vel.x *= -1;
                //     this.vel.y *= -1;
                // }

                this.parent();
                //emit light
                if (this.emittedLight && ig.game.lightMap){
                     ig.game.lightMap.setLightSource(this.pos.x+this.halfSize,this.pos.y+this.halfSize,this.emittedLight, this.lightDissipation);
                }
            },

            // kill: function() {
            //     var cx = this.pos.x + this.size.x/2;
            //     var cy = this.pos.y + this.size.y/2;
            //     for( var i = 0; i < 20; i++ ) {
            //         ig.game.spawnEntity( EntityEnemyBlobGib, cx, cy );
            //     }
            //     ig.game.blobKillCount++;
            //     this.parent();
            // },

            check: function( other ) {
                // if( this.hurtTimer.delta() < 0 ) {
                //     // Player already hurt during this attack move?
                //     return;
                // }
                //
                // // Only hurt the player once a second
                // this.hurtTimer.set(1);
                //
                //
                // this.vel.x = -this.vel.x;
                // this.vel.y = -this.vel.y;
                // other.receiveDamage( this.damage, this );
            }
        });
    });