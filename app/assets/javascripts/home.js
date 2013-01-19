var rhymes = {};
var currentRhymes = [];
absoluteLine = 0;
adjustedLine = 0;
var lineChanged = false;
var lines = [];

if(!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
}
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function getCaret(el) { 
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }
    var re = el.createTextRange(),
        rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }
  return 0;
}

function getLine(sel) {
    lines = $('#poem_body').val().replace(/\r\n/g, "\n").split("\n");
    var split = sel.val().substr(0, getCaret(sel[0])).replace(/\r\n/g, "\n").split("\n");
    var currLine = -3;
    for (i in split) {
        if (split[i]) {
            currLine++;
        }
    }
    if (!split.last()) {
        currLine++;
    }
    absoluteLine = split.length-1;
    if (adjustedLine != currLine) {
        lineChanged = true;
        adjustedLine = currLine;

        var rhymeScheme = $('#poem_rhyme_scheme').val();
        var len = rhymeScheme.length;
        var group = parseInt(adjustedLine/len);
        var mod = adjustedLine%len;

        var lineToRhyme = rhymeScheme.indexOf(rhymeScheme[mod]);
        if (lineToRhyme == mod) {
            lineToRhyme = rhymeScheme.indexOf(rhymeScheme[mod], mod+1);
        }
        lineToRhyme = group*len+lineToRhyme;
        
        var index = 0;
        for (var i = 0; i < lineToRhyme; i++) {
            index++;
            while (index < lines.length && lines[index].length == 0) {index++;}
        }
        lineToRhyme = index;

        if (lineToRhyme != -1 && lineToRhyme < lines.length) {
            var wordToRhyme = lines[lineToRhyme].split(" ").last().toLowerCase().replace(/[^a-z-]/g,"");
            $('span.rhymes_with').html("Rhymes with <u>"+wordToRhyme+"</u>:");
            if (rhymes[wordToRhyme]) {
                currentRhymes = rhymes[wordToRhyme];
                $('#rhymes').val(currentRhymes.join("\n"));
            } else {
                var rhymeURL = "http://rhymebrain.com/talk?function=getRhymes&word=";
                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'jsonp',
                    url: (rhymeURL + wordToRhyme),
                    success: function(response) {
                        currentRhymes = [];
                        response.sort(function(a,b){return b.score+b.word.length-a.score-a.word.length;});
                        for (var i = 0; i < response.length; i++) {
                            currentRhymes.push(response[i].word);
                        }
                        rhymes[wordToRhyme] = currentRhymes;
                        $('#rhymes').val(currentRhymes.join("\n"));
                    }
                });
            }
        } else {
            $('#rhymes').val("");
            $('span.rhymes_with').text("Rhymes:");
        }
    }
}

function inOrderedArray(val, arr) {
    var i = 0;
    while (arr[i] < val) {i++;}
    return arr[i] == val;
}

function lineSyllables(line) {
    var words = line.split(" ");
    var lineSyllables = 0;
    for (var i = 0; i < words.length; i++) {
        var s = syllableCount(words[i])
        words[i] = s;
        lineSyllables += s;
    }
    if (lineSyllables == 0) {
        return "";
    }
    return lineSyllables;
}

function refreshCounts() {
    var syllableCounts = [];
    for (var i = 0; i < lines.length; i++) {
        syllableCounts[i] = lineSyllables(lines[i])
    };
    $('#counts').val(syllableCounts.join("\n"));
}

$(document).ready(function(){
    $('#poem_rhyme_scheme').autocomplete({
        source: ["ABAB", "AABB"]
    });
    if ($('#poem_body').val().length == 0) {
        $('#poem_body').val("Come now, there is no need to be polite!\nWith a syllable counter at your left,\nand a rhyme suggester to your right,\nTranquillity will make your writing deft.");
    }
    if ($('#poem_rhyme_scheme')[0] && $('#poem_rhyme_scheme').val().length == 0) {
        $('#poem_rhyme_scheme').val("ABAB");
    }

    lines = $('#poem_body').val().replace(/\r\n/g, "\n").split("\n");
    refreshCounts();

    $('#poem_body').keyup(function(e) {
        getLine($(this));
        refreshCounts();
        $('#counts').scrollTop($(this).scrollTop());
    });
    $('#poem_body').mouseup(function(e) {
        if (e.button == 0) {
            getLine($(this));
        }
    });
    $('#poem_body').scroll(function(){
        $('#counts').scrollTop($(this).scrollTop());
    });
});