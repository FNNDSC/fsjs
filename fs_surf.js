// Do the layout of page components using jQuery
jQuery(document).ready(function($) {

    jQuery("#title").titlePos_layout(jQuery("#title").width());
    
    jQuery("#info").info_layout();
    jQuery("#info").draggable();
    
    
}); // End of document.ready

jQuery.fn.titlePos_layout = function(textWidth) {
    this.css("position", "absolute");
    this.css("top",  "5px");
    this.css("left", window.innerWidth/2 - textWidth/2 + "px");
    return this;
};

jQuery.fn.info_layout = function() {
    docElement = document.getElementById('info');
    this.css("position", "absolute");
    this.css("top",  window.innerHeight - docElement.clientHeight - 40 + "px");
    this.css("left", "10px");
    jQuery("#histogram").draggable();
    jQuery("#histogram").histogram_layout();
    return this;
};

jQuery.fn.histogram_layout = function() {
    histElement = document.getElementById('histogram');
    infoElement = document.getElementById('info');
    this.css("position", "absolute");
    this.css("top",  window.innerHeight - histElement.clientHeight - 20 + "px");
    this.css("left", infoElement.clientWidth + 30 + "px");
    return this;
};


// Informational section (including histograms)

// Javascript access to components of the HTML page:
_htmlRefTag = {
        vertices:       "vertices",
        curvFunc:       "curvFunc",
        negCount:       "negCount",
        zeroCount:      "zeroCount",
        posCount:       "posCount",
        minCurv:        "minCurv",
        maxCurv:        "maxCurv",
        meanCurv:       "meanCurv",
        stdCurv:        "stdCurv"        
};

hid = {
        vertices:       0,
        curvFunc:       'undefined',
        negCount:       0,
        zeroCount:      0,
        posCount:       0,
        minCurv:        0.0,
        maxCurv:        0.0,
        meanCurv:       0.0,
        stdCurv:        0.0
};

function hid_init() {
    for(var key in _htmlRefTag) {
        hid[key] = document.getElementById(key);
    }
}

function infoUpdate() {
    // We need to copy and then filter the scalars.array
    // according to the min/max values
    //var arr_scalars = hemi.surface.scalars.array.subarray(0);
    try{
        var arr_scalars = mesh.scalars.array.copy();
    } catch(e) {
        console.log('Unable to copy scalar array info for mesh');
        return;
    }
    // Now bandpass filter between the min/max values of the 
    // thresholded values...
    var f_min = mesh.scalars.min;
    var f_max = mesh.scalars.max;
    arr_bandFilter(arr_scalars, f_min, f_max);
    
    s_stats = stats_calc(arr_scalars);
    for(var key in _htmlRefTag) {
      switch(key) {
      case 'vertices':
          hid[key].innerHTML = mesh.scalars.array.length;
          break;
      case 'curvFunc':
          hid[key].innerHTML = S_data.overlay;
          break;
      case 'negCount':
          hid[key].innerHTML = s_stats.negCount.toFixed(0);
          break;
      case 'zeroCount':
          hid[key].innerHTML = s_stats.zeroCount.toFixed(0);
          break;
      case 'posCount':
          hid[key].innerHTML = s_stats.posCount.toFixed(0);
          break;
      case 'minCurv':
          hid[key].innerHTML = s_stats.min.toFixed(4);
          break;;
      case 'maxCurv':
          hid[key].innerHTML = s_stats.max.toFixed(4);
          break;
      case 'meanCurv':
          hid[key].innerHTML = s_stats.mean.toFixed(4);
          break;
      case 'stdCurv':
          hid[key].innerHTML = s_stats.deviation.toFixed(4);
          break;
      }
    }
    // Now (re)draw the histogram 
    s_hist = histogram_calculate(arr_scalars, 100);
    histogram_draw('histogram', s_hist.arr_xy);
}    

// Main rendering section
window.onload = function() {
        hid_init();
    
	var render = new X.renderer3D();
        render.container = "div_webPage";
	render.init();
		
	mesh = new X.mesh();
	mesh.color = [0.5, 0.5, 0.5];
	mesh.file = S_data.surfaceMesh;

	mesh.scalars.file = S_data.overlay;
	mesh.scalars.interpolation = 3;
	
	render.add(mesh);
	render.camera.position = [-500, 0, 0];
	render.render();

	render.onShowtime = function () {
            infoUpdate();
	};
}
