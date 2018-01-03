function setNavVisible(){
	$('#nav-border').addClass('visible');
	$('#nav-border').removeClass('active');
}

function setNavBinds(svg){

	$(window).on('resize', {svg: svg}, navSvgSet);
}

function navSvgSet(svg){



	var width = $('.nav').width();
	var height = $('.nav').height();

	svg = Snap('#nav-border').attr({ viewBox: '0 0 '+width+' '+height, preserverAspectRatio: "xMinYMin meet"});

	svg.clear();

	var neonBlue = "#22b1c1";
	var neonOrange = "#c06213";

	var strokeWidth1 = 2;
	var glowFilter = "none";
	var blueFilter = '<filter id="glow" x="-5000%" y="-5000%" width="10000%" height="10000%"><feFlood result="flood" flood-color="'+neonBlue+'" flood-opacity="1"></feFlood><feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite><feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology><feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur><feMerge><feMergeNode in="blurred"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>';
	var orangeFilter = '<filter id="orangeGlow" x="-5000%" y="-5000%" width="10000%" height="10000%"><feFlood result="flood" flood-color="'+neonOrange+'" flood-opacity="1"></feFlood><feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite><feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology><feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur><feMerge><feMergeNode in="blurred"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>';
	svg.append( Snap.parse(blueFilter));
	var glowFilter = Snap('#glow');

	svg.append( Snap.parse(orangeFilter));
	var orangeFilter = Snap('#orangeGlow');


	//Strange bug: making the paths even, i.e M 5 5 l width-5 5 causes the lines not to show up.

	var innerTop = svg.path("M 5 5 L "+(width-5)+" 6").attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border top'});
	var innerRight = svg.path("M "+(width-5)+" 6 L "+(width-6)+" "+height*(2/3)).attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border right'});
	var innerLeft = svg.path("M 5 5 L 6 "+height*(2/3)).attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border left'});
	var innerBottomLeft = svg.path("M 6 "+height*(2/3)+" L 25 "+(height-5)).attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border bottom-left'});
	var innerBottomRight = svg.path("M "+(width-6)+" "+height*(2/3)+" L "+(width-25)+" "+(height-5)).attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border bottom-right'});
	var innerBottom = svg.path("M 25 "+(height-6)+" L "+(width-25)+" "+(height-5)).attr({ filter: glowFilter, fill: "none", stroke: neonBlue , strokeWidth: strokeWidth1, opacity: 1, class: 'nav-border bottom'});

	return svg;
}	

$(document).ready( function (){


	var svg;
	
	svg = navSvgSet(svg);
	setNavBinds(svg);

	setNavVisible();

});