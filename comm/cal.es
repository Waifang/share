日历日期组件

距离当前两个月后的日期

function getNextMonth(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 2;  //几个月后就加几
    if (month2 == 14) {  
        year2 = parseInt(year2) + 1;  
        month2 = 2;  //几个月后就为几
    }  
    var day2 = day;  
    var days2 = new Date(year2, month2, 0);  
    days2 = days2.getDate();  
    if (day2 > days2) {  
        day2 = days2;  
    }  
    if (month2 < 10) {  
        month2 = '0' + month2;  
    }  
    var t2 = year2 + '-' + month2 + '-' + day2;  
    return t2;  
}
日历

需要引用对应js,css

<link rel="stylesheet" type="text/css" href="./bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="./bootstrap.min.css">
<script type="text/javascript" src="./jquery-2.1.1.js"></script>
<script type="text/javascript" src="./bootstrap.min.js"></script>
<script type="text/javascript" src="./bootstrap-datetimepicker.js" charset="UTF-8"></script>
2.作为组件具体使用

HTML：
<div class="input-group date startDate" data-link-field="startDate">
      <input class="form-control" size="16" type="text" readonly style="width:145px;float:left;">
      <span class="input-group-addon aa"><span class="glyphicon glyphicon-remove" ></span></span>
      <span class="input-group-addon aa" ><span class="glyphicon glyphicon-th" ></span></span>
</div>
<input type="hidden" id="startDate" value="" />
JS:
$('.startDate').datetimepicker({
　　language:'zh',
　　format:  'yyyy-mm-dd hh:ii',
　　autoclose:true, //选择完时间后自动关闭，默认false（不关闭）
　　todayBtn:'linked',
　　pickerPosition:'bottom-left',
    startDate:new Date(),
    initialDate:new Date()
}).on('changeDate',function(ev){
　　var time = $('#startDate').val();
    var endTime = getNextMonth(time);
　　$('.startDate').datetimepicker('hide');
　　$('.startDate').datetimepicker('setStartDate',time);
    $('.startDate').datetimepicker('setEndDate',endTime);
})
3.具体参数 
$(‘.startDate’).datetimepicker({ 
　　language:’zh’, //语言 
　　format: ‘yyyy-mm-dd’, //时间显示格式 年-月-日 
　　autoclose:true, //选择完时间后自动关闭，默认false（不关闭） 
　　todayBtn:true, //是否显示’today’按钮 如果值为true或’linkd’,则日期底部显示’today’按钮，用以选择当前日期。如果是true的话，’today’按钮仅仅将视图转到当天的日期，如果是’linked’，当天日期将被选中。 
　　todayHighlight: 1,//当天日期高亮 false：不高亮；true：高亮 
　　pickerPosition:’bottom-left’, //选择框的位置 其他值：bottom-left,top-right,top-left 
　　forceParse: 0，//强制解析 在输入的值不是你规定的格式(format)时，会尽量解析成你规定格式 
　　 keyboardNavigation:true, // 方向键改变日期 false：方向键不能改变日期；true：方向键可以改变日期 
　　showMeridian:true, //是否显示上午下午,true显示，false不显示， 
　　initialDate:new Date(), //在打开时默认选择当时的时间，显示在时间日期选择器上。 
　　minuteStep:5, //分钟5分钟为一个值 
　　daysOfWeekDisabled:0, //一周禁用的日期,0-6表示星期日-星期六。 
　　endDate:2017-7-19, // 结束时间 endDate之后的时间都不可以选择。 
　　startDate:new Date(), // 开始时间 startDate之前的日期都不能选择。 
　　weekStart:0 // 一周从那一天开始 0-6表示星期日-星期六。 
})


实现全选，反选的时候，用attr，第一次之后明明checked已有，但是没有反应，应用prop

$(".operation").on("click",function(){
if($(".tr").find("input[type='checkbox']").prop('checked')==true){
    $(".tr").find("input[type='checkbox']").removeAttr('checked');
}else{
    $(".tr").find("input[type='checkbox']").prop("checked",true);
}
$(".two").removeAttr("disabled");
//$('.checkBtn:checked').length    
}) 