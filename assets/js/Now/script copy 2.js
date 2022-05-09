//load the quiz -- check
//listen for click -- check
//load the first question -- check
//start the timer with total time -- check
//count the seconds until click -- check
//check the answer -- check
//update the score/timer
//load the next question
//start the timer with current time
//count the seconds until click
//repeat until all questions are loaded and answered or time has run out
//show scores
//prompt for initials

////////////////-----------VARIABLES---------/////////////////////
var quizArray = [
    arrayObj = {
        questionText: "1. Commonly used data types DO Not Include:",
        answerArray: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: "3"
    },
    arrayObj = {
        questionText: "2. The condition in an if/else statement is enclosed with __________.",
        answerArray: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: "3"
    },
    arrayObj = {
        questionText: "3. Arrays in JavaScript can be used to store __________.",
        answerArray: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correct: "4"
    },
    arrayObj = {
        questionText: "4. String values must be enclosed within __________ when being assigned to variables.",
        answerArray: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correct: "3"
    },
    arrayObj = {
        questionText: "5. A very useful tool used during development and debugging for printing content to the debugger is:",
        answerArray: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correct: "4"
    }
];
var timer = 10;

///////////////-------FUNCTIONS----------------////////////////
async function getAnswer (correct) {
    var checkAnswer = function (event) {
   
        console.log('function checkAnswer, answer = ' + correct);
       
        if (event.target.value === correct) {
            console.log('clicked = ' + event.target.value);
            console.log('EUREKA');
           
           } else {
            console.log('WRONG');
           };
    
           return clearInterval(runClock);
    
    } // end checkAnswer

    console.log('function getAnswer, this is the answer ' + correct);
    // displayTimer();
    // var answerList = document.querySelector("#btn-box");
    
    // answerList.addEventListener("click", function(){ checkAnswer(correct); });
     // answerList.addEventListener("click", checkAnswer);
     
        var timer = 10;
        var runClock = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(runClock);
            }
            console.log('Time: ' + timer);}, 1000);

        document.getElementById("quiz-box").addEventListener("click",
            checkAnswer);
    

    // setInterval(function() 
    // { document.getElementById("quiz-box").addEventListener("click", function(){ checkAnswer(correct); });
    // } , 15000);
   
    return timer;
    // wait for click
    

} // end getAnswer

var loadQuestions = function (question) {

    console.log('function loadQuestions');
    
    var newScreen = document.createElement("div");                    // build new quiz screen

    newScreen.id = "quiz-next";                              // tag for removal later
    newScreen.innerHTML = "<h1>" + question.questionText + "</h1>";
    
    var buttonBox = document.createElement("div");              // wrapper for all buttons
    buttonBox.id = "btn-box";
    
    newScreen.appendChild(buttonBox);

    for (i = 0; i < question.answerArray.length; i++) {      
        var btnWrap = document.createElement("div");             //wrapper for button
        btnWrap.className = "btn-box";
        btnWrap.innerHTML =  "<button class=quiz-btn id=quiz-btn type=button value=" + (i+1) + ">" + question.answerArray[i] + "</button>";
        buttonBox.appendChild(btnWrap);                      // add the answer to the list                      
    }  // for
    
    document.querySelector("#quiz-box").appendChild(newScreen);
    return;
    
}; // end loadQuestions

function runQuiz (num) {

    document.querySelector("#quiz-box").remove();        // clear last quiz screen
    
    if (num < quizArray.length) {
        console.log('function runQuiz, num =' + num + "number of questions= " + quizArray.length);
        console.log('before load questions');
        loadQuestions (quizArray[num]);

        getAnswer(quizArray[num].correct)
        .then (function(result) {
                console.log("back from getAnswer result = " + result);
                timer = timer - result;
                num++;
                runQuiz(num); 
        });
     } else {return; }

} // end runQuiz

var initQuiz = function() {

    console.log('function initQuiz');
    runQuiz(0);
} // end initQuiz

////////////////////////////////////////////////////////////////////
// use this for displaying result document.getElementById("demo").innerHTML = add();
initQuiz();
// call runQuiz listen for click
console.log('after initQuiz');

// runQuiz();
