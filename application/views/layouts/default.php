<!DOCTYPE HTML>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>MuseHack</title>
    <link rel="stylesheet" href="public/css/html5reset.css" media="all">
    <link rel="stylesheet" href="public/css/col.css" media="all">
    <link rel="stylesheet" href="public/css/2cols.css" media="all">
    <link rel="stylesheet" href="public/css/3cols.css" media="all">
    <link rel="stylesheet" href="public/css/4cols.css" media="all">
    <link rel="stylesheet" href="public/css/5cols.css" media="all">
    <link rel="stylesheet" href="public/css/6cols.css" media="all">
    <link rel="stylesheet" href="public/css/7cols.css" media="all">
    <link rel="stylesheet" href="public/css/8cols.css" media="all">
    <link rel="stylesheet" href="public/css/9cols.css" media="all">
    <link rel="stylesheet" href="public/css/10cols.css" media="all">
    <link rel="stylesheet" href="public/css/11cols.css" media="all">
    <link rel="stylesheet" href="public/css/12cols.css" media="all">

    <!-- Responsive Stylesheets -->
    <link rel="stylesheet" media="only screen and (max-width: 1024px) and (min-width: 769px)" href="public/css/1024.css">
    <link rel="stylesheet" media="only screen and (max-width: 768px) and (min-width: 481px)" href="public/css/768.css">
    <link rel="stylesheet" media="only screen and (max-width: 480px)" href="public/css/480.css">

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

    <script src="public/js/responsivegridsystem.js"></script>
    <script src="public/js/rhyme.js"></script>
  </body>
</html>
