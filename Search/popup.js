$(document).ready(function() {
var url;

$('#iS').on("keydown change",function(foo) {
    url='https://www.google.ru/complete/search?client=psy-ab&q='+$("#iS").val();
    $.getJSON(url,function(data){
        $('#sU').empty();
        for(var i=0;i<5 ;i++){                                   
            $('#sU').append("<li class='item'>"+data[1][i][0]+"</li>");
        }                       
    });
  });
$(document).keypress()

 $(document).on('click', '.item', function() {
  $("#iS").val(this.innerHTML.replace(/(&nbsp;|<([^>]+)>)/ig,"")); 
  $("#form").submit();
});

 $("#sb").on("click",function(){
 	$("#form").submit();
 });





















});
