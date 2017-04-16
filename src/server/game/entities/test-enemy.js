/**
 * Created by Roman on 15.04.2017.
 */
ig.module(
    'game.entities.test-enemy'
)

    .defines(function(){


        EntityTestEnemy = ig.Entity.extend({
            createOn: ig.Entity.CREATE_ON.SERVER,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,

            size: {x: 64, y: 64},
            friction:{x:50, y:50},
            scale: 0.3,
            health: 10,
            damage: 10,

            angle: 0,
            speed: 80,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.hurtTimer = new ig.Timer();
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

            //check: function( other ) {
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
            //}
        });
    });