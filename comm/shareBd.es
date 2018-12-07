/*
 * @file 手百分享相关

 * @content
 	需要引入js：
 	<script type='text/javascript' src='//b.bdstatic.com/searchbox/icms/searchbox/js/common/openjs/shareconfig/2017042015/shareconfig.min.js'></script>
*/
// @para conf参数例子
var confDef = {
	title: 'hao123导航-上网从这里开始',
	content: '优质中文上网导航，收录全网最新资讯、影视、小说、游戏等。',
	linkUrl: location.href,
	iconUrl: 'http://m.hao123.com/logo/static/img/hao123-logo300.jpg',
	channel: 'hao123',
	jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
	signPackage: {
	    appId: ''
	},
	successCb: function(e){alert(e)}, //分享成功回调函数
	errCb: function(e){alert(e)}, //分享失败回调函数
};

module.exports = function (conf) {
    document.addEventListener('DOMContentLoaded', function (event) {
        var successCb = conf.successCb || function(){};
        var errCb = conf.errCb || function(){};
    	conf = conf || {};
    	if(!conf.title){
    		return;
    	}
    	conf.channel = conf.channel || 'hao123';
    	conf.debug = location.search.indexOf('share_debug=1') > 0;
        shareConfig.init({
	            // 是否开启 debug 模式（错误以 alert 形式弹出），默认 false
	            debug: conf.debug,
	            // 渠道，用于做统计，必填（请使用个性的名称，避免和其他产品的 channel 重复、导致统计错误）
	            channel: conf.channel,
	            // 分享标题，选填，默认为 document.title
	            title: conf.title,
	            titleDefault: conf.title,
	            // 分享连接，选填，默认为 location.href
	            linkUrl: conf.linkUrl,
	            // 分享描述，选填。第一，可直接填写描述字符串；第二，可传入一个 elem 如 document.getElementById('div1')；第三，如果不填，默认为 document.body
	            content: conf.content,
	            contentDefault: conf.content,
	            // 分享 icon 图片地址，选填。如果不传入值，会抓取页面第一个大于等于 300 * 300 的图片，1秒之内抓取不到则默认使用手百 logo 图
	            iconUrl: conf.iconUrl,
	            iconUrlDefault: conf.iconUrl,
	            // 手百分享配置（如果使用手百分享，则必填）
	            bdbox: {
	                source: 'hao123' // 用于统计手百分享的来源，必填
	            },
	            // 微信分享配置（如果使用微信分享，则必填），默认百家号公共帐号，安全域 baidu.com
	            wx: {
	                // appId: conf.appId, // 公共帐号 appId ，选填，默认百家号帐号，安全域 baidu.com
	                // jsApiList: [] // 需要使用的 JS 接口列表
	            }
	        },successCb,errCb
        );
    });
}