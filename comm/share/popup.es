/**
 * @file popup上滑弹窗
 * @author dongshihao
 */
define('flying/share/popup',function () {

    // 加载公共css
    var $popupStyle = $('<style data-for="pmd/popup/popup"></style>');
    $popupStyle.text(".c-popup-wrapper{z-index:9998}.c-popup-mask{display:none;position:fixed;left:0;top:0;opacity:0.5;width:100%;height:100%;background:#333;z-index:9999}.c-popup-modal{display:none;position:fixed;left:0;bottom:0;width:100%;background-color:#fff;z-index:10000;margin:0;overflow:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.c-popup-head{font-size:18px;margin:10px 26px}.c-popup-title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.c-popup-remove{line-height:17px;position:absolute;right:8px;top:10px}.c-popup-content{text-align:center;margin:0 26px 10px}.c-flexbox{display:box;display:-webkit-box}");
    $('head').append($popupStyle);

    var PopupFrame = function (opt) {
        var me = this;
        // 设置默认值
        me.options = $.extend({
            title: '',              // 标题，支持html和Zepto对象
            content: '',            // 内容，支持html和Zepto对象
            fullView: false,        // 是否全屏
            duration: 400,          // 动画执行时间
            customClassName: '',    // 自定义样式名
            onOpen: function () {},
            onClose: function () {}
        }, opt);
        // 初始化
        me._init();
    };

    PopupFrame.prototype = {

        constructor: PopupFrame,

        version: '0.0.1',

        /*
        *  初始化：渲染父层dom，阻止遮罩的滚动，弹出popup
        */
        _init: function () {
            var me = this;
            // 渲染父层dom单例
            me._preparePopupWrapper();
            // 阻止遮罩滚动
            me._stopScroll();
            me.popup();
        },
        /*
         * 创建.c-popup-wrapper父容器单例,所有pop内容都append到这个dom中
         */
        _preparePopupWrapper: function () {
            var me = this;
            var popWrapperDom = $('.c-popup-wrapper');
            if (popWrapperDom.length) {
                me.$popupFrame = popWrapperDom;
                me.$popupFrame.empty();
            } else {
                me.$popupFrame = $('<div class="c-popup-wrapper"></div>');
                $(document.body).append(me.$popupFrame);
            }
        },
        /*
        *  阻止mask以及结果层的滚动
        */
        _stopScroll: function () {
            var me = this;
            // 阻止遮罩层滚动,不会影响内部touchmove事件
            me.$popupFrame.on('touchmove', function (e) {
                e.preventDefault();
            });
        },
        /*
        * 父层事件绑定
        */
        _bindEvent: function () {
            var me = this;
            // mask遮罩和绑定退场事件
            me.$popupFrame.on('click', '.c-popup-mask,.c-popup-remove', function () {
                me.closePopup();
            });
        },
        /*
        * 装填&&渲染
        */
        _randerContent: function () {
            var me = this;
            // 遮罩层
            me.$popupMask = $('<div class="c-popup-mask"></div>');
            // modal层
            me.$popupModal = $('<div class="c-popup-modal"></div>');
            // modal内content
            me.$popupContent = $('<div class="c-popup-content"></div>');
            // modal内head
            me.$popupHead = $('<div class="c-popup-head"></div>');
            // 装填head内容
            if (me.options.title) {
                var titleWrapper = $('<div class="c-popup-title"></div>');
                titleWrapper.append(me.options.title);
                me.$popupHead.append(titleWrapper);
            }
            var remove = $('<div class="c-popup-remove c-icon">&#xe61a</div>');
            me.$popupHead.append(remove);
            // 装填content
            me.$popupContent.append(me.options.content);
            // 装填modal
            me.$popupModal.append(me.$popupHead).append(me.$popupContent).addClass(me.options.customClassName);
            // 最后装填外层wrapper
            me.$popupFrame.append(me.$popupModal).append(me.$popupMask);
        },
        /*
        * 弹出层
        */
        popup: function () {
            var me = this;
            var wHeight = $(window).height();
            me._randerContent();
            me._bindEvent();

            // mask淡入
            me.$popupMask.show().css({
                opacity: 0.5
            });
            // 展现modal
            me.$popupModal.show();
            // 计算modal实际高度
            var mHeight = me.$popupModal.height();
            if (me.options.fullView || mHeight > wHeight) {
                me.$popupModal.height('100%');
            }
            // 入场动画
            me.$popupModal.css({
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            }, me.options.duration, 'ease', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                });
                me.options.onOpen();
            });
        },
        /*
        * 关闭弹层
        */
        closePopup: function () {
            var me = this;
            // 退场动画
            me.$popupModal.css({
                '-webkit-transform': 'translate3d(0, 100%, 0)',
                'transform': 'translate3d(0, 100%, 0)'
            }, me.options.duration, 'ease', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                }).hide();
                me.options.onClose();
                me._destroy();
            });
            // mask淡出
            me.$popupMask.css({
                opacity: 0,
                display : 'none'
            });
        },
        /*
        * 解绑事件&清除dom
        */
        _destroy: function () {
            var me = this;
            // 解绑事件
            me.$popupFrame.off('click', '.c-popup-mask,.c-popup-remove');
            // 清除dom
            me.$popupFrame.empty();
        }
    };
    return PopupFrame;
});