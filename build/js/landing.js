/* Credit to globe animation:  */


/********** Begin Globe Animation **********/

var sphere = new Sphere3D();
var rotation = new Point3D();
var distance = 400;

var lastX = -1;
var lastY = -1;


/********** Colors **********/

var blue = "#22b1c1";
var darkBlue = "#09484f";

var red = "#ed2c09";
var darkRed = "#561408";

var green = "#00aa52"
var darkGreen = "#004f26";

var yellow = "#efeb00";
var darkYellow = "#a09d00";

pointArray = [];

function Point3D() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
}

function Color(){
  this.light = red;
  this.dark = darkRed;
}

function Location() {

  this.coord = new Point3D();
  this.color = new Color();

}

function Sphere3D(radius) {
  this.vertices = new Array();
  this.radius = (typeof(radius) == "undefined" || typeof(radius) != "number") ? 20.0 : radius;
  this.darkRings = 256;
  this.rings = 16;
  this.slices = 32;
  this.numberOfVertices = 0;

  var M_PI_2 = Math.PI / 2;
  var dTheta = (Math.PI * 2) / this.slices;
  var dPhi = Math.PI / this.rings;

  // Iterate over latitudes (rings)
  for (var lat = 0; lat < this.rings + 1; ++lat) {
    var phi = M_PI_2 - lat * dPhi;
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);

    // Iterate over longitudes (slices)
    for (var lon = 0; lon < this.slices + 1; ++lon) {
      var theta = lon * dTheta;
      var cosTheta = Math.cos(theta);
      var sinTheta = Math.sin(theta);
      p = this.vertices[this.numberOfVertices] = new Point3D();

      p.x = this.radius * cosTheta * cosPhi;
      p.y = this.radius * sinPhi;
      p.z = this.radius * sinTheta * cosPhi;
      this.numberOfVertices++;
    }
  }
}

function rotateX(point, radians) {
  var y = point.y;
  point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
  point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
}

function rotateY(point, radians) {
  var x = point.x;
  point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
  point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
}

function rotateZ(point, radians) {
  var x = point.x;
  point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
  point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
}

function projection(xy, z, xyOffset, zOffset, distance) {
  return ((distance * xy) / (z - zOffset)) + xyOffset;
}

function strokeSegment(index, ctx, width, height) {
  var x, y;
  var p = sphere.vertices[index];

  rotateX(p, rotation.x);
  rotateY(p, rotation.y);
  rotateZ(p, rotation.z);

  x = projection(p.x, p.z, width / 2.0, 100.0, distance);
  y = projection(p.y, p.z, height / 2.0, 100.0, distance);

  if (lastX == -1 && lastY == -1) {
    lastX = x;
    lastY = y;
    return;
  }

  if (x >= 0 && x < width && y >= 0 && y < height) {
    if (p.z < 0) {
      ctx.strokeStyle = darkBlue;
    } else {
      ctx.strokeStyle = blue;
    }

    if(index == 10){
      //console.log("x: "+p.x+" y: "+p.y+" z: "+p.z);
    }
    

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    lastX = x;
    lastY = y;
  }
}

function drawPoint(ctx, index, width, height){

  var location = pointArray[index];


  rotateX(location.coord, rotation.x);
  rotateY(location.coord, rotation.y);
  rotateZ(location.coord, rotation.z);

  
  x = projection(location.coord.x, location.coord.z, width / 2.0, 100.0, distance);
  y = projection(location.coord.y, location.coord.z, height / 2.0, 100.0, distance);



  if (x >= 0 && x < width && y >= 0 && y < height) {
    if (location.coord.z < 0) {
      ctx.fillStyle = location.color.dark;
    } else {
      ctx.fillStyle = location.color.light;
    }
  }


  //console.log("x: "+x+" y: "+y+" z: "+location.z);
  //console.log(location.x);

  //pointArray[index].x = location.x;
  //pointArray[index].y = location.y;
  //pointArray[index].z = location.z;

  
  ctx.fillRect(x, y, 3, 3);


}

