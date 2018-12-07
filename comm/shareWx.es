/*
 @file 微信二次分享

 *content
    需要引入js：
    <script type='text/javascript' src='//res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
*/
// @para conf参数例子
var confDef = {
    options: {
        title: 'ddd',
        content: '优质中文上网导航，收录全网最新资讯、影视、小说、游戏等。',
        linkUrl: location.href,
        iconUrl: 'xxx.jpg'
    },
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
    signPackage: {
        appId: '',
        nonceStr: '',
        timestamp: '',
        signature: ''
    },
    successCb: function(e){}, //分享成功回调函数
    errCb: function(e){} //分享失败回调函数
};

module.exports = function (conf){
    var isWx = navigator.userAgent.match(/MicroMessenger/i);
    conf = conf || {};
    if(!isWx){
        return false;
    }
    $('body').prepend('<div style=" overflow:hidden; width:0px; height:0; margin:0 auto; position:absolute; top:-800px;"><img src="' + conf.options.iconUrl + '"></div>');
    setTimeout(function () {
        conf.jsApiList = conf.jsApiList || ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
        wx.config({
            debug: false,
            jsApiList: conf.jsApiList,
            appId: conf.signPackage.appId,
            nonceStr: conf.signPackage.nonceStr,
            timestamp: conf.signPackage.timestamp,
            signature: conf.signPackage.signature
        });
        var l = {
            title: conf.options.title,
            desc: conf.options.content,
            link: conf.options.linkUrl,
            imgUrl: conf.options.iconUrl,
            success: conf.successCb,
            cancel: conf.errCb
        };
        wx.ready(function () {
            wx.onMenuShareTimeline(l);
            wx.onMenuShareAppMessage(l);
            wx.onMenuShareQQ(l);
            wx.onMenuShareWeibo(l);
            wx.onMenuShareQZone(l)
        })
    }, 1000)
}