var canvas;	// the div that will contain the <svg> element
var svg;	// the actual <svg> element
var map;	// the top-most group, containing all svg elements

var scale = 3.6;
var posx = 0;
var posy = 0;

var mode = 0; // 0 = map mode, 1 = geo mode

var mousedown = 0;
var mousedrag = 0;
var mouseX = 0, mouseY = 0;

function init() {
	canvas = SVG("canvas").size("100%", "100%");
	svg = document.getElementById("canvas").firstChild;

	var num_stations = Object.keys(stations).length;
	var num_lines = Object.keys(lines).length;

	console.log("num_stations = " + num_stations);
	console.log("num_lines = " + num_lines);

	initMouse();
	setupKeyboard();

	render();
	update();
}

function onDrag(event) {
	posx += event.dx;
	posy += event.dy;
	update();
}

function initMouse() {
	window.addEventListener("mousemove", onMouseMove, false);
	window.addEventListener("wheel", onMouseWheel, false);

	interact("#canvas").draggable({
		restrict: {
			  restriction: "parent",
		},
		onmove: onDrag
	});
	interact("#canvas").styleCursor(false);
}

function onMouseMove(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function onMouseWheel(event) {
	if (event.target.id == "canvas") {
		event.preventDefault();
	}
	var factor = 1.0;
	switch (event.deltaMode) {
		case WheelEvent.DOM_DELTA_PIXEL:
			factor = 0.001;
			break;
		case WheelEvent.DOM_DELTA_LINE:
			factor = 0.05;
			break;
		case WheelEvent.DOM_DELTA_PAGE:
			factor = 1.0;
			break;
	}
	scale -= event.deltaY * factor;
	if (scale < 0.1) { scale = 0.1; }
	if (scale > 10) { scale = 10; }
	update();
}

function clear() {
	map.remove();
	scale = 3.6;
	posx = 0;
	posy = 0;
}

function render() {
	map = canvas.group().attr({"id":"routemap"});
	
	if (mode==0) {
		drawLineMap(lines["S41"], "S41", true);
	}
	drawLines();
	drawStations();
	update();
}

function update() {
	var bbox = document.getElementById("routemap").getBBox();
	
	// Center the map inside of the viewport
	var wx = (window.innerWidth * 0.5);
	var wy = (window.innerHeight * 0.5);
	var tx = - (bbox.width * 0.5);
	var ty =   (bbox.height * 0.5);
	
	map.scale(scale);
	map.translate((tx + posx) * scale + wx, (ty + posy) * scale + wy);

	console.log("posx="+posx+" posy="+posy)
}

function zoomin() {
	scale += 0.4;
	update();
}

function zoomout() {
	scale -= 0.4;
	update();
}

function moveleft() {
	posx += 0.8 * scale;
	update();
}

function moveright() {
	posx -= 0.8 * scale;
	update();
}

function moveup() {
	posy += 0.8 * scale;
	update();
}

function movedown() {
	posy -= 0.8 * scale;
	update();
}

function togglemode() {
	mode = (mode == 0) ? 1 : 0;
	console.log(mode);
	clear();
	render();
	update();
}

function drawLines() {
	for (var line in lines) {
		drawLine(lines[line], line);
	}
}

function drawStations() {
	if (mode == 0) {
		drawStationsMap();
	}
	else {
		drawStationsGeo();
	}
}

function drawStationsMap() {
	var x, y = 0;
	var curr = null;
	var r  = mode == 0 ? 5.2 : 2.2;
	var sw = mode == 0 ? 0.75 : 0.75;

	for (var station in stations) {
		curr = stations[station];

		x =   curr.pos.x;
		y = - curr.pos.y;

		var w = (curr.dot) ? curr.dot.w * scale : r;
		var h = (curr.dot) ? curr.dot.h * scale : r;
		var rot = (curr.dot) ? curr.dot.r : 0;

		if (curr.type == "CP") {
			/*
			map.circle(r*0.5)
				.attr({id:"cp-" + station, name:curr.name, cx:x, cy:y})
				.fill({color:"#777"})
				.stroke({width:sw, color:"#fff"})
				.addClass("cp")
				.mouseover(onMouseOverControlPoint);
			*/
		}
		else {
			map.rect(w, h)
				.radius(w*0.5)
				.center(x,y)
				.rotate(rot)
				.attr({id:"station-" + station})
				.fill({color:"#fff"})
				.stroke({width:sw, color:"#000"})
				.addClass("station")
				.mouseover(onMouseOverStation);
		}
	}
}

function drawStationsGeo() {
	var x, y = 0;
	var curr = null;
	var r  = mode == 0 ? 5.2 : 2.2;
	var sw = mode == 0 ? 0.75 : 0.75;

	for (var station in stations) {
		curr = stations[station];
		
		if (curr.type == "CP") {
			// skip map control points
			continue;
		}

		x =   (curr.geo.lon) * 600;
		y = - (curr.geo.lat) * 1000;

		map.circle(r)
			.attr({id:"station-" + station, name:curr.name, cx:x, cy:y})
			.fill({color:"#fff"})
			.stroke({width:sw, color:"#000"})
			.addClass("station")
			.mouseover(onMouseOverStation);
	}
}

function onMouseOverStation(event) {
	console.log("Station: " + event.target.getAttribute("name"));
}

function onMouseOverControlPoint(event) {
	console.log("CP: " + event.target.getAttribute("id")
				+ " @ " + event.target.getAttribute("cx") + ", " + event.target.getAttribute("cy"));
}

function drawLine(line, name) {
	if (mode == 0) {
		drawLineMap(line, name);
	}
	else {
		drawLineGeo(line, name);
	}
}

function drawLineMap(line, name, zone=false) {
	var path = "";
	var prev, curr, next = null;
	var px, py, cx, cy = 0;
	var a, h, v = 0;
	var dir = "n";
	var i = 0;

	for (var station of line.stations) {
		prev = curr;
		curr = stations[line.stations[i]];
		next = stations[line.stations[i+1]];

		if (prev) {
			px =   prev.pos.x + (line.offsets[i-1] ?   line.offsets[i-1].x : 0);
			py = - prev.pos.y + (line.offsets[i-1] ? - line.offsets[i-1].y : 0);
		} else {
			px = 0;
			py = 0;
		}

		cx =   curr.pos.x + (line.offsets[i] ?   line.offsets[i].x : 0);
		cy = - curr.pos.y + (line.offsets[i] ? - line.offsets[i].y : 0);

		if (i == 0) {
			path  = "M " + cx + " " + cy + " ";
		} else {
			var dx = cx - px;
			var dy = cy - py;
			var dxa = Math.abs(dx);
			var dya = Math.abs(dy);

			if (dxa == 0 && dya == 0) { // stations are in the same location
				continue;
			}
			else if (dxa == 0) { // stations are on the same vertical line
				path += "V " + cy + " ";
				h = 0;
				v = 1;
			}
			else if (dya == 0) { // stations are on the same horizontal line
				path += "H " + cx + " ";
				h = 1;
				v = 0;
			}
			else if (dxa == dya) { // stations are on a perfect 45 degree line
				path += "L " + cx + " " + cy + " ";
				h = 1;
				v = 1;
			}
			else { // this is where it gets complicated
				if (dxa > dya) { // distance on x greater
					if (h == 1 && v == 0) {
						// H -> D
						path += "H " + (px + (dxa - dya) * Math.sign(dx)) + " ";
						path += "L " + cx + " " + cy + " ";
						h = 1;
						v = 1;
					}
					else if (h == 0 && v == 1) {
						// D -> H
						path += "L " + (px + dya * Math.sign(dx)) + " " + cy + " ";
						path += "H " + cx + " ";
						h = 1;
						v = 0;
					}
					else if (h == 1 && v == 1) {
						// D -> H
						path += "L " + (px + dya * Math.sign(dx)) + " " + cy + " ";
						path += "H " + cx + " ";
						h = 1;
						v = 0;
					}
					else { // this is the first connection
						// H -> D
						path += "H " + (px + (dxa - dya) * Math.sign(dx)) + " ";
						path += "L " + cx + " " + cy + " ";
						h = 1;
						v = 1;
					}
				}
				else { // distance on y greater
					if (h == 0 && v == 1) {
						// V -> D
						path += "V " + (py + (dya - dxa) * Math.sign(dy)) + " ";
						path += "L " + cx + " " + cy + " ";
						h = 1;
						v = 1;
					}
					else if (h == 1 && v == 0) {
						// D -> V
						path += "L " + cx + " " + (py + dxa * Math.sign(dy)) + " ";
						path += "V " + cy + " ";
						h = 0;
						v = 1;
					}
					else if (h == 1 && v == 1) {
						// D -> V
						path += "L " + cx + " " + (py + dxa * Math.sign(dy)) + " ";
						path += "V " + cy + " ";
						h = 0;
						v = 1;
					}
					else { // this is the first connection
						// V -> D
						path += "V " + (py + (dya - dxa) * Math.sign(dy)) + " ";
						path += "L " + cx + " " + cy + " ";
						h = 1;
						v = 1;
					}
				}
			}
		}
		++i;
	}

	if (zone) {
		map.path(path)
			.attr({id:"zone-A"})
			.fill({color:"#fff"})
			.stroke({width:3*9, color:"#fff", linecap:"round"});
	}
	else {
		map.path(path)
			.attr({id:"line-" + name})
			.fill({color:"none"})
			.stroke({width:3, color:line.color, linejoin:"round", linecap:"round"});
	}
}

function drawLineGeo(line, name) {
	var first = true;
	var i = 0;
	var path = "";
	var prev = null;

	var x, y = 0;
	for (var station of line.stations) {
		x =   stations[station].geo.lon * 600;
		y = - stations[station].geo.lat * 1000;

		if (first) {
			path += "M " + x + " " + y + " ";
			first = false;
		} else {
			path += "L " + x + " " + y + " ";
		}
		++i;
		prev = station;
	}

	map.path(path)
		.attr({id:"line-" + name})
		.fill({color:"none"})
		.stroke({color:line.color});
}

function setupKeyboard() {
	document.addEventListener("keydown", function(event) {
		if(event.keyCode == 37) {
			moveleft();
		}
		else if(event.keyCode == 39) {
		    moveright();
		}
		else if(event.keyCode == 38) {
		    moveup();
		}
		else if(event.keyCode == 40) {
		    movedown();
		}
		else if(event.keyCode == 109) {
		    zoomout();
		}
		else if(event.keyCode == 107) {
		    zoomin();
		}
	});
}

window.onload = init;
