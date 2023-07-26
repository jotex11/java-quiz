var introEl = document.getElementById("intro");
var questionConEl = document.getElementById("questions-contain");
var allDoneEl = document.getElementById("all-done");
var initialsEl = document.getElementById("initials-page");
var highscoreEl = document.getElementById("high-score");
var scoreListEl = document.getElementById("highscore-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

var viewscoreEl = document.getElementById("button");
var startbtnEl = document.getElementById("start-quiz");
var gobackEl = document.getElementById("go-back");
var clearEl = document.getElementById("clear");

var questionsEl = document.getElementById("the-question");
var answerbuttonEl = document.getElementById("answers");
var timerEl = document.getElementById("timer");
var score = 0;
var timeleft;
var gameover 
timerEl.innerText = 0;

var highscores = [];
var questionsShuffled
var questionIndex = 0 

var questions = [ 
{question: 'Commonly used data types DO NOT include?',
answer: '3. alerts',
choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
},
{question: 'The condition in an if / else statement enclosed within___.',
answer: '3. parentheses',
choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. parentheses'}, {choice: '4. square brackets'}]
},
{question: 'Arrays in JavaScript can be used to store___.',
answer: '4. all of the above',
choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}] 
},
{question: 'String values must be enclosed within ___ when being assigned to variables',
answer: '3. quotes',
choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parentheses'}]
},
{question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
answer: '4. console.log',
choices: [{choice: '1. javascript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console.log'}]
},
];

var startPage = function() {
    highscoreEl.classList.add('hide')
    highscoreEl.classList.remove('show')
    introEl.classList.remove('hide')
    introEl.classList.add('show')
    highscoreEl.removeChild(highscoreEl.lastChild)
    questionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

var setTime = function() {
    timeleft = 60;


var timecheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timecheck)
    }
    if (timeleft < 0) {
        showScore()
        timerEl.innertext = 0
        clearInterval(timecheck)
    }
}, 1000)
}

var startGame = function() {
    introEl.classList.add('hide');
    introEl.classList.remove('show');
    questionConEl.classList.remove('hide');
    questionConEl.classList.add('show');
    questionsShuffled = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

var setQuestion = function() {
    resetAnswers()
    displayQuestion(questionsShuffled[questionIndex])
}

var resetAnswers = function() {
    while (answerbuttonEl.firstChild) {
        answerbuttonEl.removeChild(answerbuttonEl.firstChild)
    };
};

var displayQuestion = function(index) {
    questionsEl.innerText = index.question
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", checkAnswer)
        answerbuttonEl.appendChild(answerbutton)
    }
};

var correctAnswer = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("score")
        wrongEl.classList.remove("score")
        wrongEl.classList.add("hide")
    }
}

var wrongAnswer = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("score")
        correctEl.classList.remove("score")
        correctEl.classList.add("hide")
    }
}

var checkAnswer = function(event) {
    var selectedAnswer = event.target
    if (questionsShuffled[questionIndex].answer === selectedAnswer.innerText) {
        correctAnswer()
        score = score + 7
    }
    else {
        wrongAnswer()
        score = score - 1;
        timeleft = timeleft -3;
    };

    questionIndex++ 
    if (questionsShuffled.legnth > questionIndex + 1) {
    setQuestion();
}
else {
    gameover = "true";
    showScore()
    }
}

var showScore = function() {
    questionConEl.classList.add("hide");
    allDoneEl.classList.remove("hide");
    allDoneEl.classList.add("show");

    var scoreShowed = document.createElement('p');
    scoreShowed.innerText = (" Your final score is " + score + " ! ");
    highscoreEl.appendChild(scoreShowed);
}

var createScore = function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initals-page").value;
    if (!initials) {
        alert(" Enter your initials. ");
        return;
    }
    var HighScore = {
        initials: initials,
        score: score
    }
    highscores.push(HighScore);
    highscores.sort((a, b) => {return b.score-a.score});
}


var loadScore = function() {
    var loadedScores = localStorage.getItem("Highscores")
    if (!loadedScores) {
        return false;
    }
    loadedScores = JSON.parse(loadedScores);
    loadedScores.sort((a, b) => {return b.score-a.score})

    for (var i = 0; i < loadedScores.legth; i++) {
        var highscoreEl = createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerText = loadedScores[i].initials + " - " + loadedScores[i].score;
        scoreListEl.appendChild(highscoreEl);

        highscores.push(loadedScores[i]);
    }
}



function clear() {
    highscores = [];

    while (scoreListEl.firstChild) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
    localStorage.clear(highscores);
}

loadScore()

    startbtnEl.addEventListener("click", startGame)
    initialsEl.addEventListener("submit", createScore)
    gobackEl.addEventListener("click", startPage)
    clearEl.addEventListener("click", clear)