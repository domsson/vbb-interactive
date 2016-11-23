var canvas;
var svg;
var network; // the actual SVG element
var scale = 3.6;
var posx = 0;
var posy = 0;

var info;


var mousedown = 0;
var mousedrag = 0;
var mouseX = 0, mouseY = 0;

function init() {
	canvas = SVG("canvas").size("100%", "100%");
	svg = document.getElementById("canvas").firstChild;

	network = canvas.group().attr({"id":"network"});

	var num_stations = Object.keys(stations).length;
	var num_lines = Object.keys(lines).length;

	console.log("num_stations = " + num_stations);
	console.log("num_lines = " + num_lines);

	info = document.getElementById("info");

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
	update();
}

function render() {
	drawLines();
	drawStations();
}

function update() {
	var bbox = document.getElementById("network").getBBox();

	var mapcenterx = bbox.x + (bbox.width * 0.5);
	var mapcentery = bbox.y + (bbox.height * 0.5);

	var moffx = mouseX - mapcenterx;
	var moffy = mouseY - mapcentery;

	console.log("mapcenterx="+mapcenterx+" mapcentery="+mapcentery);

	var t1x = mapcenterx; // + moffx;
	var t1y = mapcentery; //+ moffy;

//	var t2x = t1x + posx + (bbox.width * 0.5 * scale);
//	var t2y = t1y + posy + (bbox.height * 0.5 * scale);

	var t2x = posx + (bbox.width * 0.5 * scale);
	var t2y = posy + (bbox.height * 0.5 * scale);

	var t2 = "translate(" + t2x + " " + t2y + ")";
	var s  = "scale(" + scale + ")";
	var t1 = "translate(" + (-t1x) + " " + (-t1y) + ")";

	network.attr({transform: t2 + " " + s + " " + t1});
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

function drawLines() {
	for (var line in lines) {
		drawLine(lines[line], line);
	}
}

function drawStations() {
	for (var station in stations) {
		//var x = stations[station].pos.x;
		//var y = stations[station].pos.y;
		var x = (stations[station].geo.lon) * 600;
		var y = - (stations[station].geo.lat) * 1000;
		network.circle(2.2)
				.attr({id:"station-" + station, name:stations[station].name ,cx:x, cy:y})
				.fill({color:"#fff"})
				.stroke({width:0.75, color:"#000"})
				.addClass("station")
				.mouseover(onMouseOverStation);
	}
}

function onMouseOverStation(event) {
	console.log(event.target.getAttribute("name"));
}

function drawLine(line, name) {
	var first = true;
	var i = 0;
	var path = "";
	var prev = null;

	for (var station of line.stations) {
		//var x = (stations[station].pos.x + posx);
		//var y = (stations[station].pos.y + posy);
		if (!first) {
			//console.log(stations[prev].name +" -> "+ stations[station].name);
		}

		var x = (stations[station].geo.lon + posx) * 600;
		var y = - (stations[station].geo.lat + posy) * 1000;
		if (line.offsets[i]) {
			x += line.offsets[i].x;
			y += line.offsets[i].y;
		}
		if (first) {
			path += "M " + x + " " + y + " ";
			first = false;
		} else {
			path += "L " + x + " " + y + " ";
		}
		++i;
		prev = station;
	}

	network.path(path)
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
