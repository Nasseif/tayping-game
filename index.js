// Array Of Words
const words = [
    "Ani", "Sam", "Joe",
    "Volvo", "BMW", "Ford", "Mazda",
    "john",
    "Nasseif",
    "Welcome",
    "Grand Mother",
    "Sister",
    "Accept",
    "Agree",
    "Arrive",
    "Challenge",
    "terrorism",
    "Consider",
    "Dream",
    "Javascript",
    "Film",
    "fontawesome",
    "Download",
    "mouth",
    "stress",
    "processor",
    "Sword",
    "Cricket","Basketball","Football","Badminton","Tennis"
];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let selected = document.querySelector(".select_box");
let selectBox = document.querySelector("#box");
let selectedText = document.querySelector(".selected span");
let selectElements = document.querySelectorAll("#box li");
let popupButton = document.querySelector(".popup-button");
let validation = document.querySelector(".validation");
let animation = document.querySelector(".pyro");

// Setting Levels
const lvls = {
    "Easy": 10,
    "Normal": 8,
    "Hard": 5
};


// levels words
let Hard = [];
let Easy = [];
let Normal = [];
words.map((el) => {
    if (el.length > 7) {
        Hard.push(el);
    } else if (el.length <= 6 && el.length >= 4) {
        Easy.push(el);
    } else {
        Normal.push(el);
    }
});


// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];



// Setting lvl name & seconds & score when Choose level
selectElements.forEach(item => {
    item.addEventListener("click", () => {
        defaultLevelName = item.textContent; // Change Level From Here
        defaultLevelSeconds = lvls[defaultLevelName];
        selectedText.innerHTML = item.textContent;
        lvlNameSpan.innerHTML = defaultLevelName;
        secondsSpan.innerHTML = defaultLevelSeconds;
        timeLeftSpan.innerHTML = defaultLevelSeconds;
    });
});

// Toggle Select Box
selected.addEventListener("click", function () {
    if (!selectBox.classList.contains("show")) {
        selectBox.classList.add("show");
    } else {
        selectBox.classList.remove("show");
    }
});

// disable paste Event
input.onpaste = function () {
    return false
}

// when Click to start The Game
popupButton.onclick = function (e) {
    if (selectedText.innerHTML === "Select Level") {
      alert( "Please, Select Level");
        e.preventDefault();
    } else {
        this.parentElement.parentElement.remove();
        input.focus();
        // Generate Word Function
        let level = eval(selectedText.innerHTML);
        scoreTotal.innerHTML = level.length;
        genrateWords(level);
    }
}

// generate the words and select random word
function genrateWords(level) {
    // Get Random Word from Array
    let randomWord = level[Math.floor(Math.random() * level.length)];
    // Get Word Index
    let wordIndex = level.indexOf(randomWord);
    level.splice(wordIndex, 1);
    // show the random word
    theWord.innerHTML = randomWord;
    

    // call start play
    startPlaying(level);
}

// Starting time and check correctness word when you start playing
function startPlaying(level) {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    // give 3 seconds only for first word
    giveExtraSeconds();

    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // stop Timer
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // empty input field
                input.value = "";
                // increase score
                scoreGot.innerHTML++;
                if (level.length > 0) {
                    // call generate word function
                    genrateWords(level);
                } else {
                    congrtzMessage();
                }
            } else {
                gameOverMessage();
            }
        }
        startAgain();
    }, 1000);
}

// Give 3 seconds Extra for only first word
function giveExtraSeconds() {
    giveExtraSeconds = function () { }; // kill it as soon as it was called
    let extraSeconds = defaultLevelSeconds;
    extraSeconds += 3;
    timeLeftSpan.innerHTML = extraSeconds;
};

// Message will appear when you write all words correct
function congrtzMessage() {
    finishMessage.innerHTML = `
                        <div class="congratz">
                            <span class="good">Congratz </span>
                            <a href="#" class="start btn-again">Start Again</a>
                        </div>`;
    finishMessage.classList.add("show");
    animation.classList.add("play");
 
}

// Message will appear if you don't write thw word correct
function gameOverMessage() {
    finishMessage.innerHTML = `
                        <div class="game-over">
                            <span class="bad">Game Over</span>
                            <a href="#" class="start btn-again">Start Again</a>
                        </div>`;
    finishMessage.classList.add("show");
}
// Reload everything to start playing Again 
function startAgain() {
    let btnAgain = document.querySelector(".btn-again");
    btnAgain.onclick = function () {
        document.location.reload();
    }
}