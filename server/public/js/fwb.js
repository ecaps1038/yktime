;(function($, window, document, undefined){
    $(document).ready(function(){
        var E = window.wangEditor
        var editor2 = new E('#div3')
        editor2.create()

        document.getElementById('btn1').addEventListener('click', function () {
            console.log(editor2.txt.html())
        }, false)

        document.getElementById('btn2').addEventListener('click', function () {
            alert(editor2.txt.text())
        }, false)
        
        window.onload = function () {

        }
    })
})(jQuery,window,document);

