
var Dialog = function Dialog(obj) {
    var wrapperDom;
    if (obj.target) {
        wrapperDom = typeof obj.target == 'string' ? document.querySelector(obj.target) : obj.target;
    } else {
        wrapperDom = document.body;
    }

    if (!wrapperDom.querySelector('.mask-layer')) {
        var dom = document.createElement('div');
        dom.className = 'mask-layer';
        wrapperDom.appendChild(dom);
        this.maskDom = dom;
    } else {
        this.maskDom = wrapperDom.querySelector('.mask-layer');
    }

    this.wrapper = wrapperDom;
    this.tpl = obj.tpl || '';
};

Dialog.prototype = {
    show: function show() {

        this.render();
        this.bindEvent();
        this.wrapper.querySelector('.dialog-wrap').className += ' show';
        this.maskDom.className += ' show';
    },
    hide: function hide() {
        var dw = this.wrapper.querySelector('.dialog-wrap');
        var ml = this.maskDom;
        dw.className = dw.className.replace(' show', '');
        ml.className = ml.className.replace(' show', '');
    },
    render: function render() {
        var wrap = document.createElement('div');
        wrap.className = 'dialog-wrap';
        wrap.innerHTML = this.tpl;
        this.wrapper.appendChild(wrap);
    },
    bindEvent: function bindEvent() {
        var dom = this.wrapper;
        if (dom.querySelector('.cancel')) {
            dom.querySelector('.cancel').addEventListener('click', function () {
                this.hide();
            }.bind(this), false);
        }
    },
    confirm: function confirm(msg, callback) {
        if (callback) {
            this.callback = callback;
        }
        if (msg) {
            this.msg = msg;
        }
        this.show();
    },
    alert: function alert(msg, callback) {
        if (callback) {
            this.callback = callback;
        }

        this.show();
    }
};
module.exports = Dialog;