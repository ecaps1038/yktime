
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
	//初始化翻页
    pages(count){
    	var page = Math.ceil(aa.i/4); 
    	if(page>1&&page<=5){
			var htmls='';
			for(i=1;i<=page;i++){
				htmls+='<li>'+i+'</li>';
			}
			$('.page ul span').html(htmls);
			$('.page ul span li').eq(0).addClass('select');
		}else if(page>5){
			var htmls='';
			for(i=1;i<5;i++){
				htmls+='<li>'+i+'</li>';
			}
			htmls+='<p class="none">...</p>';
			htmls+='<li>'+page+'</li>';
			$('.page ul span').html(htmls);
			$('.page ul span li').eq(0).addClass('select');
		}else{
			$('.page ul').html('');
		}
    },

    //实现翻页
    acpage(nowpage,allpage,html){
    	if(allpage>5){
		    if(nowpage>3 && nowpage<allpage-2){
		    	html +='<li>1</li>'+'<p class="none">...</p>';
		    	for(i=nowpage-1;i<nowpage+2;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		    	html +='<p class="none">...</p>'+'<li>'+allpage+'</li>';
		    	$('.page ul span').html(html);
		    }else if(nowpage<4){
		    	for(i=1;i<5;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		   		html +='<p class="none">...</p>'+'<li>'+allpage+'</li>';
		   		$('.page ul span').html(html);
		    }else if(nowpage>allpage-3){
		    	html +='<li>1</li>'+'<p class="none">...</p>';
		    	for(i=allpage-3;i<=allpage;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		    	$('.page ul span').html(html);
		    }
		}
    }

}
