
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
	changeTime3(date){
	    var d = new Date(date);
		var Y = d.getFullYear();
		var M = d.getMonth() + 1;
		var D = d.getDate();
		var tiems = Y+'/'+M+'/'+D;
		return tiems;
	},
	detiaTime(date){
		var time;
		var d = new Date(date);
		var n = new Date();
		//获取时间戳
		var dd = d.getTime();
		var h = d.getHours();
		var m = d.getMinutes();
		var Y = d.getFullYear();
		var M = d.getMonth() + 1;
		var D = d.getDate();
		//现在时间
		var nn = n.getTime();
		var hh = n.getHours();
		var mm = n.getMinutes();
		var YY = n.getFullYear();
		var MM = n.getMonth() + 1;
		var DD = n.getDate();

		if((nn-dd)<120*1000){
			time = '刚刚';
			return time;
		}else if(120*1000<(nn-dd) && (nn-dd)<=60*60*1000){
			time = Math.ceil((nn-dd)/60/1000)+'分钟前';
			return time;
		}else if(60*60*1000<(nn-dd) && D == DD && M == MM && Y ==YY){
			if(m<10){
				m = '0'+m;
			}
			time = h+':'+m;
			return time;
		}else if(Y == YY){
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
			time = M+'/'+D+' '+h+':'+m;
			return time;
		}else{
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
			time = Y+'/'+M+'/'+D+' '+h+':'+m;
			return time;
		}
	},
	addEvent(obj,type,fn){
	    if(obj.attachEvent){ //ie
	        obj.attachEvent('on'+type,function(){
	            fn.call(obj);
	        })
	    }else{
	        obj.addEventListener(type,fn,false);
	    }
	},

}
