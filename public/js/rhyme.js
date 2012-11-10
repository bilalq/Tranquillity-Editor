function getRhymes(word) {
  var rhymeURL = "http://rhymebrain.com/talk?function=getRhymes&maxResults=45&word=";

  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsonp',
    url: (rhymeURL + word),
    success: function(response){
      var rhymes = '';
      var j = response.length;
      for (var i = 0;  i < j && i < 12; i++) {
        if(response[i].score > 260){
          rhymes+='<a href="#" class="validWord">'+response[i].word+'</a>';
        }
      }
      console.log("rhyme: " + rhymes);
    }
  });

}


function getLineCount {
  var numlines = 0;
  var text = $('textarea').value.split('\n');

  $.each(text, function(){
    alert(this);
  });


}