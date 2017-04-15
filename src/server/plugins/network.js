Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

ig.module(
    'plugins.network'
)
.requires(
    'impact.game',
    'impact.font',
    'impact.entity'
)
.defines(function() {
    //this class encapsulates basic networking
    NetworkManager = ig.Class.extend({
        masterSocketId: null,
        clients: { },
        spectatorsCount: 0,
        init: function() {
            var self = this;
            var io = ig.io;
            io.sockets.on('connection', function(socket) {
                socket.emit('id',{socketId:socket.id, playerNames:ig.game.getPlayerNames(), spectatorsCount:self.spectatorsCount});
                console.log("id "+ socket.id +' connected');

                socket.on('game.join', function(data){
                    if (data) { // new player join
                        data.id = socket.id;
                        if (ig.game.join(ig.copy(data))){
                            self.clients[socket.id]=socket;

                            socket.nick = data.nick;
                            socket.broadcast.emit('game.join', data);
                            var pl =ig.game.player;

                            //todo create normal game state
                            data.ents = [];
                            for (var i=0; i < ig.game.entities.length; i++){
                                var e =ig.game.entities[i];
                                data.ents.push(JSON.stringify(e));
                            }
                            socket.emit('game.join', data);


                            if (self.masterSocketId==null) {
                                self.masterSocketId=socket.id;
                                io.sockets.emit('input.masterChange',{id: data.id, nick:data.nick});
                            }
                        }
                    }
                    else { //spectator joined
                        self.clients[socket.id]=socket;

                        self.spectatorsCount = Object.size(self.clients) - ig.game.getPlayerCount();
                        //send all others that spectator joined
                        io.sockets.emit('game.join', {spectatorsCount:self.spectatorsCount});
                        // send game state
                        socket.emit('game.state', {gameState: ig.game.save()});
                    }
                });

                socket.on('input.masterChange', function () {
                    if (ig.game.isPlayer(socket.id) && self.masterSocketId!=socket.id) {
                        self.masterSocketId = socket.id;
                        io.sockets.emit('input.masterChange', {id: socket.id, nick:socket.nick});
                    }
                });

                socket.on('input.move', function (data) {
                    if (socket.id == self.masterSocketId){
                        var pl = ig.game.player;
                        pl.inputState = data;
                        // setTimeout(function () {
                        //     io.sockets.emit('input.move', {dx: data.dx, dy: data.dy, da:data.da, x: pl.pos.x, y: pl.pos.y, a: pl.angle});
                        // }, Math.floor(Math.random() * (100 - 10 + 1)) + 10);
                        io.sockets.emit('input.move', {dx: data.dx, dy: data.dy, da:data.da, x: pl.pos.x, y: pl.pos.y, a: pl.angle});
                    }
                });

                socket.on('input.personal', function (data) {
                     //ig.game.registerPlayerInput({turn: data.t, move:data.m});
                     //io.sockets.emit('move', {m: data.m, t:data.t, x:pl.x, y: pl.y, a:pl.angle});
                });

                socket.on('debug.forceEndBattle', function (data) {
                    if (socket.id == self.masterSocketId){
                        ig.game.forceEndBattle();
                    }
                });
                socket.on('debug.createRandomEnemy', function () {
                    if (socket.id == self.masterSocketId){
                        ig.game.createRandomEnemy();
                    }
                });

                socket.on('disconnect', function () {
                    if (socket.nick){
                        ig.game.leave(socket.id);
                        delete self.clients[socket.id];
                        self.spectatorsCount = Object.size(self.clients) - ig.game.getPlayerCount();
                        socket.broadcast.emit('game.leave', {id: socket.id, nick:socket.nick, spectatorsCount:self.spectatorsCount});
                    }

                    console.log("id "+ socket.id +' left');
                    if (self.masterSocketId==socket.id) {
                        self.masterSocketId = ig.game.getNextPlayerSocketId();
                        if (self.masterSocketId!=null)
                            io.sockets.emit('input.masterChange',{id: self.masterSocketId, nick: self.clients[self.masterSocketId].nick});
                    }
                });
            });
        },

        GameStateSync: function(entities) {
            var data = { type: typeStr, x: x, y: y, settings: settings };
            ig.io.sockets.emit('entity.create', data);
        },

        gamePause:function (isPause) {
            ig.io.sockets.emit('game.pause', isPause);
        },

        entityCreate: function(typeStr, x, y, settings) {
            var data = { type: typeStr, x: x, y: y, settings: settings };
            ig.io.sockets.emit('entity.create', data);
        },
        entityMove: function(entityName,pos) {
            var data = {
                name: entityName,
                x: pos.x,
                y: pos.y,
                a: pos.a,
				dx: pos.dx,
				dy: pos.dy,
                anim: pos.anim
            };
            ig.io.sockets.emit('entity.move', data);
        },
        entityRemove: function(entity) {
            var data = { name: entity.name };
            ig.io.sockets.emit('entity.remove', data);
        },
        classToString: function(classObj) {
            // Node has a relatively thin global object so
            // this is nowhere as stressful as the browser-side.
            var key = '';
            for (var i in global)
                    if (global[i] == classObj)
                        key = i;
            return key; 
        }
    });

    ServerGame = ig.Game.extend({
        setPause: function (isPause) {
            if (isPause!=this.paused){
                this.paused = isPause;
                if (isPause)
                    ig.system.stopRunLoop();
                else
                    ig.system.startRunLoop();
                if (ig.server) {
                    ig.server.gamePause(this.paused);
                }
            }
        },

        spawnEntity: function(type, x, y, settings) {
            // Find the key for the entity type
            var key = typeof type == "string" ? type: ig.server.classToString(type);
            settings = settings || { };
            // Give the entity a unique name. This is the entity id.
            // The server will tell the clients how to move entities based on this id.
            settings.name = ig.Entity._lastId + 1;
            settings.classType = key;
            var ent = this.parent(global[key], x, y, settings);
            //ig.server.entityCreate(key, ent.pos.x, ent.pos.y, settings);
            return ent;
        },
        removeEntity: function(entity) {
            if (entity instanceof EntityServer)
                ig.server.entityRemove(entity);
            this.parent(entity);
        }
    });

    EntityServer = ig.Entity.extend({
        // simple callback when this entity is killed.
        killed: function(ent) { },
        // Stub the currentAnim property
        currentAnim: { 
            angle: 0,
            update: function() { }, 
            draw: function() { }
        },
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.last = this.getPos();
        },
        update: function() {
            this.parent();
            var cur = this.getPos();
            if (this.last.dx   != cur.dx ||
                this.last.dy   != cur.dy ||
                this.last.da   != cur.da ||
                this.last.anim != cur.anim){
                //ig.server.entityMove(this.name,cur);
                this.last = cur;
            }
        },
        getPos: function() {
            return {
                x: this.pos.x,
                y: this.pos.y,
                a: this.angle || 0,
				dx:this.vel.x,
				dy:this.vel.y,
                da:this.turn || 0,
                anim: this.anim
            };
        },
        kill: function() {
            this.parent();
            this.killed(this);
        }
    });

    ig.Entity.CREATE_ON = {
        NONE:0,
        CLIENT: 1,
        SERVER: 2
    };

    // No need to loads images, etc.
    ig.Loader.inject({
        load: function() {
            ig.system.setGame(this.gameClass);
        }
    });

    // System needs to reset client inputs.
    ig.System.inject({
        gameCnt: 0,
        setGame: function(gameClass) {
            this.parent(gameClass);
            this.gameCnt++;
        },
        setServer: function(serverClass) {
            ig.server = new (serverClass)();	
        }
    });

    // Rewrite this function to delay and allow the server class to setup.
    ig.main = function(canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;
        
        var loader = new (loaderClass || ig.Loader)(gameClass, ig.resources);
        setTimeout(function() {
            loader.load();
        }, 5);
    };
});
