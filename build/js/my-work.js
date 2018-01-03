
function activateWorkLink(){
	$('.nav-border .items .item').removeClass('active');
	$('.my-work-link').addClass('active');

	$('.nav .items').addClass('visible');
}

function setWorkBinds(){
	$('.left-btn').on('mouseenter', {state: "active"}, leftBtnSvgSet);
	$('.left-btn').on('mouseleave', {state: "inactive"}, leftBtnSvgSet);

	$('.right-btn').on('mouseenter', {state: "active"}, rightBtnSvgSet);
	$('.right-btn').on('mouseleave', {state: "inactive"}, rightBtnSvgSet);
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

$(document).ready( function (){

	activateWorkLink();
	setWorkBinds();
	leftBtnSvgSet({'data': {'state': 'inactive'}});
	rightBtnSvgSet({'data': {'state': 'inactive'}});
});
	
