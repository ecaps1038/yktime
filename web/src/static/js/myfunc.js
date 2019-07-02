
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
	},
	detiaTime(date){
		var time;
		var d = new Date(date);
		var n = new Date();
		//获取时间戳
		var dd = d.getTime();
		var nn = n.getTime();
		if((nn-dd)<120*1000){
			time = '1分种前';
			return time;
		}else if(120*1000<(nn-dd) && (nn-dd)<60*60*1000){
			time = Math.ceil((nn-dd)/60/1000)+'分钟前';
			return time;
		}else if(60*60*1000<(nn-dd) && d.getDate() == n.getDate()){
			var h = d.getHours();
			var m = d.getMinutes();
			if(m<10){
				m = '0'+m;
			}
			time = h+':'+m;
			return time;
		}else if(d.getDate() < n.getDate() && d.getFullYear() == n.getFullYear()){
			var Y = d.getFullYear();
			var M = d.getMonth() + 1;
			var D = d.getDate();
			var h = d.getHours();
			var m = d.getMinutes();
			if(M<10){
				M = '0'+M;
			}
			if(D<10){
				D = '0'+D;
			}
			if(h<10){
			h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			time = M+'月'+D+'日 '+h+':'+m;
			return tiem;
		}else{
			var Y = d.getFullYear();
			var M = d.getMonth() + 1;
			var D = d.getDate();
			var h = d.getHours();
			var m = d.getMinutes();
			if(M<10){
				M = '0'+M;
			}
			if(D<10){
				D = '0'+D;
			}
			if(h<10){
			h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			time = Y+'年'+M+'月'+D+'日 '+h+':'+m;
			return tiem;
		}
	}

}
