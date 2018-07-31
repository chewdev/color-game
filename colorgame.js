var nestDivs = document.querySelectorAll("div div.currentColor");
var resetButton = document.querySelector("#reset");
var winningCol = document.querySelectorAll(".winningColor");
var head2 = document.querySelector("#currentRGB");
var head1El = document.querySelector("h1 .winningColor");
var hardModeEl = document.querySelector("#hardMode");
var easyModeEl = document.querySelector("#easyMode");
var tryAgainEl = document.querySelector("#centerthis");
var chosen = Math.floor(Math.random()*6);
var hardMode = true;
var winningState = false;
console.log(chosen);

easyModeEl.classList.toggle("easyselected");

hardModeEl.addEventListener("click", function(){
	if(!hardMode){
		hardMode=true;
		this.classList.toggle("hardselected");
		easyModeEl.classList.toggle("easyselected");
		resetChosen();
		setColors();
	}
});

easyModeEl.addEventListener("click", function(){
	if(hardMode){
		hardMode=false;
		this.classList.toggle("easyselected");
		hardModeEl.classList.toggle("hardselected");
		resetChosen();
		setColors();
	}
});


function resetChosen() {
	if(hardMode){
	chosen = Math.floor(Math.random()*6);
	}
	else{
	chosen = Math.floor(Math.random()*3);
	}
}

function setColors() {
	if(hardMode){
	for(var i=nestDivs.length/2;i<nestDivs.length;i++){
		nestDivs[i].style.display = "block";
	}
	for(var i=0;i<nestDivs.length;i++){
	nestDivs[i].style.background = getColor();
	console.log(nestDivs[i].style.background);
	if(i===chosen){
		head2.textContent = nestDivs[i].style.background;
	}}}
	else{
		for(var i=0;i<nestDivs.length/2;i++){
			nestDivs[i].style.background = getColor();
			if(i===chosen){
				head2.textContent = nestDivs[i].style.background;
			}
		}
		for(var i = nestDivs.length/2;i<nestDivs.length;i++){
			nestDivs[i].style.display = "none";
		}
	}
	winningState=false;
	tryAgainEl.innerHTML = "<br>";
}

setColors();



function getColor() {

	return "rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+")";
}

resetButton.addEventListener("click", function(){
			resetChosen();
			setColors();
			winningCol[0].style.background = "dodgerblue";
			winningState= false;
			this.textContent = "New Colors";

});


for(var i=0;i<nestDivs.length;i++){

		nestDivs[i].addEventListener("click", function(iCopy) {
			return function() {
			if(!winningState){
			var guess= iCopy;
			console.log("clicked");
			console.log(guess);
			if(guess===chosen){
			
			winningState = true;
			/*resetChosen();
			setColors();*/
			var winningColor = nestDivs[chosen].style.background;
			resetButton.textContent = "New Game?";
			tryAgainEl.textContent = "Correct!";
			console.log(winningColor);
			for(var i=0;i<winningCol.length;i++){
				winningCol[i].style.background = winningColor;
			}

			}
			else{
				tryAgainEl.textContent = "Try Again!";
				this.style.background="rgb(0, 0, 50)";
				
			}
		}
		};
	}(i));
}

