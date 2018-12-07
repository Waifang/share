/*
 * @file 手百分享相关

 * @content
    需要引入js：
    <script src="//s.bdstatic.com/common/openjs/aio.js?v=201602"></script>
*/
// @para conf参数例子
var confDef = {
    options: {
        title: '',
        content: '',
        linkUrl: '',
        iconUrl: '',
    },
    successCb: function(e){alert(e)}, //分享成功回调函数
    errCb: function(e){alert(e)}, //分享失败回调函数
};
var share = function(conf){
    conf = conf || {};
    //conf.options.imageUrl = conf.options.iconUrl;
    //delete conf.options.iconUrl;
    conf.options.mediaType = 'all';
    var options = encodeURIComponent(JSON.stringify(conf.options));
    window.callback1 = conf.successCb || function(){};
    window.callback2 = conf.errCb || function(){};
    if(Box.os.ios){
        Box.ios.invokeApp('callShare',{
            'options': options,
            'successcallback': window.callback1,
            'errorcallback': window.callback2,
            'minver':'5.3.5'},
        '');
    }
    else {
        Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(conf.options), window.callback1, window.callback2]);
    }
}


function shareNative() {
    var cfg = {
        mediaType: 'all',
        linkUrl: 'http://www.baidu.com',
        title: '这里的参数可以对象可以自定义哦',
        content: 'test baidubox share这里的参数可以对象可以自定义哦',
        iconUrl: 'http://m.baidu.com/static/searchbox/po/act/avengers/wxshare.jpg'
    };
    if (Box.os.android) {
        Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(cfg), window.successFnName || 'console.log', window.errorFnName || 'console.log']);
    } else {
        Box.ios.invokeApp('callShare', {
            options: encodeURIComponent(JSON.stringify(cfg)),
            errorcallback: 'onFail',
            successcallback: 'onSuccess'
        });
    }
}
module.exports = share;