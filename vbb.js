var canvas;
var svg;
var network; // the actual SVG element
var scale = 3.6;
var posx = 0;
var posy = 0;


var mousedown = 0;
var mousedrag = 0;
var mouseX = 0, mouseY = 0;
var deltaX = 0, deltaY = 0;

function init() {
	canvas = SVG('canvas').size('100%', '100%')
	svg = document.getElementById('canvas').firstChild;

	network = canvas.group().attr({"id":"network"});

	var num_stations = Object.keys(stations).length;
	var num_lines = Object.keys(lines).length;

	console.log("num_stations = " + num_stations);
	console.log("num_lines = " + num_lines);

	initMouse();
	setupKeyboard();

	render();
	update();

	console.log(document.getElementById("network").getBBox());
}

function onDrag(event) {
	deltaX += event.dx;
	deltaY += event.dy;
	update();
}

function initMouse() {
	window.addEventListener("wheel", onMouseWheel, false);

	interact("#canvas").draggable({
		restrict: {
			  restriction: 'parent',
		},
		onmove: onDrag
	});
	interact("#canvas").styleCursor(false);
}

function onMouseWheel(event) {
	if (event.target.id == "canvas") {
		event.preventDefault();
	}
	scale -= event.deltaY * 0.1;
	update();
}

function render() {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	drawLines();
	drawStations();
}

function update() {
	// TODO
	var bbox = document.getElementById("network").getBBox();
	//console.log(bbox);

	var t1x = bbox.x + bbox.width * 0.5;
	var t1y = bbox.y + bbox.height * 0.5;

	var t2x = t1x + posx + deltaX + (bbox.width * 0.5 * scale);
	var t2y = t1y + posy + deltaY + (bbox.height * 0.5 * scale);

	var t2 = "translate(" + t2x + " " + t2y + ")";
	var s  = "scale(" + scale + ")";
	var t1 = "translate(-" + t1x + " -" + t1y + ")";

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
		drawLine(lines[line]);
	}
}

function drawStations() {
	for (var station in stations) {
		//console.log(stations[station].name);
		var x = stations[station].pos.x;
		var y = stations[station].pos.y;
		network.circle(2.2)
				.attr({cx:x, cy:y})
				.fill({color:"#fff"})
				.stroke({width:0.75, color:"#000"})
				.addClass("station");
	}
}

function drawLine(line) {
	var first = true;
	var i = 0;
	var path = "";

	for (var station of line.stations) {
		var x = (stations[station].pos.x + posx);
		var y = (stations[station].pos.y + posy);
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
	}

	network.path(path).fill({color:"none"}).stroke({color:line.color});
}

function setupKeyboard() {
	document.addEventListener('keydown', function(event) {
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
