ig.module( 'game.levels.base1' )
.requires( 'impact.image','game.entities.player' )
.defines(function(){
LevelBase1=/*JSON[*/{
	"entities": [
		{
			"type": "EntityPlayer",
			"x": 808,
			"y": 360
		}
	],
	"layer": [
		{
			"name": "floor",
			"width": 32,
			"height": 32,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/tiles/basic-tiles-64.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,26,26,0,26,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,17,17,2,17,17,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,26,2,17,0,0,17,0,0,17,2,2,10,19,19,19,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,26,2,17,0,0,17,0,0,17,2,2,10,19,19,19,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,17,17,2,17,17,2,2,0,0,0,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,12,9,9,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,9,4,9,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,9,9,4,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,9,9,2,2,0,0],
				[0,0,0,0,0,0,3,9,4,9,4,9,10,2,2,0,0,2,2,10,19,19,19,10,2,9,0,0,9,2,0,0],
				[0,0,0,0,0,0,3,9,12,9,4,12,10,2,2,0,0,2,2,10,19,19,19,10,2,9,0,0,9,2,0,0],
				[0,0,0,0,0,0,12,4,9,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,9,9,2,2,0,0],
				[0,0,0,0,0,0,9,9,9,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,3,3,1,1,4,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,3,3,1,1,1,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "collision",
			"width": 32,
			"height": 32,
			"linkWithCollision": false,
			"visible": 0,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0],
				[0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0],
				[0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "walls",
			"width": 32,
			"height": 32,
			"linkWithCollision": true,
			"visible": 0,
			"tilesetName": "media/tiles/basic-tiles-64.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,15,15,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,29,16,0,0,30,0,0,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,22,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,23,0,0,0,0,0,0,0,0,0,22,13,13,31,31,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,15,0,0,0,14,14,0,14,14,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,15,0,0,0,14,14,0,14,14,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,30,0,0,0,0,0,0,0,0,0,22,13,31,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,16,0,0,0,0,0,0,0,0,0,13,0,31,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,16,22,22,0,0,0,22,30,29,0,0,31,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,7,0,0,0,7,0,0,0,0,31,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,6,0,0,0,16,0,0,0,7,22,0,0,22,7,0,0,0,0,0,22,30,22,29,16,22,0,0],
				[0,0,0,0,0,6,0,0,0,16,0,0,7,0,0,0,0,0,0,7,0,0,0,13,0,0,0,0,0,0,16,0],
				[0,0,0,0,0,7,0,0,0,22,24,24,22,0,0,0,0,0,0,22,24,24,24,23,0,0,0,0,0,0,30,0],
				[0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,14,14,0,0,0,0,0,0,0,0,0,14,14,0,0,15,0],
				[0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,14,14,0,0,0,0,0,0,0,0,0,14,14,0,0,15,0],
				[0,0,0,0,0,22,0,0,0,22,24,24,22,0,0,0,0,0,0,22,24,24,24,23,0,0,0,0,0,0,22,0],
				[0,0,0,0,0,7,0,0,0,7,0,0,7,0,0,0,0,0,0,7,0,0,0,13,0,0,0,0,0,0,13,0],
				[0,0,0,0,0,0,7,15,7,0,0,0,0,7,22,0,0,22,7,0,0,8,8,29,13,13,0,0,13,29,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,24,0,0,4,0,0,0,0,0,0,0,29,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,8,8,5,0,0,0,0,0,0,0,13,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,0,0,0,0,0,0,0,0,5,13,29,13,22,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,5,0,0,0,5,13,16,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,30,13,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "ceiling",
			"width": 32,
			"height": 32,
			"linkWithCollision": false,
			"visible": 0,
			"tilesetName": "media/tiles/basic-tiles-64.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,2,2,2,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,2,2,2,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,2,2,2,2,2,2,3,2,2,0,0,2,2,3,2,2,2,9,2,2,0,0,2,2,0,0],
				[0,0,0,0,0,0,2,2,2,2,2,2,3,2,2,0,0,2,2,3,2,2,2,9,2,2,0,0,2,2,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "light",
			"width": 32,
			"height": 32,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/tiles/lights-64.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,119,119,0,119,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,135,119,103,103,119,103,103,119,135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,119,103,0,0,103,0,0,103,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,119,103,0,0,0,0,0,0,0,103,119,135,131,115,99,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,119,103,0,0,0,0,0,0,0,103,119,135,131,115,99,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,119,103,0,0,103,0,0,103,119,0,0,0,131,131,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,135,119,103,103,119,103,103,119,135,0,0,0,147,147,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,0,0,147,147,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,0,0,131,131,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,0,0,115,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,131,115,99,99,115,131,0,0,0,0,0,140,124,108,108,124,140,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,115,99,83,83,99,115,0,0,0,0,0,124,108,92,92,108,124,0,0],
				[0,0,0,0,0,0,129,129,129,131,147,131,115,99,83,0,0,0,99,115,131,147,156,140,108,92,0,0,92,108,0,0],
				[0,0,0,0,0,0,129,129,129,131,147,131,115,99,83,0,0,83,99,115,131,147,156,140,108,92,0,0,92,108,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,115,99,83,83,99,115,0,0,0,0,0,124,108,92,92,108,124,0,0],
				[0,0,0,0,0,0,129,129,129,0,0,0,0,131,115,99,99,115,131,0,0,0,0,0,140,124,108,108,124,140,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,115,115,0,0,0,0,0,0,0,0,0,124,124,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,131,131,0,0,0,0,85,85,101,117,133,140,140,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,149,149,0,0,0,0,101,101,117,133,149,156,156,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,133,117,101,85,85,101,117,133,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,149,133,117,101,101,117,133,149,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,133,117,117,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
LevelBase1Resources=[new ig.Image('media/tiles/basic-tiles-64.png'), new ig.Image('media/tiles/basic-tiles-64.png'), new ig.Image('media/tiles/basic-tiles-64.png'), new ig.Image('media/tiles/lights-64.png')];
});