let currentQuestion = 0;
let score = 0;
//let currentAnswer = 0;
let status;
let userAnswer;
let myTimeOut;


const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionHeader = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const answerButtonsClass = document.querySelectorAll('.answer-buttons');
const fullAnswer = document.getElementById('full-answer');
const pieSVG = document.getElementById('pie-svg');
const scoreText = document.getElementById('score');
const scoreDisplay = document.getElementById('score-display');
const pig = document.getElementById('pig');
const timePerQuestion = 10;

const manCorrect = document.querySelector('.man-correct');
const manWrong = document.querySelector('.man-wrong');
const manWaiting = document.querySelector('.man-waiting');
const manScared = document.querySelector('.man-scared');


let questions = [
  {
    question: 'Does Len like fish', 
    answer: "false", 
    text: 'hates fish',
    correct: false,
    correctResponse: 'Custom correct response.',
    incorrectResponse: 'Custom incorrect response.'
  }, 
  {
    question: 'Len favorite drink is coffee', 
    answer: "false",
    text: 'Actually his favorite drink is tea',
    correct: false,
    correctResponse: 'Custom correct response.',
    incorrectResponse: 'Custom incorrect response.'
  },
  {
    question: 'Len likes to go to the zoo', 
    answer: "false", 
    text: 'The zoo stinks',
    correct: false,
    correctResponse: 'Custom correct response.',
    incorrectResponse: 'Custom incorrect response.'
  },
  {
    question: '2 + 3 is 4', 
    answer: "false", 
    text: '2+2 is 4',
    correct: true,
    correctResponse: 'Custom correct response.',
    incorrectResponse: 'Custom incorrect response.'
  },
  {
    question: 'Thanks for playing', 
    answer: "", 
    text: ''
  }
]



//Functions
function startQuiz(){
  gSapFadeIn('.container');
  startButton.classList.add('hide');
  nextButton.classList.remove('hide');
  pieSVG.classList.remove('hide');
  scoreText.classList.remove('hide');
  pig.classList.add('hide');
  fullAnswer.innerHTML ='';

  for(i = 0; i < answerButtonsClass.length; i++){
    console.log(answerButtonsClass[i]);
    answerButtonsClass[i].classList.remove('hide');
  }
  
  clearTimeout(myTimeOut);
  
  draw();
  showQuestion();
}

function showQuestion(){
  score = 0;
  currentQuestion = 0;
  questionHeader.innerHTML = questions[currentQuestion].question;
  showScore();

  α = 360;
  //startTimer(timePerQuestion);

  gSapFadeIn('.man-waiting');
}

function showScore(){
  scoreDisplay.innerHTML = `${score} / ${questions.length - 1}`;
}

function selectedAnswer(e){
  userAnswer = e.target;
  const systemAnswer = questions[currentQuestion].answer;
  const question = questions[currentQuestion].question;
  const text = questions[currentQuestion].text;
  const whichResponse = questions[currentQuestion]
  const manExpression = questions[currentQuestion]
  
  for(i = 0; i < answerButtons.childNodes.length; i++){
    console.log(answerButtons.childNodes[i]);
    answerButtons.childNodes[i].disabled = true;
  }

  if(systemAnswer === userAnswer.value){
    console.log('success')
    userAnswer.classList.add('correct');
    fullAnswer.innerText = questions[currentQuestion].correctResponse;
    score++;
    manCorrect.classList.remove('hide');
    manWrong.classList.add('hide');
    manWaiting.classList.add('hide');
    manScared.classList.add('hide');

    gSapFadeIn('#full-answer');
    clearTimeout(myTimeOut)
    showScore();
  } else {
    gSapFadeIn('#full-answer');
    console.log('oops');
    userAnswer.classList.add('wrong')
    fullAnswer.innerText = fullAnswer.innerText = questions[currentQuestion].incorrectResponse;
    manCorrect.classList.add('hide');
    manWrong.classList.remove('hide');
    manWaiting.classList.add('hide');
    manScared.classList.add('hide');
    clearTimeout(myTimeOut)
  }

  showNextButton();

  const correct = userAnswer.dataset.correct;
  
  //console.log(userAnswer)
}


function showNextButton(){
  nextButton.classList.remove('hide');
}


