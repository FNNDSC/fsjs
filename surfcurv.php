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
        <h1>FreeSurfer surface file format reading</h1> 
    <span>
    
  </div>



</body>

</html>
