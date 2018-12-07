/**
 * @file 调起辣眼客户端
 * @author Aran(wangranran@baidu.com)
 */

function isWechat() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
}

function isMobileQQ() {
    return /^(?!.*Safari).*QQ/.test(navigator.userAgent);
}

function isAndroid() {
    return /android/i.test(navigator.userAgent);
}

function callapp(schema, immediateDownload) {

    var ifr = document.createElement('iframe');
    ifr.src = schema;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);

    setTimeout(function () {
        
        if(isAndroid()){
            document.body.removeChild(ifr);
            setTimeout(function(){
                $(".tanThre").show();
                 setTimeout(function(){
                 window.location.href = immediateDownload;
                    $(".tanThre").hide();
                },3000)
            },1000)
            
         }else{
            $(".tanTwo").show();
         }
        
    }, 1000);
}

module.exports = function(linkElementSelector) {

    if (linkElementSelector == null) {
        return;
    }

    $(linkElementSelector).on('click', function () {
        $(linkElementSelector).attr('disabled','disabled');
        setTimeout(function(){
            $(linkElementSelector).removeAttr('disabled');
        },4000)
        var immediateDownload = $(this).attr('href');
        var schema = 'hao123layan://main/feed';
        var yybao = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.hao123.layan';

        if (isAndroid() && (isWechat() || isMobileQQ())) {
            immediateDownload = yybao;
            $(".tanThre").show();
            setTimeout(function(){
                window.location.href = immediateDownload;
                $(".tanThre").hide();
            },1000)
        } else {
         
            callapp(schema, immediateDownload);
           
        }

        return false;
    });

};
