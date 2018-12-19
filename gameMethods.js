var lettersArray; // Global variable of the chosen letter's words.

// Redirects the player to the game page.
function startGame() {
	var wordsArray = ["TELEPHONE", "BLACKBOARD", "VEGETABLES", "FULLSTACK", "AIRPLANE", "ENCYCLOPEDIA", "TYRANNOSAURUS"];
	var word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
	localStorage.setItem("chosenWord", word);
	window.location.href="gamePage.htm";
}

// Prints the cards of the game with the letters on the screen.
function showCards() {
	var word = localStorage.getItem("chosenWord");
	var copyOfLettersArray = word.split('');
	var letter;
	var letterIndex;
	var letterButton;
		
	lettersArray = word.split('');
	document.getElementById("chosenName").innerHTML = "<u>YOUR WORD:</u> " + word;
	
	// Creates a card for each letter and prints the cards in a random order.
	for (var i=0; i < lettersArray.length; i++) {	
		letter = copyOfLettersArray[Math.floor(Math.random() * copyOfLettersArray.length)];
		letterIndex = copyOfLettersArray.indexOf(letter);
		copyOfLettersArray.splice(letterIndex, 1);
		letterButton = document.createElement("button");
		letterButton.id = letter;
		letterButton.innerHTML = letter;
		letterButton.onclick = checkIfCorrectOne;
		document.getElementById('allLetters').appendChild(letterButton);
	}
	
	setTimeout(makeLettersInvisible, 2800); // Lets the player see the cards, before they're being hidden.
}

// Clears the game's cards.
function makeLettersInvisible() {
	var content = document.getElementsByClassName("allLetters")[0];
	var cardsButtons  = content.getElementsByTagName("button");
	
	for (var i=0; i < cardsButtons.length; i++) {	
		cardsButtons[i].innerHTML = '';
	}
	
	// Modifies the main title.
	if (document.getElementById('chosenName').innerHTML != 'PLAY!') {
		document.getElementById('chosenName').innerHTML = 'PLAY!';
	}
	
	// Removes the sub title.
	if (document.getElementById('subTitle').innerHTML != '') {
		document.getElementById('subTitle').innerHTML = '';
	}
}

// Check if the chosen card has a letter in the original order.
function checkIfCorrectOne() {
	if (this.id == lettersArray[0]) {
		this.innerHTML = this.id;
		lettersArray.shift();
		if (lettersArray.length == 0) {
			document.getElementById('chosenName').innerHTML = 'Good Job!';
		}	
	} 
	else {
		var chosenWord = localStorage.getItem("chosenWord");
		lettersArray = chosenWord.split('');
		makeLettersInvisible();
	}	
}

function restartGame() {
	startGame();
}

function exitGame() {
	window.location.href="memoryGame.htm";
}

// Prints new lines as much as requested
function printNewLines(numberOfLines) {
	for (var i = 0; i < numberOfLines; i++) { 
		document.write('<br>');
	}
}