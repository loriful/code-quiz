// quiz questions & answers
var quizArray = [
    arrayObj = {
        questionText: "Commonly used data types DO Not Include:",
        answerArray: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: "2"
    },
    arrayObj = {
        questionText: "The condition in an if/else statement is enclosed with __________.",
        answerArray: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: "2"
    },
    arrayObj = {
        questionText: "Arrays in JavaScript can be used to store __________.",
        answerArray: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correct: "3"
    },
    arrayObj = {
        questionText: "String values must be enclosed within __________ when being assigned to variables.",
        answerArray: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correct: "2"
    },
    arrayObj = {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerArray: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correct: "3"
    }
];

var timer = 30;                                              // Initial clock time, prime start
var timerEl = document.getElementById('clock');

var totalQuestions = quizArray.length;                      // number of questions
var quizBtn = document.querySelector("#quiz-box");          // start button
var quizWrapper = document.querySelector("#quiz-box");      // container for quiz screen

var generateBtn = function(answers) {

    console.log("in generateBtn" + answers);

};  // end function gererateBtn

var storeUser = function() {
    console.log("storeUser function");
};  // end function storeUser

var displayScores = function() {
    var userInits = "";  
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

// var checkAnswer = function (event) {
//     var num = 0;            // tTODO esting only, pass into function later after event us understoog
   
//     var targetBtn = event.target;           // Get the element from the event, the answer
    
//     console.log("targetBtn "+ targetBtn + " correct answer " + quizArray[num].correct);

//     if (targetBtn === (quizArray[num].correct)) {         // Does target match correct answer
        
//         alert("matched" + targetBtn + " " + quizArray[num].correct);
//     } // if

// };  // end function checkAnswer

var displayQuestion = function(num) {

    console.log("in displayQuestion");
    
    var correctAnswer = quizArray[num].correct;                            // correct answer for current question]
    var answers = quizArray[num].answerArray;                          // all possible answers

    var wrapper = document.querySelector("#quiz-box"); 
    var newScreen = document.createElement("div");                    // build new quiz screen
    newScreen.id = "quiz-next";                                       // tag for removal later

    var answerList = document.createElement("div");                   // list of answer buttons
    
    
    answerList.id = "button-box";                                   // tag for clicks

    newScreen.innerHTML = "<h1>" + quizArray[num].questionText + "</h1>";
    
    // console.log("number of answers " + answers.length);

    for (i = 0; i < answers.length; i++) {                              // build answer buttons           
        var nextAnswer = document.createElement("button");              // each answer button
        // console.log("in for loop making buttons. I = " + i + answers[i]);
        // nextAnswer.dvalue = i;
        nextAnswer.innerHTML = "<button class=" + i + " id='quiz-btn' type='button'>" + answers[i] + "</button>";  
        answerList.appendChild(nextAnswer);                     // add the answer to the list
    }  // for
    
    newScreen.appendChild(answerList);

    wrapper.appendChild(newScreen);

    var answerEvent = document.querySelector("#button-box");
    var timesUp = false;

    answerEvent.addEventListener("click", function(event) {
         
        var targetBtn = event.target.className;           // Get the element from the event, the answer
       
        // set interval for 10 seconds, if no click return to decrement score &  get next question
        if (timer > 10) { 
            // call setInterval with remaining time
            timesUp = true;
        }
        else    {
            // call setInterval for 10 seconds
            timesUp = true;
        }
        
        // targetBtn is null if no click after 10 seconds
        if (!targetBtn && timesUp) {
            // decrement score
            // display appended wrong answer screen
            // exit
        return;   // stop listening
        }
        else if (correctAnswer === targetBtn) {
            console.log("Eureka " + targetBtn + "=" + correctAnswer);
            // display append correct answer screen
            return;          // all done
        }  
        
    });   // end click and wait 

    answerEvent.removeEventListener("click", function(event) {} );        // clear for next click
    
        // function check() {
    //     console.log("in show screen check");
    //     if (showScreen) {
    //         setTimeout(check, 10000);                   // give 10 seconds per screen
    //         console.log("in show screen loop");
    //     }
    // }  // end function check

    // function stop() {
    //     showScreen = false;
    // }
    // answerEvent.addEventListener("click", check(), {
    //     once: true
    // });

};  // end function displayQuestion

var runQuiz = function(event) {
    // event.preventDefault();

    console.log("in runQuiz");
    
    quizBtn.removeEventListener("click", runQuiz);

    clockTimer();                                                   // display the start time
    
    var questionNum = 0;                                            // first question
    
    var lastScreen = document.querySelector("#quiz-next");          // get last quiz screen
    lastScreen.remove();                                            // clear last quiz screen
    
    displayQuestion(questionNum);                                   // get the question
                                
    console.log("back in runQuiz after displayQuestion");
    
    questionNum++;                                                  // move to the next question
    
    if (questionNum < totalQuestions && timer < 0) {                             // get all the questions
        console.log("current question " + questionNum + " total " + totalQuestions);
        runQuiz();                            
    }
    
};  // end function runQuiz

var initQuiz = function() {                             // load initial screen to start quiz
    
    var initialQuiz = document.createElement("div");    // get a new container for first screen

    initialQuiz.id = "quiz-next";                       // set div id
                                                        // build the first screen elements
    initialQuiz.innerHTML = "<h1>Coding Quiz Challenge</h1>" + 
    "<p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>" +
    "<button class='quiz-btn' id='quiz-btn' type='button'>Start Quiz</button>";  
    
    quizWrapper.appendChild(initialQuiz);    

    displayTime(0);
        
};  // end function initQuiz

initQuiz();

quizBtn.addEventListener("click", runQuiz);

endQuiz;                                                // display final score and store initials
console.log("we're all done here");