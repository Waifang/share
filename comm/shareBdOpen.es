/*
 * @file 手百分享相关

 * @content
 	需要引入js：<script src="//s.bdstatic.com/common/openjs/aio.js?v=201602"></script>
*/
// @para conf参数例子
//var Share = require('assets/comm/share/share');
var nativeShare = require('assets/comm/nativeShare');
var confDef = {
	options:{
	    title: '',
	    content: '',
	    linkUrl: '',
	    iconUrl: ''
	},
	successCb: function(e){alert(e)}, //分享成功回调函数
	errCb: function(e){alert(e)}, //分享失败回调函数
};

module.exports = function (conf, id,sels,ids,page) {
    var successCb = conf.successCb || function(){};
    var errCb = conf.errCb || function(){};
	conf = conf || {};
	conf.id = '';
	var confBox = {
	    title: conf.options.title,
	    content: conf.options.content,
	    linkUrl: conf.options.linkUrl,
    	type: 'url',
	    image: conf.options.iconUrl,
	    iconUrl: conf.options.iconUrl,
	    success: successCb,
	    fail: errCb,
	};
	window.BoxShareData = {
	    "successcallback": "success",// 回调函数名，基本没用
	    "errorcallback": "error",// 回调函数名，基本没用
	    "options": {
	        "type": "url", // 链接分享
	        "mediaType": "all", // 所有平台（调起分享面板）
	        "linkUrl": conf.options.linkUrl, // 需要分享的链接
	        "title": conf.options.title, // 分享的标题
	        "content":  conf.options.content, // 可根据需要与title不同，此处仅为示例
	        "iconUrl": conf.options.iconUrl, // 链接分享中的缩略图
	    }
	};
  //微信分享
 /* var isUc = navigator.userAgent.indexOf('UCBrowser') > -1;
  var isQq = (navigator.userAgent.indexOf('MQQBrowser') <  navigator.userAgent.indexOf('Mobile'));*/
  var isbaidu = navigator.userAgent.indexOf('baiduhi') > -1;

  var ua = window.navigator.userAgent.toLowerCase();
  var isWechat = ua.match(/MicroMessenger/i) + '' === 'micromessenger';
  var TIME;
  var wechatTips = function () {
      if ($('.c-share-wechat-tips').length) {
          $('.c-share-wechat-tips').show();
      } else {
          $('body').append($('<div class="c-share-wechat-tips"></div>'));
          $('.c-share-wechat-tips').on('click', function () {
              $(this).hide();
              clearTimeout(TIME);
          });
      }

      TIME = setTimeout(function () {
          $('.c-share-wechat-tips').hide();
          clearTimeout(TIME);
      }, 2000);
  };
  if(Box.isBox){//手百内
	 var iShare = Box.share(confBox);
		$(id).on('click', function(){
			iShare(confBox)
		});
	}else if(isWechat){//微信内
      $(id).on("click",function(){
          wechatTips()
      })
  }
  else{//非手百
    confBox.img = conf.options.iconUrl;
    var share_obj = new nativeShare(confBox,sels);
    var qqUrl = 'url=' + encodeURIComponent(conf.options.linkUrl) + '&successurl=' + encodeURIComponent(window.location.href) + '&summary=' + conf.options.content + '&title=' + conf.options.title + '&pics=' + encodeURIComponent(conf.options.iconUrl);
      $('#nativeShare').on('click','.qzone',function(){
        location.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+ qqUrl;
      });
      $('#nativeShare').on('click','.weibo',function(){
        location.href = 'http://s.share.baidu.com?url=' + encodeURIComponent(conf.options.linkUrl) + '&to=tsina' + '&title=' + encodeURIComponent(conf.options.title) + '&pic=' + conf.options.iconUrl;
      });
      $('#nativeShare').on('click','.qq,.weixin_timeline,.weixin',function(){  
          $('.copy').show();  
      });
    
    if(isbaidu){
      $('#nativeShare').on('click','.qzone',function(){
        location.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+ qqUrl;
      });
      $('#nativeShare').on('click','.weibo',function(){
        location.href = 'http://s.share.baidu.com?url=' + encodeURIComponent(conf.options.linkUrl) + '&to=tsina' + '&title=' + encodeURIComponent(conf.options.title) + '&pic=' + conf.options.iconUrl;
      });
      $('#nativeShare').on('click','.qq,.weixin_timeline,.weixin',function(){  
          $('.copy').show().find('.c-share-copytip-link').hide();  
          $('.copy').find('.c-share-copytip').show();
      });
    }
    //分享弹框消失
    var share = $("#nativeShare");
    $(page).on('click', function(){
        share.hide();
    });
　　$('#share').on("click", function (event) {
          event.stopPropagation();
　　　　　if ($("#nativeShare").css("display") == "none") {
                share.show();
　　　　　} else {
　　　　　　　　share.hide();
　　　　　}
　　});
    $(".cancel").on("click",function(){
        share.hide()
    })
     
     //链接弹框消失 
    $(".copy").on("click",'.mask-layer',function(){
        $('.copy').hide();
    })   
    $('.c-share-copytip-cancel-btn').on('click', function () {
        $('.copy').hide();
    });
    $('.c-share-copytip-link').on('click', function(event) {
        return false;
    }); 
    
  }
}

