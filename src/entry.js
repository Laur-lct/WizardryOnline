//bluemix env
var cfEnv = require("cfenv");
var pkg   = require("../package.json");
var cfCore = cfEnv.getAppEnv({name: pkg.name});
//
var restify = require('restify');
var server = restify.createServer(null);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

var rootDir = './src/public';
require('./server/weltmeister').setupWeltmeister(server,rootDir);

//handle all static
server.get(/.*/, restify.serveStatic({
    directory: rootDir,
    default: 'index.html'
}));
//prepare websocket
var io = require('socket.io')(server.server);
//prepare game engine
var engineFactory= require('./server/engineWrapper').setupGameEngine();
engineFactory.startGame(io);

//start the server
server.listen(cfCore.port || 8080, function() {
    console.log('listening: %s', server.url);
});