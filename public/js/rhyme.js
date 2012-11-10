// Global prototypes & extensions
String.prototype.lines = function() { return this.split(/\r|\r\n|\n/); };
String.prototype.lineCount = function() { return this.lines().length; };
jQuery.extend(jQuery.expr[':'], {
  focus: "a == document.activeElement"
});

/* Constants */
var delimiters = new RegExp("[ ,.]");
var modifiers = [ 9, 13, 16, 17, 18 ];
var minimum_score = 254;

/* Globals */
var rhymes_cache = [];
var last_line_num = -1;
var rhyme_scheme = "AABB";

function words_from_line(line)
{
  var words = line.split(delimiters);
  var output = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i].toLowerCase().replace(/[^a-z]/g,"");
    if (word.length > 0) {
      output.push(word);
    }
  }
  return output;
}

function getRhymes(word, callback, callback_arg1) {
  if (word === undefined || word.length < 1) {
    return;
  }
  console.log("CALLING RHYMEBRAIN");
  var rhymeURL = "http://rhymebrain.com/talk?function=getRhymes&maxResults=50&word=";

  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsonp',
    url: (rhymeURL + word),
    success: function(response){
      var rhymes = [word]; /* Include the word in the suggestion list. */
      var j = response.length;
      response.sort(function(a,b){return b.score-a.score;});
      var firstbad = true;
      var total = 15;

      rhymes.push("#Matches");

      for (var i = 0;  i < j && i < total; i++) {
        if (response[i].word.length < 2) {
          total++;
          continue;
        }

        if (response[i].score < minimum_score && firstbad) {
          firstbad = false;
          rhymes.push("#Near Matches");
        }
        rhymes.push(response[i].word); /* word, syllables, score, freq flags */
      }
      callback = callback || function(rhymewords){console.log(rhymewords);};
      callback(rhymes, callback_arg1);
    }
  });
}

function getLineCount() {
  var numlines = 0;
  var text = $('.poetry-text').val().lines();

  $.each(text, function(){
    alert(getSyllableCount(this));
  });
}

function getSyllableCount(word) {
  if (word.length === 0){
    return 0;
  }

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
    if (i > pos){
      break;
    }
    count++;
  }
  return count;
}

// Respond to changes in the  Rhyme Scheme
$("#scheme").change(function(event)
{
  var raw_scheme = this.val();
  rhyme_scheme = raw_scheme.toUpperCase().replace(/[^A-Z]/g,"");
  if (raw_scheme !== rhyme_scheme) {
    $("#scheme").val(rhyme_scheme);
  }
}

// Respond to changes in the textarea
$(window).keyup(function(event)
{
  // Ignore events triggered when the textarea doesn't have focus, and from modifiers.
  if (!jQuery("textarea.poetry-text").is(":focus") ||
      modifiers.indexOf(event.keyCode) >= 0) {
    return;
  }
  var text = jQuery("textarea.poetry-text").val();
  var syllable_area = "";
  var lines = text.lines();
  var iter;
  for (iter = 0; iter < lines.length; iter++) {
    var words = words_from_line(lines[iter]);
    var word_iter;
    var syllable_count = 0;
    for (word_iter = 0; word_iter < words.length; word_iter++){
      syllable_count+=getSyllableCount(words[word_iter]);
    }
    syllable_area += syllable_count+"<br />";
  }
  $('div.syllable_counts').html(syllable_area);
  // After finding the syllable count, find all matching words
  var pattern = "ABABCCDD";
  var caret_pos = jQuery("textarea.poetry-text")[0].selectionStart;
  var line_num = get_line(caret_pos, text);
  if (line_num === last_line_num) {
    return;
  }
  last_line_num = line_num;
  var word = get_word_to_rhyme(line_num, pattern, lines);
  populate_rhymes(word, lines);
});

function get_word_to_rhyme(line_num, pattern, lines)
{
  if (line_num < 1) {
    return undefined;
  }
  var associations = [];
  var pattern_iter = 0;
  for (var i = 0; i <= line_num; i++) {
    if (lines[i].length < 1) {
      associations.push(undefined);
      continue;
    }
    associations.push(pattern[pattern_iter % pattern.length ]);
    pattern_iter++;
  }

  var ident = associations[line_num];
  var match = associations.lastIndexOf(ident, line_num-1);
  if (match < 0) {
    return undefined;
  }
  var words = words_from_line(lines[match]);
  return words[words.length - 1];
}

function populate_rhymes(word, lines)
{
  if (word === undefined) {
    populate_rhyme_list(undefined,undefined,true); // Clear list
    return;
  }

  var rhymes = get_cached_rhymes(word);
  if (rhymes !== undefined) {
    populate_rhyme_list(remove_used_words(rhymes, lines),lines,true);
    return;
  }

  getRhymes(word, populate_rhyme_list, lines);
}

function get_cached_rhymes(word)
{
  for (var i = 0; i < rhymes_cache.length; i++) {
    var current_list = rhymes_cache[i];
    for (var j = 0; j < current_list.length; j++) {
      if (word === current_list[j]) {
        return current_list;
      }
    }
  }
  return undefined;
}

function populate_rhyme_list(rhymes, lines, already_cached)
{
  /* Javascript version of default args */
  var cached = false;
  if (typeof(already_cached) !== undefined && already_cached === true) {
    cached = true;
  }

  var rhymes_div = "";
  if (rhymes !== undefined && rhymes.length > 0) {
    if (!cached) {
      rhymes_cache.push(rhymes);
      rhymes = remove_used_words(rhymes, lines);
    }
    for (var i = 0; i < rhymes.length; i++) {
      var start_tag = "";
      var end_tag = "<br />";
      if (rhymes[i].indexOf("#") === 0) {
        start_tag+="<div class='rhymethreshold'>";
        end_tag="</div>";
        rhymes[i] = rhymes[i].substr(1);
      }
      rhymes_div += start_tag + rhymes[i] + end_tag;
    }
  }
  $('div.sidebar').html(rhymes_div);
}

function remove_used_words(rhymes, lines)
{
  var unique_rhymes = [];
  for (var i = 0; i < rhymes.length; i++) {
    var unique = true;
    var rhyme = rhymes[i];
    for (var j = 0; j < lines.length; j++) {
      var words = words_from_line(lines[j]);
      if (words.indexOf(rhyme) >= 0) {
        unique = false;
        break;
      }
    }
    if (unique) {
      unique_rhymes.push(rhyme);
    }
  }
  return unique_rhymes;
}

$('.linked').scroll(function(){
    $('.linked').scrollTop($(this).scrollTop());
});



//var poem = $('.poetry-text')[0];
//function get_sentiment(){
  //var text = poem.value;
  //console.log("POEM: " + text);
  //$.ajax({
    //type: 'GET',
    //data: {poem: text},
    //url: 'home/sentiment/'+text,
    //success: function(response) {
      //console.log(response);
    //}
  //});
//}
//get_sentiment();
