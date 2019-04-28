;(function($, window, document, undefined){
    $(document).ready(function(){
        var E = window.wangEditor
        var editor2 = new E('#div3')
        editor2.create()

        // document.getElementById('btn1').addEventListener('click', function () {
        //     console.log(editor2.txt.html())
        // }, false)
        $('#btn1').on('click',function(){
            $(this).html('已获取');
            var html = editor2.txt.html();
            $.ajax({
                url: '/upfwb',
                type: 'POST',
                data: {html:html},
                success: function(data){
                    if(200 === data.code) {
                        alert('ok');
                    }
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

