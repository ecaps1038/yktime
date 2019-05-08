//字符长度判断
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null)
    {
    len += 2;
    }
    else
    {
    len += 1;
    }
    }
    return len;
}

//时间转换
function changeTime1(date){
    var d = new Date(date);
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	if(h<10){
		h = '0'+h;
	}
	if(m<10){
		m = '0'+m;
	}
	if(s<10){
		s = '0'+s;
	}
	var tiems = h+':'+m;	
	return tiems;
}
function changeTime2(date){
    var d = new Date(date);
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	if(M<10){
		M = '0'+M;
	}
	if(D<10){
		D = '0'+D;
	}
	var tiems = Y+'-'+M+'-'+D;
	return tiems;
}
function gettime(date){
	var d = new Date(date);
	return d.getTime();
}


//移动端
// 滚动条
function sideMenuScroll(typ,scroll) {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    }
    else {
    	if(scroll == 1){
    		var $wrap = $('.scroll');
    		$wrap.css('height','968px');
	        $wrap.teoyallScroll({
	            borderRadius: '6px',
	            autoHideScroll: true,
	            autoResetRraw: true
	        });
    	}
        if(typ == 1){
        	$('.head .back').hide();
        }
        $('html').css('zoom',0.7);
    }
}
