define('flying/share/init', ['flying/share/share'], function (Share) {
	var appData = {//手百分享数据
		id : 'earth-metal',//分享按钮dom id
		type : 'url',//分享连接
		mediaType : "all", // 所有平台（调起分享面板）
		title : "di qi", // 分享的标题
		content : "我在上海已经熄灯了第1,000次", //可根据需要与title不同，此处仅为示例
		iconUrl : "", // 链接分享中的缩略图
		image : "",
		linkUrl : 'https://www.baidu.com/home/fstar/show/main',
        source: 'earth'
	};
	var webData = {
		url : 'https://www.baidu.com/home/fstar/show/main',//分享链接
		title: '【星耀新年】助力爱豆赢10亿福利！',//字符串，自定义的分享标题(QZONE 网页版不支持)
		content: '快来支持你家爱豆，靠实力拿iPhone7~',//字符串，自定义的分享内容
		iconUrl: '',//url，自定义的分享图片
		icon: '',//字符串，按钮的图标地址
        source : 'earth'
	};

	return {
		init : function (dom, data) {
			//alert('share init...');
			var data2 = data ? data : {};
			if (window.info.isBaiduAppFont) {
				//alert(data.starids);

				/*if (data.starids) {
					data.starids.forEach(function (item) {
						alert(item);
						Box.share($.extend(appData, data2, {id: item}));
					});
				}
				else {*/
					//alert('okok');
					Box.share($.extend(appData,data2));
				//}
			} else {
				var share = new Share($.extend(webData,data2));
				if (dom) {
					//alert('body click...'+ dom);
					$(dom).on('click', function (e) {
					    share.popup();
					});
				} else {
					//alert('share-btn click...');
					$('#share').on('click', function () {
						share.popup();
				    });
				}
			}
			
		}

	};
});
