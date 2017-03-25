/**
 * Created by Roman on 22.03.2017.
 */
ig.module(
    'game.menu')
    .requires(
        'plugins.twopointfive.font',
        'plugins.twopointfive.world.tile'
    )
    .defines(function() {
        "use strict";
        ig.Menu = ig.Class.extend({
            name: null,
            font: new tpf.Font('media/fredoka-one.font.png'),
            fontTitle: new tpf.Font('media/fredoka-one.font.png'),
            current: -1,
            lineSpacing: 0,
            items: [],
            alpha: 1,
            alphaActiveNonSelected:0.5,
            alphaInactive:0.15,
            init: function(width, height, ypos) {
                this.width = width;
                this.height = height;
                this.y = ypos || (this.height / 4);
                this.lineSpacing = ig.ua.mobile ? 8 : 0;
                this.alphaActiveNonSelected = ig.ua.mobile ? 0.6: 0.5;
                if (!ig.ua.mobile){
                    for (var i = 0; i < this.items.length; i++) {
                        var item = this.items[i];
                        if (!item.disabled || !item.disabled()) {
                            this.current = i;
                            break;
                        }
                    }
                }

            },
            moveCursor: function(dir) {
                var cnt = this.items.length;
                do {
                    this.current = (this.current + dir) % this.items.length;
                    if (this.current < 0) {
                        this.current = this.items.length - 1;
                    }
                    cnt--;
                } while ((this.items[this.current].disabled && this.items[this.current].disabled()) && cnt >0);
            },
            update: function(mx, my) {
                if (ig.input.pressed('forward')) {
                    this.moveCursor(-1);
                }
                if (ig.input.pressed('back')) {
                    this.moveCursor(1);
                }
                var ys = this.y;
                if (this.name) {
                    ys += this.font.height * 2;
                }
                var xs = this.width / 2;
                var hoverItem = null;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var itemText = typeof (item.text) ==='string' ? item.text: item.text();
                    var w = this.font.widthForString(itemText) / 2 + this.lineSpacing;
                    if ((!item.disabled || !item.disabled()) && mx > xs - w && mx < xs + w && my > ys - this.lineSpacing && my < ys + this.font.height + this.lineSpacing) {
                        hoverItem = item;
                        this.current = i;
                    }
                    ys += this.font.height + this.lineSpacing;
                }
                if (ig.input.released('click') && hoverItem && (ig.system.hasMouseLock || ig.ua.mobile) && this.items[this.current].ok) {
                    this.items[this.current].ok();
                }
                if (ig.input.released('shoot') && !ig.ua.mobile && this.items[this.current].ok) {
                    this.items[this.current].ok();
                }
            },
            draw: function() {
                var s = 1;//this.width / ig.system.width;
                var xs = s * this.width / 2;
                var ys = this.y;
                if (this.name) {
                    this.fontTitle.draw(this.name, xs, ys, ig.Font.ALIGN.CENTER, this.alpha);
                    ys += this.font.height * 2;
                }
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var itemText = typeof (item.text) ==='string' ? item.text: item.text();
                    var alpha = (i == this.current && !ig.ua.mobile) ? 1 : ((!item.disabled || !item.disabled()) ? this.alphaActiveNonSelected : this.alphaInactive);

                    this.font.draw(itemText, xs, ys, ig.Font.ALIGN.CENTER, alpha * this.alpha);
                    ys += this.font.height + this.lineSpacing;
                }
            }
        });
});

