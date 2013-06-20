// Do the layout of page components using jQuery
jQuery(document).ready(function($) {

    jQuery("#title").titlePos_layout(jQuery("#title").width());
    
}); // End of document.ready

jQuery.fn.titlePos_layout = function(textWidth) {
    this.css("position", "absolute");
    this.css("top",  "5px");
    this.css("left", window.innerWidth/2 - textWidth/2 + "px");
    return this;
};


window.onload = function() {
	var render = new X.renderer3D();
        render.container = "div_webPage";
	render.init();
		
	mesh = new X.mesh();
	mesh.color = [0.5, 0.5, 0.5];
	mesh.file = S_data.surfaceMesh;

	mesh.scalars.file = S_data.overlay;
	mesh.scalars.interpolation = 3;
	
	render.add(mesh);
	render.camera.position = [0, 0, 500];
	render.render();

	render.onShowtime = function () {
	};
	
}
