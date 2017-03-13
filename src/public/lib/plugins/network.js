ig.module(
    'plugins.network'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function() {
    // This class handles all the communications with the server.
    NetworkManagerClient = ig.Class.extend({
        socket: null,
        id:null,
        isMaster:false,
        init: function() {
            var self = this;

            this.socket = io.connect(window.location.origin);
            // This client's events
            this.socket.on('connect', function() {
               self.connected(this); 
            }).on('reconnect', function() {
               self.reconnected(this);
            }).on('disconnect', function() {
               self.disconnected(this);
            // basic game events
            }).on('id', function(id) {
                self.id=id;
            }).on('game.pause', function(isPause) {
                if (isPause)
                    ig.game.setTile(isPause);
                else
                    ig.game.setGame();
            }).on('game.join', function(isPause) {
                ig.game.setGame();

            }).on('input.masterChange', function(data) {
                var isMe = data.id == self.id;
                if (self.isMaster != isMe){
                    self.isMaster = isMe;
                    //ig.game.hud.changeMasterChatMessage
                }
            }).on('input.move', function(input) {
                ig.game.player.inputState.dx =  input.dx;
                ig.game.player.inputState.dy =  input.dy;
                ig.game.player.inputState.da =  input.da;
                ig.game.player.pos.x = input.x;
                ig.game.player.pos.y = input.y;
                ig.game.player.angle = input.a;

            // Entity events
            }).on('entity.create', function(data) {
                self.entityCreated(data);
            }).on('entity.move', function(data) {
                self.entityMoved(data);
            }).on('entity.remove', function(data) {
                self.entityRemoved(data);
            });
        },
        // This client's events
        // ----------------------------------------
        connected: function(socket) { },
        // Be sure to call this.parent() to remove entities on reconnect
        // if you override this function.
        reconnected: function(socket) { 
            ig.game.entities.forEach(function(ent) {
                ig.game.removeEntity(ent);
            });
        },
        disconnected: function(socket) {
            this.isMaster=false;
        },
        // Entity events
        // ----------------------------------------
        entityCreated: function(data) {
            var ent = ig.game.spawnEntity(window[data.type], data.x, data.y, data.settings);
            ent.type = data.type;
            ig.log('[INFO] Created entity: ' + data.type + ', X: ' + parseInt(data.x) + ', Y: ' + parseInt(data.y) + ', name: ' + data.settings.name);
        },
        entityMoved: function(data) {
            var entity = ig.game.getEntityByName(data.name); 
            if (!entity) return;
            entity.anim = data.anim;
            //entity.nextPos = { x: data.x, y: data.y, a: data.a, dx: data.dx, dy: data.dy };
        },
        entityRemoved: function(data) {
            var entity = ig.game.getEntityByName(data.name);
            if (!entity) return;
            ig.log('[INFO] Destroyed entity: ' + entity.type + ', name: ' + entity.name);
            entity.kill();
        },
        // Helper methods
        // ----------------------------------------
        // NOTE: Should add a throttle for the functions below.
        inputMove: function(data) {
            this.emit('input.move', data);
        },
        emit: function(key, data) {
            this.socket.emit(key, data);
        }
    });

    ig.System.inject({
        setClient: function(clientClass) {
            // Wait until a game has been established before
            // hitting the server.
            var interval = setInterval(function() {
                if (ig.game) {
                    ig.client = new (clientClass)();
                    clearInterval(interval);
                }
            }, 100);
        }
    });

    // Rewrite this function to delay and allow the client class to setup.
    ig.main = function(canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;
        
        var loader = new (loaderClass || ig.Loader)(gameClass, ig.resources);
        setTimeout(function() {
            loader.load();
        }, 100);
    };
});
