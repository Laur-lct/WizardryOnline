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
            color:{r:1, g:1, b:1},
            show: true,
            childElements: [],
            onMouseMove:function () {},
            onMouseOut:function () {},
            onClicked:function () {},
            init: function (x,y,image, width, height, color, tile, children) {
                if (image && !width && !height){
                    width = image.width;
                    height = image.height;
                }

                this.parent(image, tile, width, height);

                this.setPosition(x,y);
                if (color)
                    this.setColor(color);
                if (children)
                    this.childElements = children;
            },
            draw: function() {
                if(this.show)
                    ig.system.renderer.pushQuad(this.quad);
                for (var i = 0; i < this.childElements.length; i++)
                    this.childElements[i].draw();
            },
            setColor:function (c) {
                this.color = c;
                this.quad.setColor(this.color);
            },
            setPosition:function (x,y) {
                this.parent(x,y);
                for (var i = 0; i < this.childElements.length; i++)
                    this.childElements[i].setPosition(x - this.x + this.childElements[i].x, y - this.y+this.childElements[i].y);
                this.x = x;
                this.y = y;
            },

            addElement: function (elem) {
                elem.setPosition(this.x + elem.x, this.y+elem.y);
                this.childElements.push(elem);
            },
            
            removeElement: function (elem) {
                for(var i = this.childElements.length - 1; i >= 0; i--)
                    if(this.childElements[i] === elem)
                        this.childElements.splice(i, 1);
            },
            
            checkBounds:function (x,y) {
                if (x >= this.x && x < (this.x+this.tileWidth) && y >= this.y && y < (this.y + this.tileHeight)){
                    for(var i = this.childElements.length - 1; i >= 0; i--){
                        var obj = this.childElements[i].checkBounds(x,y);
                        if (obj)
                            return obj;
                    }
                    return this;
                }
                return null;
            }
        });
        
        UiActionIcon = UiElement.extend({
            selectedColor:{r:0.1, g:1, b:0.1},
            hoverColor:{r:0.2, g:0.5, b:0.5},
            init: function (x,y, image, tile) {
                this.parent(x,y,image, image.height, image.height, null, tile);
                this.defaultColor = this.color;
            },
            onMouseMove: function (){
              if (this.color!= this.selectedColor && this.color != this.hoverColor)
                  this.setColor(this.hoverColor);
            },
            onMouseOut:function () {
                if (this.color!= this.selectedColor)
                    this.setColor(this.defaultColor);
            },
            onClicked:function () {
                if (this.color!= this.selectedColor)
                    this.setColor(this.selectedColor);
                else if (this.color != this.hoverColor)
                    this.setColor(this.hoverColor);
            }
        });

        UiActionButton = UiElement.extend({
            selectedColor:{r:0.1, g:1, b:0.1},
            hoverColor:{r:0.2, g:0.5, b:0.5},
            init: function (x,y, image) {
                this.parent(x,y,image, image.width, image.height);
                this.defaultColor = this.color;
            },
            onMouseMove: function (){
                if (this.color!= this.selectedColor && this.color != this.hoverColor)
                    this.setColor(this.hoverColor);
            },
            onMouseOut:function () {
                if (this.color!= this.selectedColor)
                    this.setColor(this.defaultColor);
            },
            onClicked:function () {
                if (this.color!= this.selectedColor)
                    this.setColor(this.selectedColor);
                else if (this.color != this.hoverColor)
                    this.setColor(this.hoverColor);
            }
        });

        UiAvatarMain = UiElement.extend({
            hpBar:null,
            mpBar:null,
            barHeight:7,
            barSpacing:2,
            init: function (x,y, image) {
                this.parent(x,y,image, image.width, image.height);
                this.hpBar = new UiElement(0, image.height + this.barSpacing, null, image.width, this.barHeight, {r:0.9, g:0, b:0});
                this.mpBar = new UiElement(0, image.height + this.barSpacing * 2 + this.barHeight,null, image.width, this.barHeight, {r:0, g:0, b:0.9});
                this.addElement(this.hpBar);
                this.addElement(this.mpBar);
            },
        });

        UiChat = UiElement.extend({
            messages: null,
            font:null,
            lastCount:0,
            scroll:0,
            maxLines: 5,
            defaultColor: {r:0.7,g:0.7,b:0.7},
            sysColor: {r:0,g:8,b:0},
            init: function (x,y, width, height, font) {
                this.parent(x,y,null, width, height, {r:0,g:0,b:0});
                this.font = font;
                this.font.letterSpacing = 2;
                this.maxLines = Math.floor((height-10)/(font.height+font.lineSpacing));
                this.messages = ig.messages;
            },
            draw:function () {
                this.parent();
                if (this.lastCount < this.messages.length)
                    this._addMessages();
                var maxI = Math.min(this.scroll + this.maxLines +1, this.messages.length);
                for (var i =this.scroll; i < maxI; i++){
                    var msg = this.messages[i];
                    if (msg.sys){
                        this.font.color =this.sysColor;
                        this.font.draw(msg.sys, this.x+this.tileWidth/2, this.y+5 + this.font.height*i, ig.Font.ALIGN.CENTER);
                    }
                    else
                        this.font.draw(msg, this.x+5, this.y+5 + this.font.height*i, ig.Font.ALIGN.LEFT);
                }
                this.font.color = this.defaultColor;
            },
            _addMessages:function () {
                //todo: multiline, colors
                if (this.messages.length > 100)
                    this.messages.splice(0, this.messages.length-100);
                this.scroll = Math.max(0,this.messages.length - this.maxLines);
                this.lastCount = this.messages.length;
            }
        });


        MyHud = tpf.Hud.extend({

            font: new tpf.Font( 'media/chatFont.png' ),
            backgroundImg: new ig.Image( 'media/ui/back.png' ),
            iconImg: new ig.Image( 'media/ui/icons.png' ),
            avatarImg: new ig.Image( 'media/ui/avatar.png' ),
            readyImg: new ig.Image( 'media/ui/ready.png' ),
            spellskillsImg: new ig.Image( 'media/ui/spellskills.png' ),
            elements: [],
            background: null,
            iconHeal:null,
            iconAttack:null,
            iconSpells:null,
            iconDef:null,
            init: function( width, height, showControls ) {
                this.parent(width, height);
                var bakc= new UiElement(0,this.height - this.backgroundImg.height, this.backgroundImg);
                bakc.setAlpha(0.6);

                this.iconAttack = new UiActionIcon(624,30, this.iconImg,0);
                this.iconDef = new UiActionIcon(666,30, this.iconImg,1 );
                this.iconHeal = new UiActionIcon(708,30, this.iconImg,2 );
                this.iconSpells = new UiActionIcon(750,30, this.iconImg,3 );

                bakc.addElement(this.iconAttack);
                bakc.addElement(this.iconDef);
                bakc.addElement(this.iconHeal);
                bakc.addElement(this.iconSpells);
                bakc.addElement(new UiActionButton(706,72, this.readyImg));
                bakc.addElement(new UiActionButton(624,112, this.spellskillsImg));
                bakc.addElement(new UiAvatarMain(534,30, this.avatarImg));
                bakc.addElement(new UiChat(124,30,400,100, this.font));
                this.elements.push(bakc);
            },
            draw: function() {
                this.prepare();
                for (var i=0; i < this.elements.length; i++)
                    this.elements[i].draw();
            }
        });


    });
