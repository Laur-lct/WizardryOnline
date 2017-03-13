ig.module('plugins.astar').defines(function() {
    "use strict";
    var AStarNode = function(x, y, parent, hash) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.hash = hash;
        this.closed = false, this.g = this.f = -1
    };
    ig.AStar = ig.Class.extend({
        init: function(map, movement) {
            this.map = map;
            this.neighbors = movement || ig.AStar.MOVEMENT.DIAGONAL;
        },
        getPath: function(sx, sy, dx, dy) {
            var ts = this.map.tilesize;
            var ts2 = ts / 2;
            sx = (sx / ts) | 0;
            sy = (sy / ts) | 0;
            dx = (dx / ts) | 0;
            dy = (dy / ts) | 0;
            var path = this.getTilePath(sx, sy, dx, dy);
            for (var i = 0; i < path.length; i++) {
                var n = path[i];
                n.x = n.x * ts + ts2;
                n.y = n.y * ts + ts2;
            }
            return path;
        },
        getTilePath: function(sx, sy, dx, dy) {
            var width = this.map.width,
                height = this.map.height,
                board = this.map.data;
            var nodes = [];
            var open = [];
            var start = new AStarNode(sx, sy, null, sy * width + sx);
            var destination = new AStarNode(dx, dy, null, dy * width + dx);
            open.push(start);
            nodes[start.hash] = start;
            nodes[destination.hash] = destination;
            while (open.length > 0) {
                var current = open.shift();
                current.closed = true;
                if (current.hash === destination.hash) {
                    var path = [destination];
                    while ((current = current.parent)) {
                        path.unshift(current);
                    }
                    return path;
                }
                for (var i = 0; i < this.neighbors.length; i += 2) {
                    var dirX = this.neighbors[i],
                        dirY = this.neighbors[i + 1];
                    var cx = current.x,
                        cy = current.y;
                    var nx = cx + dirX,
                        ny = cy + dirY;
                    if ((nx < 0 || nx >= width || ny < 0 || ny >= height) || (board[ny][nx] !== 0) || ((dirX === -1 && dirY === -1) && (board[cy - 1][cx] !== 0 || board[cy][cx - 1] !== 0)) || ((dirX === 1 && dirY === -1) && (board[cy - 1][cx] !== 0 || board[cy][cx + 1] !== 0)) || ((dirX === -1 && dirY === 1) && (board[cy][cx - 1] !== 0 || board[cy + 1][cx] !== 0)) || ((dirX === 1 && dirY === 1) && (board[cy][cx + 1] !== 0 || board[cy + 1][cx] !== 0))) {
                        continue;
                    }
                    var hash = ny * width + nx;
                    var isDestination = (hash === destination.hash);
                    var foundInOpen = false;
                    var existing = nodes[hash];
                    if (existing) {
                        if (existing.closed) {
                            continue;
                        } else {
                            foundInOpen = !isDestination;
                        }
                    }
                    if (!foundInOpen || isDestination) {
                        var node = new AStarNode(nx, ny, current, hash);
                        node.g = current.g + this.heuristic(current, node);
                        node.f = node.g + this.heuristic(node, destination);
                        nodes[node.hash] = node;
                        var f = node.f,
                            length = open.length,
                            n;
                        for (n = 0; n < length && open[n].f < f; n++);
                        open.splice(n, 0, node);
                    }
                }
            }
            return [];
        },
        heuristic: function(current, destination) {
            var x = current.x - destination.x,
                y = current.y - destination.y;
            return Math.sqrt(x * x + y * y);
        }
    });
    ig.AStar.MOVEMENT = {
        MANHATTEN: [0, -1, -1, 0, 1, 0, 0, 1],
        DIAGONAL: [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1]
    };
});

