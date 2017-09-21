var comm = {
	tj: function(opt) {
		var arr = [];
		var CG = CONFIG || {};
		opt = opt || {};
		opt.page = opt.page || CG.page;
		opt.level = opt.level || CG.level;
		opt.ver = opt.osName || CG.osName;
		opt.idfrom = opt.idfrom || CG.idfrom;
		opt.activity_count = opt.activity_count || CG.activity_count;

	    for (var i in opt) {
	        opt[i] && arr.push(i + '=' + opt[i]);
	    }
	    var list = (arr.length > 0 ? '&' : '') + arr.join('&');
	    var tj = '/static/tj.gif?' + list + '&t=' + (new Date()).getTime();
	    (new Image()).src = tj;
	},
	/*
		统计 
		按钮添加统计的方法：html中设置class=cn_addtj，并且设置data-pos属性
	*/
 	addTjEvent: function(clsName){
    	var that = this;
    	var clsName = '.' + (clsName || 'cn_addtj');
    	$('body').on('click', clsName, function(e){
    		e.target.nodeName == 'A' && e.preventDefault();
    		var target = e.target;
    		var nodeName = target.nodeName;
    		var tag = $(e.target);
    		var pos = tag.attr('data-pos');
    		if(pos) {
    			that.tj({pos: pos});
    		}
    		nodeName == 'A' && (location.href = tag.attr('href'));
    	})
    },
	// 判断localStorage支持性
	haoIsJudge: function() {
	    if (!'localStorage' in window) return false;
	    try {
	        var ls = localStorage,
	            num = new Date().getTime();
	        ls.setItem(num, '1');
	        if (ls.getItem(num) === '1') {
	            ls.removeItem(num);
	            return true;
	        } else {
	            return false;
	        }
	    } catch (e) {
	        return false;
	    }
	},
	cookie: {
	    get: function(name) {
	        var cookieArr = document.cookie.split('; ');
	        for (var i = 0, len = cookieArr.length; i < len; i++) {
	            var arr = cookieArr[i].split('=');
	            if (arr[0] === name) {
	                return decodeURIComponent(arr[1]);
	            }
	        }
	        return '';
	    },
	    set: function(name, value, days) {
	        var time = new Date();
	        var days = days || 1;
	        time.setTime(time.getTime() + days * 86400000);
	        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + time.toGMTString() + ';path=/;';
	    },
	    del: function(name) {
	        document.cookie = name + '=;expires=' + (new Date(0)).toGMTString();
	    }
	}
}
module.exports = comm;