/**
 * Created by Roman on 05.03.2017.
 */
// Alter the env to allow impact
// to run without DOM interaction.
var fs = require('fs');
function setupGameEngine(){

    var publicLibPath = './public/lib';
    var serverLibPath = './server';
    var serverResolveLibPath = './src/server';
    var Canvas = function() {
        return {
            addEventListener: function() { },
            style: { },
            getContext: function() {
                // This is the context
                return {
                    save: function() { },
                    translate: function() { },
                    rotate: function() { },
                    restore: function() { },
                    drawImage: function() { },
                    strokeRect: function() { },
                    beginPath: function() { },
                    moveTo: function() { },
                    lineTo: function() { },
                    stroke: function() { },
                    clearPath: function() { },
                    scale: function() { },
                    fillRect: function() { }
                };
            }
        };
    };
    global.window = global;
    global.ImpactMixin = {
        module: function() { return ig; },
        requires: function() {
            var requires = Array.prototype.slice.call(arguments);
            // Go ahead and require the proper files
            requires.forEach(function(name) {
                // Ignore any dom ready type stuff on the server.
                if (name == 'dom.ready') return;
                var path = name.replace(/\./g, '/');
                //first resolve to server implementation
                if(fs.existsSync(serverResolveLibPath + '/'+path +'.js'))
                    require.main.require(serverLibPath + '/' + path);
                else
                    require.main.require(publicLibPath + '/' + path);
            });
            return ig;
        },
        defines: function(func) {
            func(); // immediately execute
        },
        $: function(selector) {
            return new Canvas();
        }
    };
    window.document = { };
    window.addEventListener = function() { };

    // Canvas should be the only element impact uses on the server.
    window.HTMLElement = Canvas;
    return {
        startGame: function(socketServer){
            require.main.require(publicLibPath + '/impact/impact');
            ig.io = socketServer;
            require.main.require(serverLibPath +'/game/main.js');
        }
    };
}

exports.setupGameEngine = setupGameEngine;
