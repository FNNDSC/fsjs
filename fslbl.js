window.onload = function() {
	var r = new X.renderer3D();
	r.init();
		
	mesh = new X.mesh();
	mesh.color = [0.5, 0.5, 0.5];
	mesh.file = 'lh.inflated';

	mesh.scalars.file = 'lh.frontal-r10-ply0.label';
	mesh.scalars.minColor = [0, 0, 1];
	mesh.scalars.maxColor = [1, 1, 1];
	
	r.add(mesh);
	r.camera.position = [0, 0, 500];
	r.render();
	
}
