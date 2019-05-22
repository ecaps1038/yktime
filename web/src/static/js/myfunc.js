
export default {    
    getByteLen(val) {
	    var len = 0;
	    for (var i = 0; i < val.length; i++) {
	    var a = val.charAt(i);
	    if (a.match(/[^\x00-\xff]/ig) != null)
	    {
	    len += 1;
	    }
	    else
	    {
	    len += 1;
	    }
	    }
	    return len;
	},
	//测试图片显示
	getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    },
    changeTime2(date){
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
}
