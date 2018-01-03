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

function setLandingBinds(){

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

	setLandingBinds();

	activateNav();

	setTimeout(function (){
		typeWord(passions, index, word);
		drawSphere();
	}, 1000);
	

});