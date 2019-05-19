;(function($, window, document, undefined){
    $(document).ready(function(){
        var E = window.wangEditor;
        var editor2 = new E('#div3');
        editor2.create();

        // document.getElementById('btn1').addEventListener('click', function () {
        //     console.log(editor2.txt.html())
        // }, false)
        function upfwb(){
            var nowTime= new Date();
            var changetime = changeTime1(nowTime);
            //var _id = $(this).attr('data-id');
            
            var html = editor2.txt.html();
            $.ajax({
                url: '/upfwb',
                type: 'POST',
                data: {html:html,num: 5},
                success: function(data){
                    if(data.success){
                        var nowid = data.rest;
                        //alert(nowid);
                        $('#btn1').html(changetime);
                        //$('#btn1').attr('data-id', nowid);
                    }else{
                        alert('发生返回错误')
                    }
                },
                error: function(){
                    $("#result").html("与服务器通信发生错误");
                }
           });
        }
        $('#btn1').on('click',function(){
            //获取当前时间
            var html = editor2.txt.html();
            if(html!="<p><br></p>"){
                upfwb();
            }else{
                alert('内容为空～～');
            }
        })

        var i = 0;
        var nowTime= '',bbb = 0;

        $("#div3").hover(function(){
            nowTime= new Date();
            var aaa = nowTime.getTime();
            if(i>0&&(aaa-bbb)>1000*30){
                console.log(i);
                bbb=aaa;
                var html = editor2.txt.html();
                if(html!="<p><br></p>"){
                    upfwb();
                }
            }
          i++
        })

        // document.getElementById('btn2').addEventListener('click', function () {
        //     alert(editor2.txt.text())
        // }, false)
        
        window.onload = function () {

        }
    })
})(jQuery,window,document);

