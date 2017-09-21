 module.exports=function(sel,sels,page,ops){
 	var shareBdOpen = require('assets/comm/shareBdOpen');
    var shareWx = require('assets/comm/shareWx');

	var shareConf = {
        title: ops.title,
        content: ops.content
	}
	shareConf.image = 'http://m.hao123.com/r/image/2017-06-15/30e3a9d9b9774d52ef3513dddf8e909f.png';
	shareConf.url = ops.url;
    var confDef = {
    	options: {
	        title: shareConf.title,
	        content: shareConf.content,
	        linkUrl: shareConf.url,
	        iconUrl: shareConf.image
	    },
        channel: 'hao123',
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
        signPackage: CONFIG.signPackage,
        successCb: function(){}, //分享成功回调函数
        errCb: function(e){
        	
        }, //分享失败回调函数
    };
    window.BoxShareData = {
	    "successcallback": "success",// 回调函数名，基本没用
	    "errorcallback": "error",// 回调函数名，基本没用
	    "options": {
	        "type": "url", // 链接分享
	        "mediaType": "all", // 所有平台（调起分享面板）
	        "linkUrl": shareConf.url, // 需要分享的链接
	        "title": shareConf.title, // 分享的标题
	        "content":  shareConf.content, // 可根据需要与title不同，此处仅为示例
	        "iconUrl": shareConf.image, // 链接分享中的缩略图
	    }
	};
	
	shareBdOpen(confDef,sel,sels,'',page);
    shareWx(confDef);
}