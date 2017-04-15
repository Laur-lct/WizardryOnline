/**
 * Created by Roman on 15.04.2017.
 */
ig.module(
    'game.entities.indicators.indicator'
)
    .requires(
        'plugins.twopointfive.entity',
        'impact.entity-pool'
    )
    .defines(function(){
        EntityIndicator = EntityParticle.extend({
            vpos: 0,
            scale: 0.5,
            initialVel: {x:0, y: 0, z: 2.5},
            friction: {x: 10, y: 10, z:0.1},

            lifetime: 2,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            setPosition: function() {
                this.vel.x = this.initialVel.x;
                this.vel.y = this.initialVel.y;
                this.vel.z = this.initialVel.z;

                this.idleTimer = new ig.Timer();
            },
        });
    });