function showNextQuestion(){  
  clearTimeout(myTimeOut);
  
  gSapFadeIn('.text-center');

  currentQuestion++;  
  α = 360;
  let answerClass = document.getElementsByClassName('btn')[0];
  let answerClass2 = document.getElementsByClassName('btn')[1];

  for(i=0; i>answerClass; i++){
    console.log(answerClass[i]);
  }

  questionHeader.innerHTML = questions[currentQuestion].question;
  fullAnswer.innerHTML = '';
  // console.log(currentQuestion);
  // console.log(questions[currentQuestion].question);

  //reset colors
  answerClass.classList.remove('wrong');
  answerClass.classList.remove('correct');
  answerClass2.classList.remove('wrong');
  answerClass2.classList.remove('correct');
  if(userAnswer){
    userAnswer.classList.remove('wrong');
    userAnswer.classList.remove('correct');
  }

  //enable buttons

  for(i = 0; i < answerButtons.childNodes.length; i++){
    console.log(answerButtons.childNodes[i]);
    answerButtons.childNodes[i].disabled = false;
  }

  draw();
  
  //End Quiz
  endQuiz();  
}

function resetMan(){
  manCorrect.classList.add('hide');
  manWrong.classList.add('hide');
  manWaiting.classList.remove('hide');
  manScared.classList.add('hide');
  gSapFadeIn('.man-waiting')
}

// function startTimer(duration) {
//   const display = document.getElementById('timer');
//   var timer = duration, minutes, seconds;
//   setInterval(function () {
//       minutes = parseInt(timer / 60, 10);
//       seconds = parseInt(timer % 60, 10);

//       minutes = minutes < 10 ? "0" + minutes : minutes;
//       seconds = seconds < 10 ? "0" + seconds : seconds;

//       display.textContent = minutes + ":" + seconds;

//       if (--timer < 0) {
//         timer = duration;
//         showNextQuestion();
//       }
//   }, 1000);
// }

function endQuiz(){
  
  if(currentQuestion > questions.length - 2){
    for(i = 0; i < answerButtonsClass.length; i++){
      console.log(answerButtonsClass[i]);
      answerButtonsClass[i].classList.add('hide');
    }
    
    pieSVG.classList.add('hide');
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    clearTimeout(myTimeOut);

    if(score === 0){
      pig.classList.remove('hide');
      fullAnswer.innerHTML = "I know you did your best but you didn't get any points, even the pig is confused. Maybe you should try again.";
    }

  }
}


//TIMER
var loader = document.getElementById('loader')
  , border = document.getElementById('border')
  , α = 360
  , π = Math.PI
  , t = timePerQuestion / 360 * 1000
  , timeRemaining;

function draw() {
  if(α<=0){
    α=360;
    showNextQuestion();
    resetMan();
    //console.log(clearTimeout(myTimeOut));
  } else {
  //α--;
  α-= 20;
  //α %= 360;
  var r = ( α * π / 180 )
    , x = Math.sin( r ) * 125
    , y = Math.cos( r ) * - 125
    , mid = ( α > 180 ) ? 1 : 0
    , anim = 'M 0 0 v -125 A 125 125 1 ' 
           + mid + ' 1 ' 
           +  x  + ' ' 
           +  y  + ' z';
  //[x,y].forEach(function( d ){
  //  d = Math.round( d * 1e3 ) / 1e3;
  //});

  timeRemaining = α / 360 * timePerQuestion;
  console.log(Math.round(timeRemaining));

  if(timeRemaining <= 3){
    manCorrect.classList.add('hide');
    manWrong.classList.add('hide');
    manWaiting.classList.add('hide');
    manScared.classList.remove('hide');
    console.log(answerButtonsClass);
  }
 
  loader.setAttribute( 'd', anim );
  border.setAttribute( 'd', anim );

  
  //setTimeout(draw, t); // Redraw
  myTimeOut = setTimeout(draw, 1000); // Redraw
  console.log(currentQuestion);
  }
}



//Listeners
startButton.addEventListener('click', startQuiz);
answerButtons.addEventListener('click', selectedAnswer);
nextButton.addEventListener('click',() => {    
  showNextQuestion();
  resetMan();    
});


//GSAP
function gSapFadeIn(fadeThis) {
  gsap.fromTo(fadeThis, 
    {opacity:0},
    {opacity:1}
  );
}