<!DOCTYPE HTML>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <title>Tranquillity</title>

    <!-- Responsive and mobile friendly stuff -->
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Grid System & Reset -->
    <link rel="stylesheet" href="public/css/foundation.css" media="all">


    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Alex+Brush' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="public/css/main.css" media="all">

    <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements and feature detects -->
    <script src="public/js/modernizr-2.5.3-min.js"></script>

    <!-- IE Fix for HTML5 Tags -->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-36284960-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
  </head>
  <body>

    <!-- <div class="section group">
      <div class="col span_1_of_12"></div>
      <div class="col span_11_of_12">
        <h1>Tranquillity</h1>
      </div>
    </div> -->
    <div class="topBar"></div>
    <div class="wrapper">
      <div class="row">
        <div class="eight columns">
            <a href="/"><img src="public/img/tranquillity.png" id="logo" /></a>
        </div>
        <div class="four columns">
            <div id="nav">
                <ul>
                    <li><a href="/about">About </a></li> 
                    <li> | </li>
                    <li><a href="https://github.com/bilalq/Tranquillity-Editor">Source</a></li>
                </ul>
            </div>
        </div>
      </div>
        <?= $template['body'] ?>
      <!--<div class="blackbar"> </div>-->
    </div>


    <!-- Source JS files -->
    <script src="public/js/jquery-1.7.2.min.js"></script>
    <script src="public/js/rhyme.js"></script>
    <script src="public/js/TextStatistics.js"></script>
  </body>
</html>
