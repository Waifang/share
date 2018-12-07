var comm = {
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