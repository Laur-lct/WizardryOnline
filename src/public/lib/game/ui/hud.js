ig.module(
    'game.ui.hud'
)
    .requires(
        'game.ui.pointer',
        'plugins.twopointfive.hud'
    )
    .defines(function(){

        UiElement = tpf.HudTile.extend({
            x:0,
            y:0,
            color:{r:0.9, g:0.3, b:0.5},
            show: true,
            onMouseMove:function () {},
            onMouseOut:function () {},
            onClicked:function () {},
            init: function (x,y, width, height, color, image, tile) {
                this.parent(image, tile, width, height);

                this.setPosition(x,y);
                if (color){
                    this.color = color;
                    this.setColor(this.color);
                }
            },
            draw: function() {
                if(this.show)
                    ig.system.renderer.pushQuad(this.quad);
            },

            setPosition:function (x,y) {
                this.x = x;
                this.y = y;
                this.parent(x,y);
            },
            
            checkBounds:function (x,y) {
                return x >= this.x && x < (this.x+this.tileWidth) && y >= this.y && y < (this.y + this.tileHeight);
            }
        });

        CharacterAvatarUiElement = UiElement.extend({
            hpBar:null,
            mpBar:null,
            avatar:null,
            origin:1,//left or right

            barWidth:7,
            barSpacing:1,
            isExpanded: true,
            collapsedX:0,
            expandedX:0,
            clicked:false,
            init: function (x,y) {
                this.parent(x,y,100,80, {r:0.5, g:0.5, b:0.5});
                this.origin = x < 400 ? 1:-1;
                this.expandedX = x;
                this.collapsedX =  this.origin == 1
                    ? x - this.tileWidth + this.barWidth*2+this.barSpacing*3
                    : x + this.tileWidth - this.barWidth*2 - this.barSpacing*3;
                var barPosY = this.pos.y+this.barSpacing;
                var barPosH = this.size.h-this.barSpacing*2;
                var hpBarPosX = this.origin == 1 ? (this.pos.x + this.tileWidth - (this.barSpacing+this.barWidth)*2): this.pos.x +this.barSpacing;
                this.hpBar = new UiElement(hpBarPosX, barPosY,this.barWidth, barPosH, {r:0.9, g:0, b:0});
                this.mpBar = new UiElement(hpBarPosX+this.barSpacing + this.barWidth, barPosY,this.barWidth, barPosH, {r:0, g:0, b:0.9});
                //this.avatar = new UiElement(hpBarPosX+this.barSpacing*2+this.barWidth, barPosY,this.barWidth, this.size.h-this.barSpacing);

                //this.timer = new ig.Timer( 5 );
            },

            draw: function() {
                this.parent();
                this.hpBar.draw();
                this.mpBar.draw();
            },

            updatePos:function (x,y) {
                this.parent(x,y);
                var barPosY = this.pos.y+this.barSpacing;
                //var barPosH = this.size.h-this.barSpacing*2;
                var hpBarPosX = this.origin == 1 ? (this.pos.x + this.size.w - (this.barSpacing+this.barWidth)*2): this.pos.x +this.barSpacing;
                this.hpBar.updatePos(hpBarPosX,barPosY);
                this.mpBar.updatePos(hpBarPosX+this.barWidth+this.barSpacing,barPosY);
            },

            checkBounds: function (x,y) {
                var inBounds = this.parent(x,y);
                if (inBounds && this.pos.x==this.collapsedX)
                    this.updatePos(this.expandedX,this.pos.y);
                else if(!inBounds && this.pos.x == this.expandedX && !this.clicked)
                    this.updatePos(this.collapsedX,this.pos.y);
                return inBounds;
            },

            onClicked: function () {
                this.clicked = !this.clicked;
                if( this.clicked) this.color.r = 0;
                else this.color.r = 0.5;
                this.quad.setColor(this.color);
            }
        });


        MyHud = tpf.Hud.extend({

            font: new tpf.Font( 'media/fredoka-one.font.png' ),
            angleX:0,
            angleY:0,
            backgroundImg: new ig.Image( 'media/ui/back.png' ),
            iconImg: new ig.Image( 'media/ui/icons.png' ),
            background: null,
            iconHeal:null,
            iconAttack:null,
            iconSpells:null,
            iconDef:null,
            init: function( width, height, showControls ) {
                this.parent(width, height);

                this.background = this.background = new tpf.Quad(this.backgroundImg.width, this.backgroundImg.height, this.backgroundImg.texture);
                this.background.setPosition(this.width/2, this.height - this.backgroundImg.height/2,0);
                this.background.setAlpha(0.6);

                this.iconAttack = new tpf.HudTile( this.iconImg, 0, this.iconImg.height);
                this.iconDef = new tpf.HudTile( this.iconImg, 1, this.iconImg.height);
                this.iconHeal = new tpf.HudTile( this.iconImg, 2, this.iconImg.height);
                this.iconSpells = new tpf.HudTile( this.iconImg, 3, this.iconImg.height);

                this.iconAttack.setPosition(624, 490,0);
                this.iconDef.setPosition(666, 490,0);
                this.iconHeal.setPosition(708, 490,0);
                this.iconSpells.setPosition(750, 490,0);

            },
            objInBounds:null,
            draw: function() {
                if( ig.game.pointer.dx || ig.game.pointer.dy ) {
                    var x = ig.game.pointer.x;
                    var y = ig.game.pointer.y;
                    // this.objInBounds = null;
                    // if (this.uiL1.checkBounds(x, y))
                    //     this.objInBounds = this.uiL1;
                    // if (this.uiL2.checkBounds(x, y))
                    //     this.objInBounds = this.uiL2;
                    // if (this.uiL3.checkBounds(x, y))
                    //     this.objInBounds = this.uiL3;
                    // if (this.uiR1.checkBounds(x, y))
                    //     this.objInBounds = this.uiR1;
                    // if (this.uiR2.checkBounds(x, y))
                    //     this.objInBounds = this.uiR2;
                    // if (this.uiR3.checkBounds(x, y))
                    //     this.objInBounds = this.uiR3;
                }
                // if (ig.input.released('click')){
                //     if (this.objInBounds)
                //         this.objInBounds.onClicked();
                // }
                    //this.angleY += ig.input.mouseDelta.y/600;
                    //this.angleX += ig.input.mouseDelta.x/600;
                    //ig.system.camera.setRotation(this.angleY,0, ig.game.player.angle);
                this.prepare();
                ig.system.renderer.pushQuad(this.background);
                this.iconAttack.draw();
                this.iconDef.draw();
                this.iconHeal.draw();
                this.iconSpells.draw();
                // Draw the current message (showMessage(text)) and the damage indicator
                this.drawDefault();
            }
        });


    });
