// quiz questions & answers
var quizArray = [
    arrayObj = {
        questionText: "Commonly used data types DO Not Include:",
        answerArray: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: 3
    },
    arrayObj = {
        questionText: "The condition in an if/else statement is enclosed with __________.",
        answerArray: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: 3
    },
    arrayObj = {
        questionText: "Arrays in JavaScript can be used to store __________.",
        answerArray: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correct: 4
    },
    arrayObj = {
        questionText: "String values must be enclosed within __________ when being assigned to variables.",
        answerArray: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correct: 3
    },
    arrayObj = {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerArray: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correct: 4
    }
];

var timer = 10;                                              // Initial clock time, prime start
var timerEl = document.getElementById('clock');

var quizWrapper = document.querySelector("#quiz-box");      // start button

var userInits = "";                                         // user data for localStorage

var generateBtn = function(answers) {

    console.log("in generateBtn" + answers);

};  // end function gererateBtn

var storeUser = function() {
    console.log("storeUser function");
};  // end function storeUser

var displayScores = function() {
    console.log("in displayScores");
};  // end function displayScores

var endQuiz = function() {
    console.log("In function endQuiz");
    // clip last question node
    var lastScreen = document.querySelector("#quiz-next");
    if (lastScreen) {    
        lastScreen.remove();
    } // if

    // display final score
    // check for > 0
    // if true build final screen & prompt for initials
    // On submit click, store score and initials in local store
    // display high scores
   
    if (timer > 0) {
        storeUser();    
    }
    else {
        displayScores();
    }
};  // end function endQuiz

var displayTime = function(current) {
    timerEl.textContent = "Time:  " + current;
};  // end function displayTime


var clockTimer = function() {
    
    console.log("in function clockTimer");  
    // count down the time
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        console.log("in setInterval");
        if (timer > 0) {
          // Set the `textContent` of `timerEl` to show the remaining seconds
          displayTime(timer);
        // Decrement `timeLeft` by 1
          timer--;
        } else {
          // Use `clearInterval()` to stop the timer
          clearInterval(timeInterval);
          // Call the `displayMessage()` function
          displayTime(timer);
        }
      }, 1000);
    
    console.log("timer = " + timer);
    
// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds

};   // end function clockTimer

var displayQuestion = function(num, newNode) {

    console.log("in displayQuestion");

    var answerList = document.createElement("div");                 // list of answer buttons
    var nextAnswer = document.createElement("button");              // each answer button
    var answers = quizArray[num].answerArray;
    
    answerList.id = "button-box";                                   // tag for clicks

    newNode.innerHTML = "<h1>" + quizArray[num].questionText + "</h1>";
    
    
    for (i = 0; i < answers.length; i++) {                       //build answer buttons}
        nextAnswer.innerHTML = "<button class='quiz-btn' id='answer' type='button'>" + answers[i] + "</button>";  
        answerList.appendChild(nextAnswer);                     // add the answer to the list
    }  // for
    newNode.appendChild(answerList);
    
    // (generateBtn(quizArray[num].answerArray));      // quizArray[num].answerArray)
    return(newNode);

};  // end function displayQuestion

var checkAnswer = function (num) {
    if (quizArray[num].correct === num) {
        alert("matched" + quizArray[num].correct);
    }
};  // end function checkAnswer

var runQuiz = function(event) {
    event.preventDefault();
    
    console.log("in runQuiz");

    clockTimer();

    for (var i = 0; i < quizArray.length; i++)   {
        if (timer > 1) {

            // clear last quiz screen
            var lastScreen = document.querySelector("#quiz-next");
            lastScreen.remove();

            // get new quiz node
            var newScreen = document.createElement("div");
            newScreen.id = "quiz-next";                                       // tag for removal later
        
            // generate question wait for answer, return updated timer
                          
            quizWrapper.appendChild(displayQuestion(i, newScreen));

            var answerEvent = document.querySelector("#button-box");

            answerEvent.addEventListener("click", checkAnswer[i]);
        }
        else {
            break;
        }
    }   // for

    console.log("Time: " + timer);

    endQuiz();

};  // end function runQuiz

var initQuiz = function() {     // load initial screen to start quiz

    console.log("in initQuiz");

    // var wrapper = document.getElementById("quiz-box");
    var initialQuiz = document.createElement("div");

    initialQuiz.id = "quiz-next";

    initialQuiz.innerHTML = "<h1>Coding Quiz Challenge</h1>" + 
    "<p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>" +
    "<button class='start-btn' id='start-quiz' type='button'>Start Quiz</button>";  
    
    quizWrapper.appendChild(initialQuiz);

    displayTime(0);
    
};  // end function initQuiz

initQuiz();

quizWrapper.addEventListener("click", runQuiz);
  
            