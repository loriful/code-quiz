// quiz questions & answers
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

var timer = 90;                                            // Initial clock time, prime start
var timerEl = document.getElementById('clock');
var totalQuestions = quizArray.length;                      // number of questions

/////////////////////////////////////////////////////////////////////////////////////////
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
    // var lastScreen = document.querySelector("#quiz-next");
    // if (lastScreen) {    
    //     lastScreen.remove();
    // } // if

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
    var lastQuiz = document.createElement("div");       // get a new container for last screen

    lastQuiz.id = "quiz-next";                           // set div id
                                                        // build the screen elements
    lastQuiz.innerHTML = "<h1>All Done!</h1>" + 
    "<p>Your final score is " + displayScores + "<b></b>Enter your initials:</p>"  +
       "<button class='quiz-btn' id='quiz-btn' type='button'>Start Quiz</button>";  
    
    quizWrapper.appendChild(lastQuiz);    

    displayTime(0);
        
};  // end function endQuiz

var displayTime = function(current) {
    timerEl.textContent = "Time:  " + current;
};  // end function displayTime

var clockTimer = function(timer) {
    
    console.log("in function clockTimer. Timer = " + timer);  
    // count down the time

};   // end function clockTimer
    ///////////////////////////////////////////////////////////////////////////////////
   
    //   setTimeout(() => { clearInterval(runClock); }, timer);
    
        
// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds




// var checkAnswer = function (event) {
//     var num = 0;            // tTODO esting only, pass into function later after event us understoog
   
//     var targetBtn = event.target;           // Get the element from the event, the answer
    
//     console.log("targetBtn "+ targetBtn + " correct answer " + quizArray[num].correct);

//     if (targetBtn === (quizArray[num].correct)) {         // Does target match correct answer
        
//         alert("matched" + targetBtn + " " + quizArray[num].correct);
//     } // if

// };  // end function checkAnswer
var OldcheckAnswer = function(event) {
    
    console.log("in checkAnswer");
    clearInterval(runClock);
    answer = event.target.value;

   
    // Get the element from the event, the answer
    var answer = event.target.value;
    console.log('clicked ' + answer);
    console.log('correct = ' + correctAnswer);

    if (answer === correctAnswer) {
        console.log('EUREKA answer = ' + answer);
        
    } else {
        console.log('wah wah WRONG');
     
    };
 
}; // end checkAnswer  
async function loadQuestions (question) {

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
    // console.log('this is correct', question.correct);
    return question.correct;


}; // end loadQuestions
var buildAnswer = function (report) {

    var answerEl = document.createElement("div");
    answerEl.className = "answer-box";

    if (report === true) {
        answerEl.innerHTML = "CORRECT!";
    } else { 
        answerEl.innerHTML = "WRONG!"; 
        };

    document.querySelector("#btn-box").appendChild(answerEl);

} // end function buildAnswer

var checkAnswer = function (pick, correct) {
    var selection; 
    
    if (pick === correct) {  
        selection = true;
       } else {
        selection = false;
       };
    buildAnswer(selection);
    return selection;

} // end checkAnswer
async function getAnswer (correct) {

   
    console.log('this is correct ' + correct);
    var result;
    var intervalTimer = 10;

    var runClock = setInterval(function () {
        intervalTimer--;
        displayTime(timer--);
        if (intervalTimer === 0) {
            clearInterval(runClock);
        };
        console.log('Time Interval: ' + intervalTimer);
    }, 1000);

    document.getElementById("btn-box").addEventListener("click", function () {  
        clearInterval(runClock);
        return checkAnswer(event.target.value, correct);
    }, { once:true } );
   
} // end getAnswer

async function runQuiz (num) {                                 // get the event for clearing
    async function loop () {
        return getAnswer(await loadQuestions(quizArray[num]));
    };
    console.log("in runQuiz, this is num " + num);
   
    document.querySelector("#quiz-next").remove();          // clear last quiz screen
    
    if (timer > 0) {
        
        if (loop() === false) {
            // timer = timer - 10;
            console.log('clock = ' + timer);
        };   
            num++;
            runQuiz(num);         
        
    } else {
        console.log('end of quiz, show score, etc.');
        console.log('this is the score ' + timer);
    } // times up end quiz
    if (num === (quizArray.length)) {
        console.log('num ' + num);
        return;
    };
};  // end function runQuiz

var initQuiz = function() {   

     // load initial screen to start quiz
    var quizWrapper = document.querySelector("#quiz-box");          // container for quiz screen
    var initialQuiz = document.createElement("div");                // get a new container for first screen
    
    initialQuiz.id = "quiz-next";                       // set div id
                                                        // build the first screen elements
    initialQuiz.innerHTML = "<h1>Coding Quiz Challenge</h1>" + 
    "<p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>" + 
    "<div class=btn-box>" + "<button class=start-btn id=start-btn type=button>Start Quiz</button>" + "</div>";  
    
    quizWrapper.appendChild(initialQuiz);   
    
    displayTime(0);
    document.getElementById("start-btn").addEventListener("click", () => { runQuiz(0); });        // start button

};  // end function initQuiz

////////////////////////////////////////////////////

initQuiz();