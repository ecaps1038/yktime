
//获取file内容并选择
function fileSelect(){
    var html = '';
    var path = './data/works/';
    var path1 = '/works/';
   $.ajax({
        url: '/showphoto',
        type: 'POST',
        data: {path:path},
        success: function(data){
            if(200 === data.code) {
                var patt1 = /\.(\w+)/;
                data.data.map(function(ver){
                    var aa = ver.filename.match(patt1)[1];
                    if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
                    html += '<li><div class="img"><img src="/works/'+ver.filename+'"/></div>'+
                        '<p>'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                    if(aa == 'mp4'){
                        html += '<li><div class="video"><video id="video" src="/upload/'+ver.filename+'" controls="controls"></video></div>'+
                        '<p>'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                    if(aa == 'doc' || aa == 'docx'){
                        html += '<li><div class="img"><img src="images/word.png"/></div>'+
                        '<p>'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                })
            }
            $('.files ul').html(html);
            reverse('filesul');
            selectFuc(path1);
            postPage();
        },
        error: function(){
            $("#result").html("与服务器通信发生错误");
        }
   });
}

//选择
function selectFuc(path){
    var i = 0;
    $('.files').on('click','.select',function(){
        var that = $(this);
        if(that.parent('li').hasClass('selected')){
            that.parent('li').removeClass('selected');
            i --;
        }else{
            that.parent('li').addClass('selected');
            i++
        }
        var j = 0;
        var paths = [];
        var html = '';
        $('.files ul li').each(function(){
            var that = $(this);
            if(that.hasClass('selected')){
                var val = path+that.find('p').text();
                paths[j] = val;
                j++;
                //html+=path+that.find('p').text();
            }
        });
        $('.upimg').find('.block').val(paths);
        
    })
}

//反着排列
function reverse(id){
    var s=document .getElementById (id);
    var ss=new Array();
    for (var i=0;i<s.childNodes.length;i++)
    {
      ss[i]=s.childNodes[i].innerHTML;
    }
    for (var i=0;i<ss.length;i++)
    {
     s.childNodes[i].innerHTML=ss[ss.length-1-i];
    }
}

//上传图片
function uploadFile(){
            var html = '';
            var file = document.getElementById("file")
            var formData = new FormData();
            for(var i in file.files){//这里如果单张上传就不必遍历直接formData.append('file',file.files[0])
                    formData.append('file',file.files[i]);
            }
            $.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                    if(200 === data.code) {
                        $('#result').html("上传成功！");
                        $('#file').val('');
                        fileSelect();
                    } else {
                        $('#result').html("上传失败！");
                    }
                    //console.log('imgUploader upload success');
                },
                error: function(){
                    $("#result").html("与服务器通信发生错误");
                }
            });
        }

function postPage() {
            var uploada = document.getElementById('upload');
            uploada.addEventListener("click",function () {
                uploadFile();
            },false);
        }