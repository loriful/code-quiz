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

/////////////////////////////////////////////////////////////////////////////////////////
function storePlayer (inits, timer) {

    event.preventDefault();

    var playerArray = [playerObj = {
                inits: inits,
                score: timer,
        }];

    if (!localStorage.getItem("savedScores")) {         // no scores stored locally
        localStorage.setItem("savedScores", JSON.stringify(playerArray));
    } else {
        var savedStorage = JSON.parse(localStorage.getItem("savedScores"));
        savedStorage.push(playerArray[0]);
        localStorage.setItem("savedScores", JSON.stringify(savedStorage));
    };

    displayScores();

};  // end function storePlayer

function displayScores () {

    var handle = document.querySelector("#quiz-next");

    if (handle) {
        document.querySelector("#quiz-next").remove();
    };

    document.querySelector("#header").style.display = "none";             // clear scores link and time

    var lastQuiz = document.createElement("div");    // get a new container for last screen
    lastQuiz.id = "quiz-next";                            
    lastQuiz.innerHTML = "<h1>High Scores</h1><ul class=finalscores>";
    
    var scores = JSON.parse(localStorage.getItem("savedScores"));

    if (!scores) {              // no scores in storage
        scores = " ";
    } else {
        // loop through scores array
        for (var i = 0; i < scores.length; i++) {  
            var scoreEl = document.createElement("li");  
            scoreEl.innerHTML = scores[i].inits + ": " + scores[i].score;
            lastQuiz.append(scoreEl);
            };
        };

    var addButtons = document.createElement("div");

    addButtons.innerHTML = "<button class=last-btn id=goback-btn type=button>Go Back</button>" +
        "<button class=last-btn id=clear-btn type=button>Clear high scores</button>";
    lastQuiz.append(addButtons); 

    document.getElementById("quiz-box").appendChild(lastQuiz);      //display scores

    
    // listen for next step either button

    document.getElementById("goback-btn").addEventListener("click", () => {
        document.querySelector("#quiz-next").remove();           // clear last quiz screen
        document.querySelector("#header").style.display = "flex";       // put header back
        initQuiz();                                                     // start new quiz
    }); 

    document.getElementById("clear-btn").addEventListener("click", () => {
        localStorage.clear();
        displayScores();
    }); 

};  // end function displayScores

function endQuiz(timer) {

    document.querySelector("#quiz-next").remove();          // clear last quiz screen
    
    displayTime(timer);
    
    if (timer < 1) {   
        displayScores();                                 // user has no points
    } else {                                             // user has points, store inits
        var lastQuiz = document.createElement("div");    // get a new container for last screen
        lastQuiz.id = "quiz-next";                           
                                                        // build the screen elements
        lastQuiz.innerHTML = "<h1>All Done!</h1>" + 
        "<h2>Your final score is: " + timer + "</h2>" +
        "<h3 id=enter>Enter your initials:</h3>" +
        "<form><label for=initials></label>" + 
        "<input type=text id=initials placeholder='Your initials'/>" + 
        "<button class='submit-btn' id='submit-btn' type='submit'>Submit</button></form>";
   
     
    document.getElementById("quiz-box").appendChild(lastQuiz);   // display 
    
    // listen for intials
    document.getElementById("submit-btn").addEventListener("click", () => {
        if (initials.value) {
            storePlayer(initials.value, timer);              // start button // listen for submit
        } else {
            alert("Please enter initials.");
            return endQuiz(timer);
            };
    });
};
  
};  // end function endQuiz

function displayTime (current) {
    // show the clock timer
    var timerEl = document.getElementById('clock');
    timerEl.textContent = "Time:  " + current;
};

function buildAnswer (report, num, timer) {
    // (the result, the number of current question)

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
                runQuiz(num, timer);
            } else { 
                endQuiz(timer);
            }
        };
    }, 1000);

} // end function buildAnswer

function checkAnswer (pick, correct, num, timer) {
    // (the answer chosen, the stored correct answer, which question)
    
    var matched; 
    
    if (pick === correct) {  
        matched = true;
       } else {
        timer = timer-10;           // wrong answer, loose 10 points
        matched = false;
       };
    
    buildAnswer(matched, num, timer);              // display the result for each question

} // end checkAnswer

function getAnswer (correct, num, timer) {
    
    var intervalTimer = 10;                     // ten seconds per question
    
    if (timer < intervalTimer) {                // less than 10 seconds left
        intervalTimer = timer;
    };
   
    var runClock = setInterval(function () {        // run the clock, wait for answer
        intervalTimer--;
        displayTime(timer--);
        if (intervalTimer < 1) {                    // out of time
            clearInterval(runClock);
            return checkAnswer("", correct, num, timer);   // determine if answer correct
        };
    }, 1000);
   
    document.querySelectorAll("#quiz-btn").forEach(item => {        // listen on each answer button
        item.addEventListener("click", function () {  
        clearInterval(runClock);
        checkAnswer(event.target.value, correct, num, timer);             // button clicked, check answer
    }, { once:true } )});

}; // end getAnswer
  
function loadQuestions (num) {
   
    var newScreen = document.createElement("div");           // build new quiz screen
    newScreen.id = "quiz-next";                              // tag for removal later
    newScreen.innerHTML = "<h1 class=quiz-header>" + quizArray[num].questionText + "</h1>";
    
    for (i = 0; i < quizArray[num].answerArray.length; i++) {      
        var btnWrap = document.createElement("div");             //wrapper for button
        btnWrap.id = "btn-box";
        btnWrap.innerHTML =  "<button class=quiz-btn id=quiz-btn type=button value=" + (i+1) + ">" + quizArray[num].answerArray[i] + "</button>";
        newScreen.appendChild(btnWrap);                      // add the answer to the list                      
    }  // for

    document.querySelector("#quiz-box").appendChild(newScreen);     // display the set
    
    return quizArray[num].correct;                              // send the correct answer to getAnswer

}; // end loadQuestions

function runQuiz (num, timer) {                                 
    // REPEAT UNTIL ALL QUESTIONS DISPLAYED OR TIME RUNS OUT
    
    document.querySelector("#quiz-next").remove();          // clear last quiz screen
    
    getAnswer(loadQuestions(num), num, timer);                     // load each set of questions
};

function initQuiz() {   

    var timer = (quizArray.length * 10) + 10;             // Initial clock time, 10 seconds per question, and 10 extra
    
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
    document.getElementById("start-btn").addEventListener("click", () => { runQuiz(0, timer); });        // start button
    document.getElementById("scores").addEventListener("click", displayScores);         // activate high scores link
          
};  // end function initQuiz

/////////////////////

initQuiz();