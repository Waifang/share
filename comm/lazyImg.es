// 图片懒加载
var lazyImg = function() {
    var me = this;
    me.threshold = 20;
    me.init();
};
lazyImg.prototype = {
    init: function() {
        var me = this;
        me.setImages();
        me.height = window.innerHeight || document.documentElement.clientHeight;
        me.addEvent();
    },
    setImages: function() {
        var me = this;
        var images = $('img[data-lazy],iframe[data-lazy]');
        me.images = Array.prototype.slice.apply(images);
        me.processLoad();
    },
    getImages: function() {
        var me = this;
    },
    loadImage: function(img) {
        var src = img.getAttribute('data-lazy');
        img.src = src;
        img.removeAttribute('data-lazy');
        // setTimeout(function(){//部分android浏览器替换src后不显示图片
        //     img.style.display = "block";
        // },350);
    },
    isElementInViewport: function(el) {
        var me = this;
        var rect = el.getBoundingClientRect(),
            viewportHeight = me.height;
        // if (rect.left >= 0) {
        if (rect.top >= 0) {
            if (rect.top <= viewportHeight) {
                return true;
            }
        } else {
            if (rect.bottom >= 0) {
                return true;
            }
        }
        // }
        return false;
    },
    processLoad: function() {
        var me = this;
        for (var i = 0; i < me.images.length;) {
            if (me.isElementInViewport(me.images[i])) {
                me.loadImage(me.images[i]);
                me.images.splice(i, 1);
            } else {
                i++;
            }
        }
    },
    addEvent: function() {
        var me = this;
        $(window).on("orientationchange resize", function() {
            setTimeout(function() {
                me.height = window.innerHeight || document.documentElement.clientHeight;
            }, 300);
        });
        $(['scroll', 'resize']).each(function(index, eventName) {
            $(window).on(eventName, handle);
        });

        function handle(e) {
            clearTimeout(me.timer);
            me.timer = setTimeout(function() {
                me.processLoad();
                // if (me.images.length === 0) {
                //     $(window).off(e.type, handle);
                //     return true;
                // }
            }, me.threshold);
        }
    }
};
module.exports = lazyImg;
