/**
 * @file 简约版轮播插件
 * @author 曹宇
 * @qq 261179233 (听♪心)
 */
var  $ = require('assets/comm/jquery');
function Slider($el, options) {
    this.$el = $el;
    this.$pageWrap = this.$el.find('[data-slider=page-wrap]:first');
    this.$pageItems = this.$pageWrap.children();
    this.$paginationWrap = this.$el.find('[data-slider=pagination-wrap]:first');
    this.$paginationItems = this.$paginationWrap.children();
    this.$controllerPrev = this.$el.find('[data-slider=controller-prev]:first');
    this.$controllerNext = this.$el.find('[data-slider=controller-next]:first');
    // this.index = 0;
    this.count = this.$pageItems.length;
    this.lock = false; // 操作锁
    this.options = options || {};

    this.index = typeof this.options.index === 'number' ? this.options.index : 0;
    this.auto = this.options.auto === undefined ? true : this.options.auto; // 是否自动切换
    this.autoSpeed = this.options.autoSpeed || 5000; // 自动切换速速
    this.autoTimer = null; // 自动定时器句柄
    this.callback = this.options.callback || null;
    this.animationType = this.options.animationType || 'slide'; // 切换动画类型，slide：滑动；opacity：显隐变化
    this.animationDirection = this.options.animationDirection || 'horizonal';  // 运动方向, horizonal: 水平; vertical: 垂直

    this.init();
}

Slider.prototype = {
    init: function () {
        var self = this;

        // 样式初始化
        self.styleInit();

        // 事件初始化
        self.eventInit();

        // 自动初始化
        self.autoInit();
    },
    styleInit: function () {
        var self = this;
        for (var i = 0; i < self.count; i++) {
            $(self.$pageItems[i]).css({
                position: 'absolute',
                display: 'block'
            });
            if (i === self.index) {
                $(self.$pageItems[i]).css({
                    left: 0
                });
            } else {
                this.animationDirection === 'horizonal' ? $(self.$pageItems[i]).css({
                    // left: self.$pageWrap.width()
                    // 用10000是因为，当给某些隐藏dom初始化轮播功能时无法获取实际宽度
                    left: 10000
                }) : $(self.$pageItems[i]).css({
                    // 同上
                    top: 10000
                });
            }
        }

        // pagination
        self.refreshPagination();

        if (self.count === 1) {
            self.$controllerPrev.hide();
            self.$controllerNext.hide();
            self.$paginationWrap.hide();
        }
    },
    eventInit: function () {
        var self = this;

        // 鼠标悬浮暂停切换
        self.$el.mouseenter(function (e) {
            // 暂停自动运行
            self.pause();
        }).mouseleave(function (e) {
            // 自动运行
            self.autoInit();
        });

        // 左切换
        self.$controllerPrev.click(function (e) {
            e.preventDefault();
            self.prev.call(self);
            // 重置自动
            self.autoInit();
        });

        // 右切换
        self.$controllerNext.click(function (e) {
            e.preventDefault();
            self.next.call(self);
            // 重置自动
            self.autoInit();
        });

        // pagination
        self.$paginationItems.click(function (e) {
            e.preventDefault();
            self.move($(this).index());
            // 重置自动
            self.autoInit();
        });
    },
    autoInit: function () {
        var self = this;

        self.autoTimer && clearInterval(self.autoTimer);

        if (self.auto) {
            self.autoTimer = setInterval(function () {
                self.next.call(self);
            }, self.autoSpeed);
        }
    },
    pause: function () {
        // 暂停
        var self = this;

        if (self.autoTimer) {
            clearInterval(self.autoTimer);
        }
    },
    move: function (toIndex, direction) {
        var self = this;

        // 切换自己时，中断
        if (toIndex === self.index) {
            return;
        }

        // 运动中操作被锁定
        if (self.lock) {
            return;
        } else {
            self.lock = true;
        }

        // direction 0:prev 1:next
        if (!direction) {
            direction = toIndex < self.index ? -1 : 1;
        }

        function cb() {
            // 执行回调函数
            if (self.callback) {
                self.callback(toIndex);
            }
            self.lock = false;
        }

        if (self.animationType === 'slide') {
            if (this.animationDirection === 'horizonal') {
                $(self.$pageItems[self.index]).animate({
                    left: -direction * self.$pageItems.width()
                });
                $(self.$pageItems[toIndex]).css({
                    left: direction * self.$pageItems.width()
                }).animate({
                    left: 0
                }, function () {
                    cb();
                });
            } else if (this.animationDirection === 'vertical') {
                $(self.$pageItems[self.index]).animate({
                    top: -direction * self.$pageItems.height()
                });
                $(self.$pageItems[toIndex]).css({
                    top: direction * self.$pageItems.height()
                }).animate({
                    top: 0
                }, function () {
                    cb();
                });
            }

        } else if (self.animationType === 'opacity') {
            var index = self.index;
            $(self.$pageItems[index]).css({
                zIndex: 2
            }).animate({
                opacity: 0
            }, function () {
                $(self.$pageItems[index]).css({
                    left: -direction * self.$pageItems.width(),
                    zIndex: 1
                });
            });

            $(self.$pageItems[toIndex]).css({
                left: 0,
                zIndex: 1
            }).animate({
                opacity: 1
            }, function () {
                $(self.$pageItems[toIndex]).css({
                    zIndex: 2
                });
                cb();
            });
        }

        self.index = toIndex;

        // pagination
        self.refreshPagination();
    },
    prev: function () {
        var self = this;

        var toIndex = self.index - 1;
        if (toIndex === -1) {
            toIndex = self.count - 1;
        }

        self.move(toIndex, -1);
    },
    next: function () {
        var self = this;

        var toIndex = self.index + 1;
        if (toIndex === self.count) {
            toIndex = 0;
        }

        self.move(toIndex, 1);
    },
    refreshPagination: function () {
        var self = this;

        self.$paginationItems.removeClass('active').eq(self.index).addClass('active');
    }
};
module.exports = Slider;

