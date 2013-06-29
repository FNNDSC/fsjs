<html>
<head>

<?php

    $surfaceMesh        = $_REQUEST['surfaceMesh'];
    $overlay            = $_REQUEST['overlay'];
    
    $arr_data           = array(
        'surfaceMesh'   => $surfaceMesh,
        'overlay'       => $overlay
    );

    $jsArr_data         = json_encode($arr_data);

?>

<title>XTK SURFACE LOADING</title>

<link rel="stylesheet" type="text/css" href="devel.css">

<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>


<link href='http://fonts.googleapis.com/css?family=Inika:400,700' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Bevan' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Doppio+One' rel=',stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Henny+Penny' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Ribeye+Marrow' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Unkempt' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Fresca' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>


<script type="text/javascript" src="sprintf.js"></script>
<script type="text/javascript" src="fs_surf.js"></script>
<script type="text/javascript" src="misc_maths.js"></script>
<script type="text/javascript" src="histogram.js"></script>

<!-- Highcharts and friends -->
<script src="highcharts/js/highcharts.js" type="text/javascript"></script>

<!-- <script type="text/javascript" src="http://get.goXTK.com/xtk_edge.js "></script>  -->

<!-- Uncomment the following for local Xtk usage: -->
<!-- comment_start -->
<script type="text/javascript" src="../X/lib/google-closure-library/closure/goog/base.js"></script>
<script type="text/javascript" src="../X/xtk-deps.js"></script>
<script type="text/javascript" src="../X/X.js"></script>
<!-- comment_end -->


<script type="text/javascript">
  // include all used X-classes here
  // this is only required when using the xtk-deps.js file
  goog.require('X.renderer3D');
  goog.require('X.mesh');
  
  // Connect between the back and front ends
  var S_data = <?= $jsArr_data ?>;
  
</script>

</head>

<body>
  <!-- the container for the renderer -->
  <div class="renderer" id="div_webPage" style="background-color: #000000; width: 100%; height: 100%;">
        
    <span id="title">
        <h1>Surface: <?= $arr_data['surfaceMesh'] ?></h1> 
    </span>
    
    <!-- The curvature information table -->
    <span       id      = "info"
                class   = "ui-widget-content"
                style   = "border: 0px;
                           color: white;
                           background: black;">
    <table border="0" cellspacing="0" cellpadding="0" style="color:white;
           font-size:90%;table-layout:fixed;width:250px;">
        <tr><td style="width:150px;">curvature function </td>  <td align="right" id = "curvFunc">undefined</td></tr>
        <tr><td>vertices</td>             <td align="right" id = "vertices">undefined</td></tr>
        <tr><td>neg count</td>            <td align="right" id = "negCount">undefined</td></tr>
        <tr><td>zero count</td>           <td align="right" id = "zeroCount">undefined</td></tr>
        <tr><td>pos count</td>            <td align="right" id = "posCount">undefined</td></tr>
        <tr><td>min value</td>            <td align="right" id = "minCurv">undefined</td></tr>
        <tr><td>max value</td>            <td align="right" id = "maxCurv">undefined</td></tr>
        <tr><td>mean value</td>           <td align="right" id = "meanCurv">undefined</td></tr>
        <tr><td>std value</td>            <td align="right" id = "stdCurv">undefined</td></tr>
    </table>
    </span>

    
    <div id="histogram" class="ui-widget-content" 
          style = "background:black; width:300px; height:150px; border:1px; solid #000000;">
    </div>
    
  </div>

</body>

</html>
