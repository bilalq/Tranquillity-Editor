// Global prototypes & extensions
String.prototype.lines = function() { return this.split(/\r|\r\n|\n/); }
String.prototype.lineCount = function() { return this.lines().length; }
jQuery.extend(jQuery.expr[':'], {
  focus: "a == document.activeElement"
});

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
  if (word.length === 0)
    return 0;

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


// Given a cursor position & the string value of the input text area, 
// return the line number on which the cursor in the text area resides.
function get_line(pos, text)
{
  var lines = text.lines();
  var count = 0;
  var i = 0;
  while (i < pos) {
    i+=lines[count].length+1;
    if (i > pos)
      break;
    count++;
  }
  return count;
}

// Given a line number, the number of syllables, and the string value of the
// syllable count div, return the updated text for the syllable count div.
// *This should be replaced by whatever is needed by the line counts..

$(window).keyup(function(event)
{ 
  if (!jQuery("textarea.poetry-text").is(":focus")) {
    return;
  }
  var text = jQuery("textarea.poetry-text").val();
  var syllable_area = "";
  var lines = text.lines();
  var iter;
  for (iter = 0; iter < lines.length; iter++) {
    var words = lines[iter].split(" ");
    var word_iter;
    var syllable_count = 0;
    for (word_iter = 0; word_iter < words.length; word_iter++)
      syllable_count+=getSyllableCount(words[word_iter]);
    syllable_area += syllable_count+"<br />";
  }
  $('div.syllable_counts').html(syllable_area);
  // After fining the syllable count, find all matching words
  var pattern = "ABABCCDD";
  var caret_pos = jQuery("textarea.poetry-text")[0].selectionStart;
  var line_num = get_line(caret_pos, text);
  var word = get_word_to_rhyme(line_num, pattern, lines);
  console.log(word);
  //if ($('#syllable_count span').length <= line) 
  //$('#syllable_count span')[line].innerText = getSyllableCount(text)
});

function get_word_to_rhyme(line_num, pattern, lines) 
{
  var modulus = line_num % pattern.length;
  var ident = pattern[modulus];
  var match = pattern.lastIndexOf(ident, modulus-1);
  if (match < 0)
    return undefined;
  var words = lines[line_num - (modulus - match)].split(" ");
  return words[words.length];
}

