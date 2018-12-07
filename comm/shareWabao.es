 module.exports=function(sel,sels,page){
 	var shareBdOpen = require('assets/comm/shareBdOpen');
    var shareWx = require('assets/comm/shareWx');
    
	var shareConfigDef = {
	    '0630': {
	        title: '周末上手机百度看资讯，10元红包天天送！',
	        content: '手机百度邀你来挖宝，超大红包、流量领不停！手慢无！'
	    },
	    '0701': {
	        title: '于万千人中遇见你，求带回！',
	        content: '手机百度邀你来挖宝，超大红包、流量领不停！快寻找属于你的宝箱吧！'
	    },
	    '0702': {
	        title: '流量用完啦？钱包扁扁的？看这里！',
	        content: '手机百度邀你来挖宝，超大红包、流量领不停！参与手百挖宝活动，分分钟实现小目标！'
	    }
	}
	var shareConf = shareConfigDef[CONFIG.today] || shareConfigDef['0630'];
	shareConf.image = 'http://m.hao123.com/r/image/2017-05-25/037dc447614a393acf0599a1cc9655ff.png';
	shareConf.url = 'http://wapsite.baidu.com/huodong/wabao/promote?idfrom=share';
    var confDef = {
    	options: {
	        title: shareConf.title,
	        content: shareConf.content,
	        linkUrl: location.href,
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