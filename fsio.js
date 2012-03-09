function parseUChar8(data, offset) {

  return data.charCodeAt(offset) & 0xff;

};

function parseFloat32EndianSwapped(data, offset) {

	  var b0 = this.parseUChar8(data, offset), b1 = this.parseUChar8(data,
	      offset + 1), b2 = this.parseUChar8(data, offset + 2), b3 = this
	      .parseUChar8(data, offset + 3),

	  sign = 1 - (2 * (b0 >> 7)), exponent = (((b0 << 1) & 0xff) | (b1 >> 7)) - 127, mantissa = ((b1 & 0x7f) << 16) |
	      (b2 << 8) | b3;
	  
	  if (mantissa == 0 && exponent == -127) {
	    return 0.0;
	  }
	  
	  return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
	  
};

function parseFloat32EndianSwappedArray(data, offset, elements) {

	  var arr = new Array();
	  
	  var max = 0;
	  var min = Infinity;
	  
	  var i;
	  for (i = 0; i < elements; i++) {
	    var val = parseFloat32EndianSwapped(data, offset + (i * 4));
	    arr[i] = val;
	    max = Math.max(max, val);
	    min = Math.min(min, val);
	  }
	  
	  return [arr, max, min];
};


// I'd call this Endian Swapped
function parseUInt32(data, offset) {

	  var b0 = parseUChar8(data, offset), b1 = parseUChar8(data,
	      offset + 1), b2 = parseUChar8(data, offset + 2), b3 = parseUChar8(data, offset + 3);

	  return (b3 << 24) + (b2 << 16) + (b1 << 8) + b0;
};


// I'd NOT call this Endian Swapped
function parseUInt32EndianSwapped(data, offset) {

	  var b0 = this.parseUChar8(data, offset), b1 = this.parseUChar8(data,
	      offset + 1), b2 = this.parseUChar8(data, offset + 2), b3 = this
	      .parseUChar8(data, offset + 3);
	  
	  return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
};

function fread3(data) {
	
	var b1 = parseUChar8(data, 0);
	var b2 = parseUChar8(data, 1);
	var b3 = parseUChar8(data, 2);

	return (b1 << 16) + (b2 << 8) + b3;
}

stats = function(a){
	var r = {
			mean: 		0, 
			variance: 	0, 
			deviation: 	0, 
			prod: 		1, 
			sum: 		0, 
			min: 		0,
			minIndex:	0,
			max: 		0,
			maxIndex:	0
			};
	var t = a.length;
	for(var m = 0, p = 1, s = 0, l = t; l--; l>=0) {
		s += a[l];
		p *= a[l];
		if(r.min > a[l]) {
			r.min 		= a[l]; 
			r.minIndex 	= l;
		}
		if(r.max < a[l]) {
			r.max 		= a[l];
			r.maxIndex 	= l;
		}
	};
	r.prod 	= p;
	r.sum	= s;
	for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
	return r.deviation = Math.sqrt(r.variance = s / t), r;
}

function cprintd(str_left, val) {
	console.log(sprintf('%20s%25s\n', str_left, sprintf('[ %d ]', val)));
}

function cprintf(str_left, f_val) {
	console.log(sprintf('%20s%25s\n', str_left, sprintf('[ %19.5f ]', f_val)));
}

function cprints(str_left, str_right) {
	console.log(sprintf('%20s%25s\n', str_left, sprintf('[ %s ]', str_right)));
}

function stats_determine(a) {
	var astats			= stats(a);
	
	cprintd('Size', 		a.length);
	cprints('Min@(index)',	sprintf('%10.5f (%d)', astats.min, astats.minIndex));
	cprints('Max@(index)',	sprintf('%10.5f (%d)', astats.max, astats.maxIndex));
	cprintf('Mean',			astats.mean);
	cprintf('Std',			astats.deviation);
	cprintf('Sum',			astats.sum);
	cprintf('Prod',			astats.prod);
	cprintf('Var',			astats.variance);
}

function curvData_parse(data) {
	
	var vnum		= fread3(data);
	
	var nvertices	= parseUInt32EndianSwapped(data, 3);
	var nfaces		= parseUInt32EndianSwapped(data, 7);

	console.log(sprintf('%20s = %10d\n', 'MAGIC NUMBER', vnum));
	console.log(sprintf('%20s = %10d\n', 'data size', data.length));
	console.log(sprintf('%20s = %10d\n', 'nvertices', nvertices));
	console.log(sprintf('%20s = %10d\n', 'nfaces', nfaces));
	
	var af_curvVals 	= [];
	var al_ret			= [];
	
	al_ret = parseFloat32EndianSwappedArray(data, 11, nvertices);
	af_curvVals			= al_ret[0];
		
	var f_max			= al_ret[1];
	var f_min			= al_ret[2];
	
	stats_determine(af_curvVals);
}


function curv_fileLoad(filePath) {

	  // we use a simple XHR to get the file contents
	  // this works for binary and for ascii files
	  var request = new XMLHttpRequest();
	  
	  // listen to progress events.. here, goog.events.listen did not work
	  // request.addEventListener('progress',
	  // this.loadFileProgress.bind(this, object), false);
	  //request.onAbort = loadAbort();
	  //request.onError = loadError();
	  request.addEventListener('load', function() { curvData_parse(request.response); });

	  // configure the URL
	  request.open('GET', filePath, true);
	  request.overrideMimeType("text/plain; charset=x-user-defined");
	  request.setRequestHeader("Content-Type", "text/plain");
	  
	  // .. and GO!
	  request.send(null);	
	
	
}


function run() {
	
	curv_fileLoad('rh.smoothwm.K.crv');
	console.log('Curvature file parsed\n');
	
}