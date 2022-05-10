// quiz questions & answers
var quizArray = [
    arrayObj = {
        questionText: "Commonly used data types DO Not Include:",
        answerArray: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: "3"
    },
    arrayObj = {
        questionText: "The condition in an if/else statement is enclosed with __________.",
        answerArray: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: "3"
    },
    arrayObj = {
        questionText: "Arrays in JavaScript can be used to store __________.",
        answerArray: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correct: "4"
    },
    arrayObj = {
        questionText: "String values must be enclosed within __________ when being assigned to variables.",
        answerArray: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correct: "3"
    },
    arrayObj = {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerArray: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correct: "4"
    }
];

var timer = (quizArray.length * 10) + 10;             // Initial clock time, 10 seconds per question, and 10 extra
var timerEl = document.getElementById('clock');

/////////////////////////////////////////////////////////////////////////////////////////
function storeUser () {

    console.log("storeUser function");

};  // end function storeUser

function displayScores () {
    console.log("in displayScores");
};  // end function displayScores

function endQuiz () {

    document.querySelector("#quiz-next").remove();          // clear last quiz screen

    if (timer > 0) {                                    // user has points
        storeUser();    
    }
    else {
        displayScores();
    }
    var lastQuiz = document.createElement("div");       // get a new container for last screen
    lastQuiz.id = "quiz-next";                           
                                                        // build the screen elements
    lastQuiz.innerHTML = "<h1>All Done!</h1>" + 
    "<p>Your final score is: " + displayScores() + "<br><br>Enter your initials:</p>"
      + "<div class=btn-box><button class='submit-btn' id='submit-btn' type='submit'>Submit</button></div>";   
     
    document.getElementById("quiz-box").appendChild(lastQuiz);   // display 
  
    displayTime(0);
        
};  // end function endQuiz

function displayTime (current) {
    // show the clock timer
    timerEl.textContent = "Time:  " + current;
};  // end function displayTime

// function clockTimer (timer) {
    
//     console.log("in function clockTimer. Timer = " + timer);  
//     // count down the time

// };   // end function clockTimer

function buildAnswer (report, num) {
    // (the result, the number of current question)
    // console.log('in buildAnswer');
    // build the display
    var answerEl = document.createElement("div");
    answerEl.className = "answer-box";

    if (report) {
        answerEl.innerHTML = "CORRECT!";
    } else { 
        answerEl.innerHTML = "WRONG!"; 
        };

    document.getElementById("quiz-next").appendChild(answerEl);         // show result
    var intervalTimer = 1;                                  // wait for user to see result
    var runWait = setInterval(function () {
        intervalTimer--;
        if (intervalTimer < 1) {                            // go to next question or end quiz
            clearInterval(runWait);
            if ((num < quizArray.length-1) && (timer > 1)) {
                num++;
                runQuiz(num);
            } else { 
                endQuiz();
            }
        };
    }, 1000);

} // end function buildAnswer

function checkAnswer (pick, correct, num) {
    // (the answer chosen, the stored correct answer, which question)
    var matched; 
    // console.log('in CheckAnswer');
    
    if (pick === correct) {  
        matched = true;
       } else {
        timer = timer-10;
        matched = false;
       };
    // console.log('match = ' + matched);
    buildAnswer(matched, num);              // display the result for each question
    // return selection;

} // end checkAnswer

function getAnswer (correct, num) {

    // console.log('in getAnswer this is correct ' + correct + 'this is num ' + num);

    var intervalTimer = 10;                     // ten seconds per question
    
    if (timer < intervalTimer) {                // less than 10 seconds left
        intervalTimer = timer;
    };
   
    var runClock = setInterval(function () {        // run the clock, wait for answer
        intervalTimer--;
        displayTime(timer--);
        if (intervalTimer < 1) {                    // out of time
            clearInterval(runClock);
            // console.log("timer has run out");
            return checkAnswer("", correct, num);   // determine if answer correct
        };
        // console.log('Time Interval: ' + intervalTimer);
    }, 1000);
    // document.querySelectorAll('.some-class').forEach(item => {
    //     item.addEventListener('click', event => {
    document.querySelectorAll("#quiz-btn").forEach(item => {        // listen on each answer button
        item.addEventListener("click", function () {  
        clearInterval(runClock);
        // console.log('target = ' + event.target.value);
        checkAnswer(event.target.value, correct, num);             // button clicked, check answer
    }, { once:true } )});
  
}; // end getAnswer
  
function loadQuestions (num) {

    // console.log('function loadQuestions');
    
    var newScreen = document.createElement("div");           // build new quiz screen
    newScreen.id = "quiz-next";                              // tag for removal later
    newScreen.innerHTML = "<h1 class=quiz-header>" + quizArray[num].questionText + "</h1>";
    
    // var buttonBox = document.createElement("div");              // wrapper for all buttons
    // buttonBox.id = "answer-box";
    // build the set of possible answers
    for (i = 0; i < quizArray[num].answerArray.length; i++) {      
        var btnWrap = document.createElement("div");             //wrapper for button
        btnWrap.id = "btn-box";
        btnWrap.innerHTML =  "<button class=quiz-btn id=quiz-btn type=button value=" + (i+1) + ">" + quizArray[num].answerArray[i] + "</button>";
        newScreen.appendChild(btnWrap);                      // add the answer to the list                      
    }  // for

    // newScreen.appendChild(buttonBox);

    document.querySelector("#quiz-box").appendChild(newScreen);     // display the set
    // console.log('this is correct', question.correct);
    // console.log('about to call getAnswer, num = ' + num);
    return quizArray[num].correct;                              // send the correct answer to getAnswer
    // getAnswer(quizArray[num].correct,num);

}; // end loadQuestions

function runQuiz (num) {                                 
    ////////////// REPEAT UNTIL ALL QUESTIONS DISPLAYED OR TIME RUNS OUT
    // console.log("in runQuiz, this is num " + num);
   
    document.querySelector("#quiz-next").remove();          // clear last quiz screen
    
    getAnswer(loadQuestions(num), num);                     // load each set of questions

    // check if done
    // if (num === quizArray.length || timer < 0) {
    //     console.log('quizArray.length = ' + quizArray.length);
    //     console.log("num in if " + num);
    //     console.log('time to call endQuiz after loadQuestions & getAnswer');  
    //     return; 
    // };

    // if (timer < 1) {

    //     if (num > (quizArray.length)) {
    //         runQuiz(num);    
    //         num++;
    //         // if (num === (quizArray.length)) {
    //         //     console.log('num ' + num);
    //             // return;
    //     } else {
    //     console.log('end of quiz, show score, etc.');
    //     console.log('this is the score ' + timer);
    //     return;
    //     }
    // }; 
};

function initQuiz() {   

     // load initial screen to start quiz
    var quizWrapper = document.querySelector("#quiz-box");          // container for quiz screen
    var initialQuiz = document.createElement("div");                // get a new container for first screen
    
    initialQuiz.id = "quiz-next";                       // set div id
                                                        // build the first screen elements
    initialQuiz.innerHTML = "<h1>Coding Quiz Challenge</h1>" + 
    "<p>Try to answer the following code-related questions within the time limit.  You have 10 seconds for each question. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>" +
    "<div class=btn-box><button class=start-btn id=start-btn type=button>Start Quiz</button></div>";  
    
    quizWrapper.appendChild(initialQuiz);           // display the first screen
    
    displayTime(0);
                                                    // listen for start
    document.getElementById("start-btn").addEventListener("click", () => { runQuiz(0); });        // start button

};  // end function initQuiz

////////////////////////////////////////////////////

initQuiz();