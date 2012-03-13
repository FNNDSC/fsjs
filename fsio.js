function parseUChar8(data, offset) {

  return data.charCodeAt(offset) & 0xff;

};

function parseUChar8Array(data, offset, elements) {

	  var arr = new Array();
	  
	  var max = 0;
	  var min = Infinity;
	  
	  var i;
	  for (i = 0; i < elements; i++) {
	    var val = parseUChar8(data, offset + (i));
	    arr[i] = val;
	    max = Math.max(max, val);
	    min = Math.min(min, val);
	  }
	  
	  return [arr, max, min];
};


function parseUInt16(data, offset) {

	  var b0 = parseUChar8(data, offset), b1 = parseUChar8(data, offset + 1);
	  
	  return (b1 << 8) + b0;
	  
	};
		
function parseUInt16EndianSwapped(data, offset) {

	  var b0 = parseUChar8(data, offset), b1 = parseUChar8(data, offset + 1);
		  
	  return (b0 << 8) + b1;
		  
	};
			
function parseUInt16EndianSwappedArray(data, offset, elements) {

	  var arr = new Array();
	  
	  var max = 0;
	  var min = Infinity;
	  
	  var i;
	  for (i = 0; i < elements; i++) {
	    var val = parseUInt16EndianSwapped(data, offset + (i * 2));
	    arr[i] = val;
	    max = Math.max(max, val);
	    min = Math.min(min, val);
	  }
	  
	  return [arr, max, min];
};

	
	function parseFloat32EndianSwapped(data, offset) {

	  var 	b0 = parseUChar8(data, offset), 
	  		b1 = parseUChar8(data, offset + 1), 
	  		b2 = parseUChar8(data, offset + 2), 
	  		b3 = parseUChar8(data, offset + 3),
	  		sign = 1 - (2 * (b0 >> 7)), 
	  		exponent = (((b0 << 1) & 0xff) | (b1 >> 7)) - 127, 
	  		mantissa = ((b1 & 0x7f) << 16) | (b2 << 8) | b3;
	  
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

function parseUInt32(data, offset) {

	  var b0 = parseUChar8(data, offset), b1 = parseUChar8(data,
	      offset + 1), b2 = parseUChar8(data, offset + 2), b3 = parseUChar8(data, offset + 3);

	  return (b3 << 24) + (b2 << 16) + (b1 << 8) + b0;
};

function parseUInt32EndianSwapped(data, offset) {

	  var 	b0 = parseUChar8(data, offset), 
	  		b1 = parseUChar8(data, offset + 1), 
	  		b2 = parseUChar8(data, offset + 2), 
	  		b3 = parseUChar8(data, offset + 3);
	  
	  return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
};

function parseUInt32EndianSwappedArray(data, offset, elements) {

	  var arr = new Array();
	  
	  var max = 0;
	  var min = Infinity;
	  
	  var i;
	  for (i = 0; i < elements; i++) {
	    var val = parseUInt32EndianSwapped(data, offset + (i * 4));
	    arr[i] = val;
	    max = Math.max(max, val);
	    min = Math.min(min, val);
	  }
	  
	  return [arr, max, min];
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
		if(r.min >= a[l]) {
			r.min 		= a[l]; 
			r.minIndex 	= l;
		}
		if(r.max <= a[l]) {
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
	var astats				= stats(a);
	
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

function MRI_headerPrint(MRI, b_prefix, b_suffix) {
	
	b_prefix	= typeof b_prefix !== 'undefined' ? b_prefix : 1;
	b_suffix	= typeof b_suffix !== 'undefined' ? b_suffix : 1;

	if (b_prefix) {
		console.log(sprintf('%20s = %10d\n', 'version',	MRI.version));
		console.log(sprintf('%20s = %10d\n', 'ndim1', 	MRI.ndim1));
		console.log(sprintf('%20s = %10d\n', 'ndim2', 	MRI.ndim2));
		console.log(sprintf('%20s = %10d\n', 'ndim3', 	MRI.ndim3));
		console.log(sprintf('%20s = %10d\n', 'nframes', MRI.nframes));
		console.log(sprintf('%20s = %10d\n', 'type', 	MRI.type));
		console.log(sprintf('%20s = %10d\n', 'dof', 	MRI.dof));
		console.log(sprintf('%20s = %10d\n', 'rasgoodflag', 	
													MRI.rasgoodflag));
	}
	if (b_suffix) {
		console.log(sprintf('%20s = %10.5f [ms]\n', 	
							'Tr',			MRI.Tr));
		console.log(sprintf('%20s = %10.5f [radians]\n',
							'flipangle',	MRI.flipangle));
		console.log(sprintf('%20s = %10.5f [degrees]\n',
							'flipangle',	MRI.flipangle * 180 / Math.PI));
		console.log(sprintf('%20s = %10.5f [ms]\n',
							'Te',			MRI.Te));
		console.log(sprintf('%20s = %10.5f [ms]\n',
							'Ti',			MRI.Ti));
	}
}

function MRI_voxelSizesPrint(MRI) {
	console.log('Voxel sizes = %f x %f x %f [mm]\n',
				MRI.v_voxelsize[0],
				MRI.v_voxelsize[1],
				MRI.v_voxelsize[2]);
}

function MRI_rasMatrixPrint(MRI) {
	var	width	= 10;
	var	prec	= 5;
	console.log(sprintf('| %10.5f%10.5f%10.5f%15.5f |\n',
		MRI.M_ras[0][0], MRI.M_ras[0][1], MRI.M_ras[0][2], MRI.M_ras[0][3]));
	console.log(sprintf('| %10.5f%10.5f%10.5f%15.5f |\n',
		MRI.M_ras[1][0], MRI.M_ras[1][1], MRI.M_ras[1][2], MRI.M_ras[1][3]));
	console.log(sprintf('| %10.5f%10.5f%10.5f%15.5f |\n',
		MRI.M_ras[2][0], MRI.M_ras[2][1], MRI.M_ras[2][2], MRI.M_ras[2][3]));
}

function dobj(data, array_parse, dataSize, numElements) {
	this.data			= [];
	this._dataPointer	= 0;
	this._sizeofChunk	= 1;
	this._chunks		= 1;
	this._b_verbose		= false;

	// A function that 'reads' from the data stream, returning
	// an array of _chunks. If _chunkSizeOf is 1, then return
	// only the _chunk.
	this.array_parse	= null;
 
	if(typeof data 			!== 'undefined') this.data 			= data;
	if(typeof array_parse 	!== 'undefined') this.array_parse	= array_parse;
	if(typeof dataSize 		!== 'undefined') this._sizeofChunk	= dataSize;	
	if(typeof numElements   !== 'undefined') this._chunks		= numElements;
}

dobj.prototype.sizeofChunk	= function(size) {
	if(typeof size == 'undefined') return this._sizeofChunk;
	this._sizeofChunk = size;
};

dobj.prototype.dataPointer	= function(dataPointer) {
	if(typeof dataPointer == 'undefined') return this._dataPointer;
	this._dataPointer = dataPointer;
};

dobj.prototype.b_verbose	= function(verbosity) {
	if(typeof verbosity == 'undefined') return this._b_verbose;
	this._b_verbose = verbosity;
};

dobj.prototype.array_parse_set = function(array_parse, sizeofChunk) {
	this.array_parse	= array_parse;
	this._sizeofChunk	= sizeofChunk;
};

dobj.prototype.read		= function(chunks) {
	// By default, read and return a single chunk
	if(typeof chunks == 'undefined') {
		chunks = 1;
	}
	ret			= this.array_parse(this.data, this._dataPointer, chunks);
	arr_byte	= ret[0];
	if(this._b_verbose) {
		cprints(sprintf('%d', this._dataPointer), arr_byte);
	}
	this._dataPointer += this._sizeofChunk * chunks;
	if(chunks == 1) {
		return arr_byte[0];
	} else {
		return arr_byte;
	}
};

function dp(sizeof, bufsize) {
	
	this.seekTo	= function(seek) {
		dp._counter = seek;
		return dp._counter;
	};
	
	this.b_printCounter = function(bool) {
		if(bool) dp._b_printCounter = true;
		else dp._b_printCounter		= false;
		return dp._counter;
	};
	
	this.pointer = function() {
		return dp._counter;
	};
	
	// A 'datapointer' function/object that tracks the position of
	// a counter in a data array, roughly analogous to the file pointer
	// concept in C.
	if(typeof dp._sizeof == 'undefined') {
		if(typeof sizeof == 'undefined') {
			dp._sizeof = 1;
		} else {
			dp._sizeof	= sizeof;
		}
	}
	
	if(typeof dp._printCounter == 'undefined') {
		dp._b_printCounter = false;
	}
	
	dp._sizeof 			= typeof sizeof !== 'undefined' ? sizeof : dp._sizeof;
	dp._bufsize			= typeof bufsize == 'undefined' ? 1 : bufsize;
		
	if(typeof dp._counter == 'undefined') {
		dp._counter	= 0;
	}

	
	dp._counterRet = dp._counter;
	dp._counter += dp._sizeof * dp._bufsize;
	if(dp._b_printCounter || true) {
		console.log('In <dp> function object, returning counter = %d, current counter = %d\n', dp._counterRet, dp._counter);
	}
	
	return dp._counterRet;
}

function mgzData_parse(data) {

	var MRI = {
			version:		0,
			Tr: 			0, 
			Te: 			0, 
			flipangle:		0,
			Ti:				0,
			ndim1:			0,
			ndim2:			0,
			ndim3:			0,
			nframes: 		0,
			type:			0,
			dof:			0,
			rasgoodflag:	0,
			M_ras:			[
			      			 [0, 0, 0, 0],
			      			 [0, 0, 0, 0],
			      			 [0, 0, 0, 0]
			      			 ],
			v_voxelsize:	[],
			v_data:			[],		// data as single vector
			V_data: 		[]		// data as volume 
			};	

	var MRItype = {
			MRI_UCHAR	: {value: 0, name: "uchar",	size:	1},
			MRI_INT		: {value: 1, name: "int",	size:	4},
			MRI_LONG	: {value: 2, name: "long",	size:   8},
			MRI_FLOAT	: {value: 3, name: "float", size:	4},
			MRI_SHORT	: {value: 4, name: "short", size:	2},
			MRI_BITMAP 	: {value: 5, name: "bitmap", size:  8}
	};
	
	var UNUSED_SPACE_SIZE	= 256;
	var MGH_VERSION			= 1;
	var sizeof_char			= 1;
	var sizeof_short		= 2;
	var sizeof_int			= 4;
	var	sizeof_float		= 4;
	var sizeof_double		= 8;
	var USED_SPACE_SIZE		= (3*sizeof_float+4*3*sizeof_float);
	var unused_space_size	= UNUSED_SPACE_SIZE;
	
//	MRI.version		= parseUInt32EndianSwapped(data, 0);
//	MRI.ndim1		= parseUInt32EndianSwapped(data, 4);
//	MRI.ndim2		= parseUInt32EndianSwapped(data, 8);
//	MRI.ndim3		= parseUInt32EndianSwapped(data, 12);
//	MRI.nframes		= parseUInt32EndianSwapped(data, 16);
//	MRI.type		= parseUInt32EndianSwapped(data, 20);
//	MRI.dof			= parseUInt32EndianSwapped(data, 24);
//	MRI.rasgoodflag	= parseUInt16EndianSwapped(data, 28); //dp now 30
	
	dstream			= new dobj(data, parseUInt32EndianSwappedArray, sizeof_int);
	dstream.b_verbose(false);
	console.log(dstream.read());
	console.log(dstream.read());
	console.log(dstream.read());
	console.log(dstream.read());
	console.log(dstream.read());
	console.log(dstream.read());
	console.log(dstream.read());
	dstream.array_parse_set(parseUInt16EndianSwappedArray, sizeof_short);
	console.log(dstream.read());
	dstream.array_parse_set(parseFloat32EndianSwappedArray, sizeof_float);
	console.log('%f', dstream.read());
	console.log('%f', dstream.read());
	console.log('%f', dstream.read());
	
	MRI.version		= parseUInt32EndianSwapped(data, dp(sizeof_int));
	MRI.ndim1		= parseUInt32EndianSwapped(data, dp());
	MRI.ndim2		= parseUInt32EndianSwapped(data, dp());
	MRI.ndim3		= parseUInt32EndianSwapped(data, dp());
	MRI.nframes		= parseUInt32EndianSwapped(data, dp());
	MRI.type		= parseUInt32EndianSwapped(data, dp());
	MRI.dof			= parseUInt32EndianSwapped(data, dp());
	MRI.rasgoodflag	= parseUInt16EndianSwapped(data, dp(sizeof_short)); //dp now 30
	unused_space_size -= sizeof_short;
	
	MRI_headerPrint(MRI, 1, 0);

	if(MRI.rasgoodflag > 0) {
		// Read in voxel size and RAS matrix
		unused_space_size -= USED_SPACE_SIZE;
		MRI.v_voxelsize[0]	= parseFloat32EndianSwapped(data, dp(sizeof_float));
		MRI.v_voxelsize[1]	= parseFloat32EndianSwapped(data, dp());
		MRI.v_voxelsize[2] 	= parseFloat32EndianSwapped(data, dp());
		
		// X
		MRI.M_ras[0][0]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[1][0]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[2][0]		= parseFloat32EndianSwapped(data, dp());

		// Y
		MRI.M_ras[0][1]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[1][1]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[2][1]		= parseFloat32EndianSwapped(data, dp());
		
		// Z
		MRI.M_ras[0][2]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[1][2]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[2][2]		= parseFloat32EndianSwapped(data, dp());

		// C
		MRI.M_ras[0][3]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[1][3]		= parseFloat32EndianSwapped(data, dp());
		MRI.M_ras[2][3]		= parseFloat32EndianSwapped(data, dp()); //dp = 90

		MRI_voxelSizesPrint(MRI);
		MRI_rasMatrixPrint(MRI);
	}
	cprintf('unused space size', unused_space_size);
	dp(sizeof_char, unused_space_size);
	var volsize	= MRI.ndim1 * MRI.ndim2 * MRI.ndim3;
	
	var MRIdata;
	switch(MRI.type) {
	case MRItype.MRI_UCHAR.value:
		MRIdata		= MRItype.MRI_UCHAR;
		console.log('Reading UCHAR vals: %d\n', volsize);
		a_ret		= parseUChar8Array(data, dp(sizeof_char, volsize), volsize);
//		a_ret		= parseUChar8Array(data, 284, volsize);
		MRI.v_data	= a_ret[0];
		break;
	case MRItype.MRI_INT.value:
		MRIdata		= MRItype.MRI_INT;
		console.log('Reading INT vals: %d\n', volsize);
		a_ret		= parseUInt32EndianSwappedArray(data, pointer, volsize);
		MRI.v_data	= a_ret[0];
		break;
	}
	
	// Now for the final MRI parameters at the end of the data stream:
	pointer			= 284 + volsize*MRIdata.size;
//	MRI.Tr	 		= parseFloat32EndianSwapped(data, pointer);
//	MRI.flipangle	= parseFloat32EndianSwapped(data, pointer + 1 * sizeof_float);
//	MRI.Te			= parseFloat32EndianSwapped(data, pointer + 2 * sizeof_float);
//	MRI.Ti			= parseFloat32EndianSwapped(data, pointer + 3 * sizeof_float);
	console.log('reading final mr_params...\n');
	MRI.Tr	 		= parseFloat32EndianSwapped(data, dp(sizeof_float));
	MRI.flipangle	= parseFloat32EndianSwapped(data, dp());
	MRI.Te			= parseFloat32EndianSwapped(data, dp());
	MRI.Ti			= parseFloat32EndianSwapped(data, dp());
	MRI_headerPrint(MRI, 0, 1);
	
	stats_determine(MRI.v_data);
	return MRI;
}

function mgz_fileLoad(filePath) {

	// we use a simple XHR to get the file contents
	  // this works for binary and for ascii files
	  var request = new XMLHttpRequest();
	  
	  // listen to progress events.. here, goog.events.listen did not work
	  // request.addEventListener('progress',
	  // this.loadFileProgress.bind(this, object), false);
	  //request.onAbort = loadAbort();
	  //request.onError = loadError();
	  request.addEventListener('load', function() { 
		  mgzData_parse(request.response); });

	  // configure the URL
	  request.open('GET', filePath, true);
	  request.overrideMimeType("text/plain; charset=x-user-defined");
	  request.setRequestHeader("Content-Type", "text/plain");
	  
	  // .. and GO!
	  request.send(null);	
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
	  request.addEventListener('load', function() { 
		  curvData_parse(request.response); });

	  // configure the URL
	  request.open('GET', filePath, true);
	  request.overrideMimeType("text/plain; charset=x-user-defined");
	  request.setRequestHeader("Content-Type", "text/plain");
	  
	  // .. and GO!
	  request.send(null);	
}


function run() {
	
	curv_fileLoad('rh.smoothwm.K.crv');
	mgz_fileLoad('orig.mgh');
	console.log('Curvature file parsed\n');
	
}