function render() {

  var canvas = document.getElementById("sphere3d");
  var width = canvas.getAttribute("width");
  var height = canvas.getAttribute("height");
  var ctx = canvas.getContext('2d');

  var p = new Point3D();
  ctx.fillStyle = "black";

  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(0, 0, width, height);

  // draw each vertex to get the first sphere skeleton
  for (i = 0; i < sphere.numberOfVertices; i++) {
    strokeSegment(i, ctx, width, height);
  }

  // now walk through rings to draw the slices
  for (i = 0; i < sphere.slices + 1; i++) {
    for (var j = 0; j < sphere.rings + 1; j++) {
      strokeSegment(i + (j * (sphere.slices + 1)), ctx, width, height);
    }
  }

  for(i = 0; i < pointArray.length; i++){
    drawPoint(ctx, i, width, height);
  }

  

  rotation.x = 0;
  rotation.y = .002;
  rotation.z = .0002;

  
}

function init() {

  var loc1 = new Location();
  loc1.coord.x = 5;
  loc1.coord.y = 2;
  loc1.coord.z = 22;

  var loc2 = new Location();
  loc2.coord.x = 16;
  loc2.coord.y = 10;
  loc2.coord.z = 12;
  loc2.color.light = green;
  loc2.color.dark = darkGreen;

  var loc3 = new Location();
  loc3.coord.x = 0;
  loc3.coord.y = 20;
  loc3.coord.z = 20;

  var loc4 = new Location();
  loc4.coord.x = -15;
  loc4.coord.y = -4;
  loc4.coord.z = -15;
  loc4.color.light = yellow;
  loc4.color.dark = darkYellow;

  var loc5 = new Location();
  loc5.coord.x = -8;
  loc5.coord.y = -12;
  loc5.coord.z = -18;
  loc5.color.light = green;
  loc5.color.dark = darkGreen;


  pointArray.push(loc1);
  pointArray.push(loc2);
  pointArray.push(loc3);
  pointArray.push(loc4);
  pointArray.push(loc5);

  // Set framerate to 30 fps
  setInterval(render, 1000/60);
}


/********** End Globe Animation **********/


var cursorInterval = 100;
var waitDelay = 12;

function activateLandingLink(){
	$('.nav-border .items .item').removeClass('active');
	$('.home-link').addClass('active');
}

function activateNav(){
	$('#nav-border').addClass('activate');
	$('.nav .items').addClass('activate');
}

function changeWordAndStartTyping(passions, index, word){

	if(index == passions.length-1){
		index = 0;
	}
	else{
		index++;	
	}

	var newWord = passions[index];

	while(newWord == word){
		newWord = passions[Math.floor(Math.random() * passions.length)];
	}

	typeWord(passions, index, newWord);

}

function deleteWord(passions, index, word){


	wordClone = word;

	var deleteInterval = setInterval(function(){


		wordClone = wordClone.substring(0, wordClone.length-1);
		$('#passion').html(wordClone);

		if(wordClone.length == 0){
			$('.cursor').addClass("empty");
			clearInterval(deleteInterval);
			setTimeout(function (){
				changeWordAndStartTyping(passions, index, word);
			},cursorInterval*waitDelay);
		}
	},cursorInterval);
}

function typeWord(passions, index, word){

	
	wordClone = "";
	count = 0;
	

	var typeInterval = setInterval(function(){

		if(count == 0){
			$('.cursor').removeClass('empty');
		}

		count++;
		wordClone = word.substring(0, count);
		$('#passion').html(wordClone);

		if(word.length == count){
			clearInterval(typeInterval);
			setTimeout(function (){
				deleteWord(passions, index, word);
			},cursorInterval*waitDelay);
		}
	},cursorInterval);
}

function shufflePassions(a){
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
	    j = Math.floor(Math.random() * (i + 1));
	    x = a[i];
	    a[i] = a[j];
	    a[j] = x;
	}

	return a;
}

function drawSphere(){
	var slices = 9,
    angle = 360 / slices;

	for (var i = 0; i < (slices -1); i++) {
	  var slice = $('<div></div>');  
	  slice.css('transform', 'rotateY(' + angle * i + 'deg)');
	  $('.globe').append(slice);
	}
}



$(document).ready( function (){

	var passions = ["PHP(Laravel)", "CSS(SASS)", "HTML(pug)", "SQL/NoSQL", "Gulp/Webpack", "JavaScript", "Java", "C#", "C", "Astronomy", "History", "Science", "Animals", "Languages", "WebVR", "Music", "Equality", "Data", "UX", "Automation", "Android"];
	passions = shufflePassions(passions);

	var index = 0;
	var word = passions[index];
	activateLandingLink();

	activateNav();

	setTimeout(function (){
		typeWord(passions, index, word);
		init();
	}, 1000);
	

});