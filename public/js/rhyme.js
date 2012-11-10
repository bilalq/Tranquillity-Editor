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


function getLineCount() {
  var numlines = 0;
  var text = $('.poetry-text').val().split('\n');

  $.each(text, function(){
    alert(getSyllableCount(this));
  });


}


function getSyllableCount(word) {
  var syllableCount = 0,
  prefixSuffixCount = 0,
  wordPartCount = 0;
    
  // Prepare word - make lower case and remove non-word characters
  word = word.toLowerCase().replace(/[^a-z]/g,"");

  // Specific common exceptions that don't follow the rule set below are handled individually
  // Array of problem words (with word as key, syllable count as value)
  var problemWords = {
    "simile":   3,
    "forever":    3,
    "shoreline":  2
  };
  
  // Return if we've hit one of those...
  if (problemWords[word]) {
    return problemWords[word];
  }
  
  // These syllables would be counted as two but should be one
  var subSyllables = [
    /cial/,
    /tia/,
    /cius/,
    /cious/,
    /giu/,
    /ion/,
    /iou/,
    /sia$/,
    /[^aeiuoyt]{2,}ed$/,
    /.ely$/,
    /[cg]h?e[rsd]?$/,
    /rved?$/,
    /[aeiouy][dt]es?$/,
    /[aeiouy][^aeiouydt]e[rsd]?$/,
    /^[dr]e[aeiou][^aeiou]+$/, // Sorts out deal, deign etc
    /[aeiouy]rse$/ // Purse, hearse
  ];

  // These syllables would be counted as one but should be two
  var addSyllables = [
    /ia/,
    /riet/,
    /dien/,
    /iu/,
    /io/,
    /ii/,
    /[aeiouym]bl$/,
    /[aeiou]{3}/,
    /^mc/,
    /ism$/,
    /([^aeiouy])\1l$/,
    /[^l]lien/,
    /^coa[dglx]./,
    /[^gq]ua[^auieo]/,
    /dnt$/,
    /uity$/,
    /ie(r|st)$/
  ];

  // Single syllable prefixes and suffixes
  var prefixSuffix = [
    /^un/,
    /^fore/,
    /ly$/,
    /less$/,
    /ful$/,
    /ers?$/,
    /ings?$/
  ];

  // Remove prefixes and suffixes and count how many were taken
  prefixSuffix.forEach(function(regex) {
    if (word.match(regex)) {
      word = word.replace(regex,"");
      prefixSuffixCount ++;
    }
  });
  
  wordPartCount = word
    .split(/[^aeiouy]+/ig)
    .filter(function(wordPart) {
      return !!wordPart.replace(/\s+/ig,"").length;
    })
    .length;
  
  // Get preliminary syllable count...
  syllableCount = wordPartCount + prefixSuffixCount;
  
  // Some syllables do not follow normal rules - check for them
  subSyllables.forEach(function(syllable) {
    if (word.match(syllable)) {
      syllableCount --;
    }
  });
  
  addSyllables.forEach(function(syllable) {
    if (word.match(syllable)) {
      syllableCount ++;
    }
  });
  
  return syllableCount || 1;
}
