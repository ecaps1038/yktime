;(function($, window, document, undefined){
    $(document).ready(function(){
        var E = window.wangEditor;
        var editor2 = new E('#div3');
        editor2.create();

        // document.getElementById('btn1').addEventListener('click', function () {
        //     console.log(editor2.txt.html())
        // }, false)
        $('#btn1').on('click',function(){
            //获取当前时间
            var nowTime= new Date();
            var changetime = changeTime1(nowTime);
            var _id = $(this).attr('data-id');
            
            var html = editor2.txt.html();
            $.ajax({
                url: '/upfwb',
                type: 'POST',
                data: {html:html,id:_id},
                success: function(data){
                    var nowid = data.rest;
                    alert(nowid)
                    $('#btn1').html(changetime);
                    $('#btn1').attr('data-id', nowid);
                },
                error: function(){
                    $("#result").html("与服务器通信发生错误");
                }
           });
        })

        document.getElementById('btn2').addEventListener('click', function () {
            alert(editor2.txt.text())
        }, false)
        
        window.onload = function () {

        }
    })
})(jQuery,window,document);

