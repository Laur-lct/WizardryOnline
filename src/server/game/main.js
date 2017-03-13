ig.module(
    'game.main'
)
    .requires(
        'plugins.network',
        'game.levels.base1',
        'game.entities.player'
    )
    .defines(function() {
        MyGame = ServerGame.extend({
            dead: false,
            paused: false,
            maxPlayers:4,
            init: function() {
                // Load the last level we've been in or the default Base1
                this.loadLevel( this.lastLevel || LevelBase1 );
                this.setPause(true);
            },

            loadLevel: function( data ) {
                this.lastLevel = data;

                // Load the map
                this.parent( data );
                // Remember the floor map, so we know where we can spawn entities
                this.floorMap = this.getMapByName('floor');
            },

            getPlayerCount: function () {
                if( this.player) {
                    return Object.size(this.player.connectedCharacters);
                }
                return 0;
            },

            join: function (data) {
                if (this.getPlayerCount() < this.maxPlayers){
                    this.player.connectedCharacters[data.id] = data;
                    this.setPause(false);
                    return true;
                }
                return false;
            },

            leave: function (id) {
                delete this.player.connectedCharacters[id];

                if (this.getPlayerCount() ==0){
                    this.setPause(true);
                }
            },
            getNextPlayerSocketId: function () {
                for (var i in this.player.connectedCharacters)
                    return i;
                return null;
            },

            update: function(){
                this.parent();
                if( ig.game.player) {
                    this.screen.x = this.player.pos.x - ig.system.width/2;
                    this.screen.y = this.player.pos.y - ig.system.height/2;
                }

            }
        });

        ig.main('#canvas', MyGame, 30, 800, 600, 1);
        ig.system.setServer(NetworkManager);

    });
