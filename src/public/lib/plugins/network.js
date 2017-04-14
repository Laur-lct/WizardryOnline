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

        spectatorsCount:0,
        playerNames:[],
        myNick: null,
        init: function() {
            var self = this;

            this.socket = io.connect(window.location.origin);
            // This client's events
            this.socket.on('connect', function() {
            }).on('reconnect', function() {
               self.reconnected(this);
            }).on('disconnect', function() {
               self.disconnected(this);
            // basic game events
            }).on('id', function(data) {
                self.id=data.socketId;
                self.playerNames=data.playerNames;
                self.spectatorsCount=data.spectatorsCount;
                ig.game.titleScreen.setMenu(MenuMain);
                ig.messages.push({sys:'SYSTEM: Connected to the game server'});

            }).on('game.pause', function(isPause) {
                if (ig.game.player){
                    if (isPause){
                        ig.game.setTitle(MenuLoader,"Game paused...");
                        ig.messages.push({sys:'Game paused'});
                    }
                    else if(ig.game.player) {
                        ig.game.setGame();
                        ig.messages.push({sys:'Game unpaused'});
                    }
                }
            }).on('game.join', function(data) {
                if (data.ents) {
                    ig.game.loadLevel(LevelBase1);
                    for (var i = 0; i< data.ents.length; i++) {
                        var e = JSON.parse(data.ents[i]);
                        ig.game.spawnEntity(e.classType,e.pos.x,e.pos.y, e);
                    }
                    ig.game.setGame();
                }
                if(data.nick) {
                    self.playerNames.push(data.nick);
                    self.myNick = data.nick;
                    ig.messages.push({sys:data.nick +' joined game'});
                }
                if(data.spectatorsCount != null) {
                    self.spectatorsCount = data.spectatorsCount;
                    ig.messages.push({sys:'Someone is watching you (spectators '+self.spectatorsCount+')'});
                }

            }).on('game.leave', function(data) {
                if(data.nick){
                    for(var i = self.playerNames.length - 1; i >= 0; i--)
                        if(self.playerNames[i] === data.nick)
                            self.playerNames.splice(i, 1);
                    ig.messages.push({sys:data.nick +' left the game'});
                }
                if(data.spectatorsCount != null)
                    self.spectatorsCount = data.spectatorsCount;

            }).on('input.masterChange', function(data) {
                var isMe = data.id == self.id;
                if (self.isMaster != isMe){
                    self.isMaster = isMe;
                    ig.messages.push({sys:'You are the master now!'});
                }
                else {
                    ig.messages.push({sys:'Master changed: '+ data.nick});
                }
            }).on('input.move', function(input) {
                var pl =ig.game.player;
                if (!pl)
                    return;
                pl.inputState.dx = input.dx;
                pl.inputState.dy = input.dy;
                pl.inputState.da = input.da;
                pl.pos.x = input.x;
                pl.pos.y = input.y;
                pl.angle = input.a;

                var xd = input.x - pl.camPosCur.x;
                var yd = input.y - pl.camPosCur.y;
                var ad = input.a - pl.camPosCur.a;
                while (ad > Math.PI)
                    ad-=Math.PI*2;
                while (this.angle < -Math.PI)
                    ad+=Math.PI*2;
                for(var i = 0; i < pl.camPos.length; i++){
                    var idxHead = (pl.camPosIdx+i)%pl.camPos.length;
                    var cp = pl.camPos[idxHead];
                    var part = (i+1) / pl.camPos.length;
                    cp.x = pl.camPosCur.x+xd*part;
                    cp.y = pl.camPosCur.y+yd*part;
                    cp.a = pl.camPosCur.a+ad*part;
                }
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
        // Be sure to call this.parent() to remove entities on reconnect
        // if you override this function.
        reconnected: function(socket) {
            console.log("reconnected");
            ig.game.player = null;
            this.isMaster=false;
            ig.game.entities.forEach(function(ent) {
                ig.game.removeEntity(ent);
            });
        },
        disconnected: function(socket) {
            this.isMaster=false;
            var nick = this.myNick;
            ig.game.setTitle(MenuLoader, "Discnnected. Click to reconnect...", function () {
                ig.client.emit('game.join',{nick:nick})
            });
            ig.game.player = null;
            ig.game.entities.forEach(function(ent) {
                ig.game.removeEntity(ent);
            });
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
        },

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
