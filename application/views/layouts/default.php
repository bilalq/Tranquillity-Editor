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
  </head>
  <body>
    <!-- <div class="section group">
      <div class="col span_1_of_12"></div>
      <div class="col span_11_of_12">
        <h1>MuseHack</h1>
      </div>
    </div> -->
    <div class="topBar"></div>
    <div class="bottomBar"></div>
    
    <?= $template['body'] ?>

    <!-- Source JS files -->
    <script src="public/js/jquery-1.7.2.min.js"></script>
    <script src="public/js/rhyme.js"></script>
    <script src="public/js/TextStatistics.js"></script>
  </body>
</html>
