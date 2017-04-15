ig.module(
	'plugins.twopointfive.world.light-map'
)
.requires(
	'impact.image',
	'impact.map',

	'plugins.twopointfive.namespace'
)
.defines(function(){ "use strict";


tpf.LightMap = ig.Map.extend({
	white: {r:1, g:1, b:1},
    dataDyn:[[]],
    dirtyCount:0,
    dirtyTiles:[],

	init: function( tilesize, data, tileset ) {
		this.parent( tilesize, ig.copy(data) );

		this.dataDyn = ig.copy(data);
		// Grab the colors from the tileset
		var tilesetName  = tileset instanceof ig.Image ? tileset.path : tileset;
		var tiles = new ig.Image( tilesetName );
		
		var px = ig.getImagePixels(tiles.data, 0, 0, tiles.width, tiles.height).data;
		var colors = [];
		
		for( var y = 0; y < tiles.height; y+=tilesize ) {
			for( var x = 0; x < tiles.width; x+=tilesize ) {
				var index = (y * tiles.width + x) * 4;
				var color = {r:px[index]/255, g:px[index+1]/255, b:px[index+2]/255};
				colors.push( color );
			}
		}
		
		// Go through the map and replace the tile numbers with the 
		// actual color values	
		for( var y = 0; y < this.height; y++ ) {
			for( var x = 0; x < this.width; x++ ) {
				
				// Defaults to white (0xffffff)
				var tile = this.data[y][x];
				this.data[y][x] = tile ? colors[tile-1] : this.white;
				this.dataDyn[y][x] = ig.copy(this.data[y][x]);
				this.dataDyn[y][x].isDirty=0;
                this.dirtyTiles.push({x:0,y:0});
			}
		}
	},
	
	
	getLight: function( x, y ) {
		if( 
			(x >= 0 && x < this.width) &&
			(y >= 0 && y < this.height)
		) {
			return this.dataDyn[y][x];
		} 
		else {
			return this.white;
		}
	},

    lightDissipation: 3.3,
    setLightSource: function( x, y, color, dissipation) {
	    if (!dissipation)
	        dissipation =this.lightDissipation;
        var lightIntensitySpan = /*Math.max(color.r,color.g,color.b)**/dissipation*this.tilesize;

        var xMin = Math.max(x - lightIntensitySpan,0);
        var yMin = Math.max(y - lightIntensitySpan,0);

        var xMax = Math.min(x + lightIntensitySpan, this.pxWidth)+1;
        var yMax = Math.min(y + lightIntensitySpan, this.pxHeight)+1;

        for (var dy=yMin; dy < yMax; dy+=this.tilesize){
            for (var dx=xMin; dx < xMax; dx+=this.tilesize){
                var tx =Math.floor( dx / this.tilesize );
                var ty =Math.floor( dy / this.tilesize );
                //tileCenters
                var cx = tx*this.tilesize + this.tilesize/2;
                var cy = ty*this.tilesize + this.tilesize/2;
                var diffX=x-cx;
                var diffY=y-cy;
                var curTileIntens = Math.max(0,1-Math.sqrt(diffX*diffX+diffY*diffY)/lightIntensitySpan);
                if (curTileIntens> 0.005) {
                    var lightR = color.r * curTileIntens;
                    var lightG = color.g * curTileIntens;
                    var lightB = color.b * curTileIntens;

                    var isUpdated = false;
                    var dynColor = this.dataDyn[ty][tx];
                    if (lightR > 0.01 && dynColor.r<1) {
                        dynColor.r = Math.min(dynColor.r+lightR,1);
                        isUpdated = true;
                    }
                    if (lightG > 0.01 && dynColor.g<1) {
                        dynColor.g = Math.min(dynColor.g+lightG,1);
                        isUpdated = true;
                    }
                    if (lightB > 0.01 && dynColor.b<1) {
                        dynColor.b = Math.min(dynColor.b+lightB,1);
                        isUpdated = true;
                    }
                    if (isUpdated) {
                        if (dynColor.isDirty == 0) {
                            this.dirtyTiles[this.dirtyCount].x = tx;
                            this.dirtyTiles[this.dirtyCount].y = ty;
                            this.dirtyCount += 1;
                        }
                        dynColor.isDirty = 1;

                    }
                }
            }
        }
    },

    applyLightSources:function () {
	    for(var i=0; i< this.dirtyCount; i++){
	        var x = this.dirtyTiles[i].x;
	        var y = this.dirtyTiles[i].y;
            var t =this.dataDyn[y][x];
            for( var m = 0; m < ig.game.backgroundMaps.length; m++ )
                ig.game.backgroundMaps[m].updateLight(x,y,t);

            if(t.isDirty==1){
                t.r = this.data[y][x].r;
                t.g = this.data[y][x].g;
                t.b = this.data[y][x].b;
                t.isDirty=2;
            } else {
                t.isDirty=0;
                var tmp = this.dirtyTiles[i];
                this.dirtyTiles[i] = this.dirtyTiles[this.dirtyCount-1];
                this.dirtyTiles[this.dirtyCount-1] = tmp;
                this.dirtyCount--;
                i--;
            }
        }
    }
});

});
