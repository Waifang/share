验证数字的正则表达式

验证数字：^[0-9]*$
验证n位的数字：^\d{n}$
验证至少n位数字：^\d{n,}$
验证m-n位的数字：^\d{m,n}$
验证零和非零开头的数字：^(0|[1-9][0-9]*)$
验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
验证非零的正整数：^\+?[1-9][0-9]*$
验证非零的负整数：^\-[1-9][0-9]*$
验证非负整数（正整数 + 0） ^\d+$
验证非正整数（负整数 + 0） ^((-\d+)|(0+))$
验证长度为3的字符：^.{3}$
验证由26个英文字母组成的字符串：^[A-Za-z]+$
验证由26个大写英文字母组成的字符串：^[A-Z]+$
验证由26个小写英文字母组成的字符串：^[a-z]+$
验证由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
验证由数字、26个英文字母或者下划线组成的字符串：^\w+$
验证用户密码:^[a-zA-Z]\w{5,17}$ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
验证是否含有 ^%&',;=?$\" 等字符：[^%&',;=?$\x22]+
验证汉字：^[\u4e00-\u9fa5],{0,}$
验证身份证号（15位或18位数字）：^\d{15}|\d{}18$
验证一年的12个月：^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12”
验证一个月的31天：^((0?[1-9])|((1|2)[0-9])|30|31)$ 正确格式为：01、09和1、31。
整数：^-?\d+$
非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$
正浮点数 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$
负浮点数 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
浮点数 ^(-?\d+)(\.\d+)?$




监听浏览器后退
if (window.history && window.history.pushState) {
    $(window).on('popstate', function() {
        var hashLocation = location.hash;
        var hashSplit = hashLocation.split("#!/");
        var hashName = hashSplit[1];

        if (hashName !== '') {
            var hash = window.location.hash;
            if (hash === '') {
              alert('後退按鈕點擊');
            }
        }
    })
}
window.history.pushState('forward', null, '#');


改变网页标题得文字
document.addEventListener("visibilitychange", function(){
    document.title = document.hidden ? "用户离开了" : "用户回来了";
});


监听pageshow事件阻止页面进入bfcache
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        location.reload();
    }
})


getHash() {
    // Firefox中直接使用location.hash的返回值会强制进行urldecode，这不是我们所期望的
    // 兼容的办法是从location.href里手工解
    var match = location.href.match(/#(.*)$/);
    var hash = match ? match[0] : '';
    if (hash.indexOf('#%7C') === 0){
        // 百度浏览器在内的部分浏览器会把hash自动进行url-encode
        // %7C就是'|'的url-encode
        hash = decodeURIComponent(hash);
    }
    return hash;
}
window.addEventListener('hashchange', function () {
    if (me.getHash() !== '#view = postinfo' && me.getHash() !== '#view = emainInfo') {
        location.reload();
    }
}, false);




