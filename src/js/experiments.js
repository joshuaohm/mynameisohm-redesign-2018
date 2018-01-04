
function activateExperimentLink(){
	$('.nav-border .items .item').removeClass('active');
	$('.experiments-link').addClass('active');

	$('.nav .items').addClass('visible');
}

function activateSlideLeft(next){

	$('#img-'+next).addClass('active');
	$('#details-'+next).addClass('active');
}

function activateSlideRight(next){

	$('#img-'+next).addClass('active-prev');
	$('#details-'+next).addClass('active');
}

function deactivateSlide(){

	$('.experiments-container .top .source').removeClass('active');
	$('.experiments-container .top .source').removeClass('active-prev');
	$('.experiments-container .bottom .details').removeClass('active');
}

function determineNextSlide(active, next, count){

	//determine which slide to transition to
	console.log(active+" "+next+" "+count);

	if(active == 0 && next == -1){
		next = count-1;
	}
	else if (active == parseInt(count - 1) && next == 1){
		next = 0;
	}
	else{
		next = +active + +next;
	}

	return next;
}

function getActiveIndex(){

	var id = $('.experiments-container .bottom .active').attr('id');

	return id.split('-')[1];

}

function getItemCount(){

	return $('.experiments-container .top .image').children().length;
}

function handleButtonClick(e){

	e.preventDefault();
	e.stopPropagation();

	var inc = 0;

	console.log(e.target);

	if($(e.target).hasClass('left-btn')){
		inc = -1;
	}
	else if($(e.target).hasClass('right-btn')){
		inc = 1;
	}

	var active = getActiveIndex();
	count = getItemCount();

	next = determineNextSlide(active, inc, count);

	console.log(next);

	deactivateSlide();

	if(inc == 1){
		activateSlideLeft(next);
	}
	else if(inc == -1){
		activateSlideRight(next);
	}
}

function leftBtnSvgSet(state){

	var width = 105;
	var height = 68;

	//Make two versions, one for mobile, other for desktop
	var svg = Snap('#prev').attr({ viewBox: '0 0 '+width+' '+height, preserverAspectRatio: "none"});
	var svg2 = Snap('#mobile-prev').attr({ viewBox: '0 0 '+width+' '+height, preserverAspectRatio: "none"});

	svg.clear();
	svg2.clear();

	var neonBlue = "#22b1c1";
	var neonOrange = "#c06213";

	var color = neonBlue;
	var glowFilter = Snap('#glow');

	if(state.data.state === "active"){
		color = neonOrange;
		glowFilter = Snap('#orangeGlow');
	}

	var strokeWidth1 = 2;

	

	//Strange bug: making the paths even, i.e M 5 5 L width-5 5 causes the lines not to show up.

	var innerTop = svg.path("M 35 12 L "+(width-12)+" 13").attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-top'});
	var innerRight = svg.path("M "+(width-12)+" 13 L "+(width-13)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-right'});
	var innerTopLeft = svg.path("M 35 12 L 12 "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-top-left'});
	var innerBottomLeft = svg.path("M 35 "+(height-13)+" L 12 "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-bottom-left'});
	var innerBottom = svg.path("M 35 "+(height-13)+" L "+(width-12)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-bottom'});

	var innerTop2 = svg2.path("M 35 12 L "+(width-12)+" 13").attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-top'});
	var innerRight2 = svg2.path("M "+(width-12)+" 13 L "+(width-13)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-right'});
	var innerTopLeft2 = svg2.path("M 35 12 L 12 "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-top-left'});
	var innerBottomLeft2 = svg2.path("M 35 "+(height-13)+" L 12 "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-bottom-left'});
	var innerBottom2 = svg2.path("M 35 "+(height-13)+" L "+(width-12)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'left-btn-path left-btn-glow-bottom'});
}

function rightBtnSvgSet(state){

	var width = 106;
	var height = 68;

	//Make two versions, one for mobile, other for desktop
	var svg = Snap('#next').attr({ viewBox: '0 0 '+width+' '+height, preserverAspectRatio: "none"});
	var svg2 = Snap('#mobile-next').attr({ viewBox: '0 0 '+width+' '+height, preserverAspectRatio: "none"});

	svg.clear();
	svg2.clear();

	var neonBlue = "#22b1c1";
	var neonOrange = "#c06213";

	var color = neonBlue;
	var glowFilter = Snap('#glow');

	if(state.data.state === "active"){
		color = neonOrange;
		glowFilter = Snap('#orangeGlow');
	}

	var strokeWidth1 = 2;

	

	//Strange bug: making the paths even, i.e M 5 5 L width-5 5 causes the lines not to show up.

	var innerTop = svg.path("M 12 12 L "+(width-35)+" 13").attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-top'});
	var innerLeft = svg.path("M 12 12 L 13 "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-right'});
	var innerTopRight = svg.path("M "+(width-35)+" 13 L "+(width-12)+" "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-top-right'});
	var innerBottomRight = svg.path("M "+(width-35)+" "+(height-12)+" L "+(width-12)+" "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-bottom-right'});
	var innerBottom = svg.path("M 12 "+(height-13)+" L "+(width-35)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-bottom'});

	var innerTop2 = svg2.path("M 12 12 L "+(width-35)+" 13").attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-top'});
	var innerLeft2 = svg2.path("M 12 12 L 13 "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-right'});
	var innerTopRight2 = svg2.path("M "+(width-35)+" 13 L "+(width-12)+" "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-top-right'});
	var innerBottomRight2 = svg2.path("M "+(width-35)+" "+(height-12)+" L "+(width-12)+" "+(height-34)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-bottom-right'});
	var innerBottom2 = svg2.path("M 12 "+(height-13)+" L "+(width-35)+" "+(height-12)).attr({ filter: glowFilter, fill: "none", stroke: color , strokeWidth: strokeWidth1, opacity: 1, class: 'right-btn-path right-btn-glow-bottom'});

}


function setExperimentBinds(){
	$('.left-btn').on('mouseenter', {state: "active"}, leftBtnSvgSet);
	$('.left-btn').on('mouseleave', {state: "inactive"}, leftBtnSvgSet);

	$('.right-btn').on('mouseenter', {state: "active"}, rightBtnSvgSet);
	$('.right-btn').on('mouseleave', {state: "inactive"}, rightBtnSvgSet);

	$('.left-btn').on('click', handleButtonClick);
	$('.right-btn').on('click', handleButtonClick);
}

$(document).ready( function (){

	activateExperimentLink();
	setExperimentBinds();
	leftBtnSvgSet({'data': {'state': 'inactive'}});
	rightBtnSvgSet({'data': {'state': 'inactive'}});

});
	
