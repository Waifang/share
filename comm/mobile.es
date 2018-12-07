移动端开发经验

meta

1、设置移动页面视窗大小，缩放比例，能够缩放等

Viewport

2、禁止将页面中的数字识别为电话号码

<meta name = "format-detection" conent = "telephone = no" />
3、忽略Android平台中对邮箱地址的识别

<meta name = "format-detection" content = "email = no" />
<meta name = "format-detection" content = "telephone = no,email = no" />
Viewport

<meta name = "viewport" content = "
    height = [pixel_value | device-height],
    width = [pixel_value | device-width],
    initial-scale = float_value,
    minimum-scale = float_value,
    maximum-scale = float_value,
    user-scalable = [yes | no],
    target-densitydpi = [dpi_value | device-dpi | high-dpi | medium-dpi | low-dpi]">
—initial-scale:初始化缩放 
—maximum-scale:最大缩放（0.1~10） 
—minimum-scale:最小缩放（0.1~10） 
—user-scalable:用户调整缩放（0.1~10）

响应式

Media Query

1、语法：@media 设备名only（选取条件）not（选取条件）and（设备选取条件），设备二{sRules}

2、在link中使用@media:

<link rel = "stylesheet" type = "text/css" media = "only screen and (max-width:480px),only screen and (max-device-width:480px)" href = "link.css" />
3、在样式表中内嵌@media

@media (min-device-width:1024px) and (max-width:980px),screen and (max-device-width:480px),(max-device-width:480px) and (orientation:landscape),(min-device-width:480px) and (max-device-width:1024px) and (orientation:portrait) {cssrules}
常用H5方法

1、navigator.geolocation

获取位置（经纬度）：

getCurrentPosition(successCallback,[errorCallback],[positionOptions])

包含成功的回调：把经度纬度打印到页面上 
失败的回调：显示失败原因 
下方三个参数是本身自带： 
maximumAge:页面的缓存时间 就是说已经读取过经纬度之后，在这个时间内重新读取的话会从缓存中读取在这个时间之外会重新发送请求进行读取 
timeout：超时时间

定期轮询设备的位置：

watchPosition(successCallback,[errorCallback],[positionOptions])
停止轮询

clearWatch(successCallback,[errorCallback],[positionOptions])
2、scrollIntoView(alignWithTop)

滚动浏览器窗口或容器元素，以便在当前视窗的可见范围内看见当前元素。

3、nacigator.online

离线检测，只读的布尔值，声明了系统是否处于脱机模式

4、navigator.userAgent

css3

1、禁止用户选中文字

-webkit-user-select:none;
2、禁止长按时触发系统菜单

-webkit-touch-callout:none;
3、去除表单元素的默认样式

-webkit-appearance:none;
4、修改webkit表单输入框placeholder的样式

input::-webkit-input-placeholder{...}
input:focus::-webkit-input-placeholder{...}
5、去除可点击元素点击时的默认效果（安卓低端机比较容易出现）

-webkit-tap-highlight-color:rgba(255,0,0,0);
6、屏蔽鼠标事件和触摸事件

pointer-events:none;
常见问题

移动端点击

移动端是没有鼠标概念的 所以尽量不要使用鼠标事件 
touchstart -> mousedown 
touchmove -> mousemove 
touchend -> mouseup

点击穿透

问题核心：移动端click的触发会延时300ms 


解决： 
1、e.preventDefault(); 
在某些场景下是无效的 
2、规范开发 尽量使用touch 避免touch和click混合使用 如果项目在PC和移动端都有使用，可以添加方法进行判断 
图片

软键盘相关

调起键盘

<input type = "email"><!--电子邮件input的键盘-->
<input type = "url"><!--便于输入URL-->
<input type = "tel"><!--电话号码数字键盘，没有小数点-->
<input type = "email"><!--数据键盘，有小数点-->
<!--以下Android不支持-->
    <input type = "date"><!--显示一个日期选择器-->
    <input type = "time"><!--显示一个简单的拾取器来选择小时和分钟-->
    <input type = "month"><!--显示日期选择器的简化版本-->
<!--一下iphone不支持-->
<input type = "text" patter = "[0-9]*" /><!--数字键盘-->
<input type = "text" patter = "\d*" /><!--数字键盘-->
iOS中position：fixed;在调起软键盘是错位 
将position:fixed;布局元素脱离出整体的body布局

键盘弹出遮挡输入框 
scrollIntoView()

浏览器自带前进后退不刷新页面

问题：某些敏感数据回退需要页面刷新

<!--jsp脚本-->
<%
response.setHeader("Cache-Control","no-cache");
response.setHeader("Cache-Control","no-store");
response.setDateHeader("Expires","0");
response.setHeader("Pragma","no-cache");
%>
window.addEventListener('pageshow',function(event){
    if(event.persisted){
        window.location.reload();
    }
})
高清屏分割线太粗

切一个0.5px的图 
0.5px ? no (ios8以上才能显示0.5px) 
background-image,repeat 
:before,:after,scare() 
Android2.3-2.7 不支持伪类选择器 
Less编译

.transform-scale {
    position:relative;
    &:after,
    &:before {
        content:'';
        position:absolute;
        left:0;
        top:0;
        height:1px;
        width:100%;
        -webkit-transform:scaleY(0.5);
        transform:scaleY(0.5);
        -webkit-transform-origin:0 0;
        transform-origin:0 0;
        background:#f00;
    }
    &:after{
        top:auto;
        bottom:0;
        -webkit-transform-origin:0 100%;
        transform-origin:0 100%;
    }
}
input清除按钮问题

参考资料：http://wiki.baidu.com/pages/viewpage.action?pageId=164306713 
把click时间替换成mousedown

部分兼容问题

initial-scale=0.5 
部分手机无效，目前发现有三星GT-N7100 Android 4.4.2系统

background-size(30px);length | percentage | cover | contain

其他

:hover :active 等伪类无效 
touchstart touchend 取代

监听输入框keyup无效 
注册input事件

input输入框高度问题 
Android低端机，placeholder居于顶部，输入框高度最好与文字大小一样

按钮触发touchend，Android低端机输入框不能自动失去焦点，键盘不能下滑 
在body或者按钮上注册touchstart，手动触发input的blur事件

常用第三方库

Fastclick.js 
优点：全局引入，方便省事 
缺点：增加插件冗余

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        Fastclick.attach(document.body);
    },false);
}
zepto touch 
优点：基于zepto，还提供singleTap,doubleTap,longTap,swipe等简单触控类型判断 
缺点：坑多，存在点透问题

isScroll.js 
IOS下由于软键盘唤出后，页面fixed元素会失效，导致跟随页面一起滚动