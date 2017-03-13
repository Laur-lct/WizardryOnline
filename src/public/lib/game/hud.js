ig.module(
    'game.hud'
)
    .requires(
        'plugins.twopointfive.hud'
    )
    .defines(function(){

        UiElement = ig.Class.extend({
            pos: {x:0,y:0},
            size:{w:0,h:0},
            color:{r:0.9, g:0.3, b:0.5},
            quad: null,
            image: null,
            show: true,
            onMouseMove:function () {},
            onMouseOut:function () {},
            onClicked:function () {},
            init: function (x,y, w, h, backColor, image) {
                this.pos.x = x;
                this.pos.y = y;
                this.size.w = w;
                this.size.h = h;
                this.image = image;
                if (backColor)
                    this.color = backColor;
                this.quad = new tpf.Quad(w, h, image ? image.texture:null);
                this.quad.setPosition(x+this.size.w/2,y+this.size.h/2,0);
                this.quad.setColor(this.color);
            },
            draw: function() {
                if(this.show)
                    ig.system.renderer.pushQuad(this.quad);
            },

            updatePos:function (x,y) {
                this.pos.x = x;
                this.pos.y = y;
                this.quad.setPosition(x+this.size.w/2,y+this.size.h/2,0);
            },
            
            checkBounds:function (x,y) {
                return x >= this.pos.x && x < (this.pos.x+this.size.w) && y >= this.pos.y && y < (this.pos.y + this.size.h);
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
                    ? x - this.size.w + this.barWidth*2+this.barSpacing*3
                    : x + this.size.w - this.barWidth*2 - this.barSpacing*3;
                var barPosY = this.pos.y+this.barSpacing;
                var barPosH = this.size.h-this.barSpacing*2;
                var hpBarPosX = this.origin == 1 ? (this.pos.x + this.size.w - (this.barSpacing+this.barWidth)*2): this.pos.x +this.barSpacing;
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

            //healthIconImage: new ig.Image( 'media/health-icon.png' ),
            //damageIndicatorImage: new ig.Image( 'media/hud-blood-low.png' ),
            //healthIcon: null,
            pointerImage: new ig.Image('media/cursor.png'),
            uiL1: null,
            uiL2: null,
            uiL3: null,
            uiR1: null,
            uiR2: null,
            uiR3: null,
            pos: {x:0,y:0},
            angleX:0,
            angleY:0,
            init: function( width, height, showControls ) {
                this.parent(width, height);

                this.uiL1 = new CharacterAvatarUiElement(0,0);
                this.uiL2 = new CharacterAvatarUiElement(0,80);
                this.uiL3 = new CharacterAvatarUiElement(0,160);
                this.uiR1 = new CharacterAvatarUiElement(700,0);
                this.uiR2 = new CharacterAvatarUiElement(700,80);
                this.uiR3 = new CharacterAvatarUiElement(700,160);
                //this.healthIcon = new tpf.HudTile( this.healthIconImage, 0, 32, 32 );
                //this.healthIcon.setPosition( 96, this.height-this.healthIcon.tileHeight-4 );
                this.hudPointerTile = new tpf.HudTile( this.pointerImage, 0, 15, 21 );
                this.pos.x = width/2;
                this.pos.y = height/2;
            },
            objInBounds:null,
            draw: function() {
                if( ig.system.isFullscreen || ig.system.hasMouseLock ) {
                    if (ig.input.mouseDelta.x || ig.input.mouseDelta.y) {
                        this.pos.x += ig.input.mouseDelta.x;
                        this.pos.y += ig.input.mouseDelta.y;

                        if(this.pos.x <0 ) this.pos.x =0;
                        if(this.pos.x >=this.width ) this.pos.x =this.width-1;
                        if(this.pos.y <0 ) this.pos.y =0;
                        if(this.pos.y >=this.height ) this.pos.y =this.height-1;

                        this.hudPointerTile.setPosition(this.pos.x, this.pos.y);
                        if (this.uiL1.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiL1;
                        if (this.uiL2.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiL2;
                        if (this.uiL3.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiL3;
                        if (this.uiR1.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiR1;
                        if (this.uiR2.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiR2;
                        if (this.uiR3.checkBounds(this.pos.x,this.pos.y))
                            this.objInBounds = this.uiR3;
                    }
                    if (ig.input.pressed('click')){
                        if (this.objInBounds)
                            this.objInBounds.onClicked();
                    }
                    //this.angleY += ig.input.mouseDelta.y/600;
                    //this.angleX += ig.input.mouseDelta.x/600;
                    //ig.system.camera.setRotation(this.angleY,0, ig.game.player.angle);
                    this.prepare();
                    this.uiL1.draw();
                    this.uiL2.draw();
                    this.uiL3.draw();
                    this.uiR1.draw();
                    this.uiR2.draw();
                    this.uiR3.draw();
                    this.hudPointerTile.draw();
                } else{
                    this.prepare();

                    this.uiL1.draw();
                    this.uiL2.draw();
                    this.uiL3.draw();
                    this.uiR1.draw();
                    this.uiR2.draw();
                    this.uiR3.draw();
                }


                // Draw the current message (showMessage(text)) and the damage indicator
                this.drawDefault();
            }
        });


    });
