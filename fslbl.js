window.onload = function() {
	var r = new X.renderer3D();
	r.init();
		
	mesh = new X.mesh();
	mesh.color = [0.5, 0.5, 0.5];
	mesh.file = 'lh.inflated';

	mesh.scalars.file = 'lh.smoothwm.H.crv';
	mesh.scalars.minColor = [0, 1, 0];
	mesh.scalars.maxColor = [1, 0, 0];
	
	r.add(mesh);
	r.camera.position = [0, 0, 500];
	r.render();

	r.onShowtime = function () {
	    mesh.scalars.file = 'label/lh.frontal.label';
	    mesh.modified();
//	    r.onShowtime = function () {
//	    	mesh.scalars.file = 'label/lh.frontal.label';
//		    mesh.modified();
//	    };
	};
	
}
