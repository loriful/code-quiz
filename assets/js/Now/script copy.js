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

var timer = 20;                                            // Initial clock time, prime start
var timerEl = document.getElementById('clock');
var totalQuestions = quizArray.length;                      // number of questions

/////////////////////////////////////////////////////////////////////////////////////////
var generateBtn = function(answers) {

    console.log("in generateBtn" + answers);

};  // end function generateBtn

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

    
    ///////////////////////////////////////////////////////////////////////////////////
   
    //   setTimeout(() => { clearInterval(runClock); }, timer);
    
        
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
    var waitForAnswer = function() {
        console.log('waitForAnswer');
        if (timer > 0) {
        displayTime(timer);
        timer--;
        } else {
            clearInterval(runClock);
            displayTime(timer);
        };
    
    }; // end waitForAnswer    
    
    var checkAnswer = function(event) {
    
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
    
    
    // console.log("in displayQuestion.  This is num"+ num);
    
    var answers = quizArray[num].answerArray;                          // all possible answers
    var correctAnswer = quizArray[num].correct;        
    var wrapper = document.querySelector("#quiz-box");                  // parent element
    var newScreen = document.createElement("div");                    // build new quiz screen
    // newScreen.className = "btn-box";        
    newScreen.id = "quiz-next";                              // tag for removal later
    newScreen.innerHTML = "<h1>" + quizArray[num].questionText + "</h1>";
    // var answerList = document.createElement("div");                   // list of answer buttons
    // answerList.innerHTML = "class='btn-box' id='btn-box'";                                   // tag for clicks
    // console.log("number of answers " + answers.length);
    var buttonBox = document.createElement("div");              // wrapper for all buttons
    buttonBox.id = "btn-box";
    newScreen.appendChild(buttonBox);
    for (i = 0; i < answers.length; i++) {  
        
        var btnWrap = document.createElement("div");             //wrapper for button
        btnWrap.className = "btn-box";
        btnWrap.innerHTML =  "<button class=quiz-btn id=quiz-btn type=button value=" + (i+1) + ">" + answers[i] + "</button>";
        buttonBox.appendChild(btnWrap);                      // add the answer to the list
        
        // var nextAnswer = document.createElement("button");        // each answer button
        // nextAnswer.innerHTML =
        // nextAnswer.setAttribute("data-answer-num",i);  
        // newScreen.appendChild(nextAnswer)
        // console.log("in for loop making buttons. I = " + i + answers[i]);
                           
    }  // for
    
    // newScreen.appendChild(answerList);

    wrapper.appendChild(newScreen);

    var answerList = document.querySelector("#btn-box");
 
    var runClock = setInterval(waitForAnswer, 1000);
    answerList.addEventListener("click", checkAnswer);
    
    //////////////////

    
            //              // function to add Correct to screen
            //              // save time left go to next question
            //              clearInterval(runClock);
            //          } else {
            //              console.log('wah wah WRONG');
            //              timer = timer - interval;
            //              clearInterval(runClock);
            //          };    
            //     };  // check match
            // interval++;  
            // timer--;
       
        // } // if time left
        // else {
        //     displayTime(timer);
        //     clearInterval(runClock);
        // } //else
        // };  // end checkForAnswer

           
        // answerList.addEventListener("click", checkAnswer);
    
    //     console.log('this is the one ' + answerList.target.value);
    // console.log('this is timer', timer);
    //  if (!timer) {
    //      console.log('game over');
    //  }
    // answerEvent.removeEventListener("click", function(event) {} );        // clear for next click
    
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

/////////////////////////////////////////////////////////////
var questionNum = 0;                                            // first question

var runQuiz = function () {                                 // get the event for clearing
    
    // event.preventDefault();                                     // clear the initial click   
    console.log("in runQuiz");

    ///////////////////////////////// out of gitHub
    
    var lastScreen = document.querySelector("#quiz-next");          // get last quiz screen
    lastScreen.remove();      
                                          // clear last quiz screen
    
                                     // get the question
                                
    // console.log("back in runQuiz after displayQuestion");
    
                                                    // move to the next question
    
       if (questionNum < totalQuestions) {  
            console.log("question number= " + questionNum + "  totalQuestions = " + totalQuestions);
            displayQuestion(questionNum);              // && (timer < 0)
            console.log('back from displayQuestion');
            questionNum++;
            // if (questionNum < totalQuestions) {      // get all the questions                            // send nothing in
            //     runQuiz();
            // };
        };
        // } else {
        // displayTime(timer);   
        // console.log("all questions have been processed");
        // return;
        // // call end game functions
        // }

    // endQuiz();    

    ////////////////////////////////// out of gitHub

    // clear the start screen

    // for (var i = 0; i < totalQuestions; i++) {
         
    //     var lastScreen = document.querySelector("#quiz-next");          // get last quiz screen
    //     lastScreen.remove();  

    //                                            // clear last quiz screen
    //     console.log("this is the array element" + quizArray[questionNum]);
    
    //     displayQuestion(questionNum);  
    //     event.preventDefault;
      
    //     console.log("back in runQuiz after displayQuestion");
    
    //     questionNum++;                                                  // move to the next question
    
    //     console.log("current question " + questionNum + " total " + totalQuestions);
    
    // }   // for
    

    // if (questionNum < totalQuestions && timer < 0) {                             // get all the questions
    //     runQuiz();                            
    // }
       
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
    var quizBtn = document.querySelector("#start-btn");          // start button
    quizBtn.addEventListener("click", runQuiz);         
        
};  // end function initQuiz

////////////////////////////////////////////////////

initQuiz();


                                   // display final score and store initials
console.log("we're all done here");