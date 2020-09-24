let currentQuestion = 0;
let score = 0;
//let currentAnswer = 0;
let status;
let userAnswer;


const questionHeader = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const fullAnswer = document.getElementById('full-answer');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const timePerQuestion = 10;

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
}

function showQuestion(){
  showScore();
  questionHeader.innerHTML = questions[currentQuestion].question;
  startTimer(timePerQuestion);
}

function showScore(){
  scoreDisplay.innerHTML = score;
}

function selectedAnswer(e){
  userAnswer = e.target;
  const systemAnswer = questions[currentQuestion].answer;
  const question = questions[currentQuestion].question;
  const text = questions[currentQuestion].text;
  const whichResponse = questions[currentQuestion]
  
  for(i = 0; i < answerButtons.childNodes.length; i++){
    console.log(answerButtons.childNodes[i]);
    answerButtons.childNodes[i].disabled = true;
  }

  if(systemAnswer === userAnswer.value){
    console.log('success')
    userAnswer.classList.add('correct');
    fullAnswer.innerText = questions[currentQuestion].correctResponse;
    score++;
    showScore();
  } else {
    console.log('oops');
    userAnswer.classList.add('wrong')
    fullAnswer.innerText = fullAnswer.innerText = questions[currentQuestion].incorrectResponse
  }

  showNextButton();

  const correct = userAnswer.dataset.correct;

  //console.log(userAnswer)
}

function showNextButton(){
  nextButton.classList.remove('hide');
}


function showNextQuestion(){  
  currentQuestion++;  
  α = 360;
  let answerClass = document.getElementsByClassName('btn')[0];
  let answerClass2 = document.getElementsByClassName('btn')[1];

  questionHeader.innerHTML = questions[currentQuestion].question;
  console.log(currentQuestion);
  console.log(questions[currentQuestion].question);

  //reset colors
  answerClass.classList.remove('wrong');
  answerClass.classList.remove('correct');
  answerClass2.classList.remove('wrong');
  answerClass2.classList.remove('correct');
  userAnswer.classList.remove('wrong');
  userAnswer.classList.remove('correct');

  //enable buttons

  for(i = 0; i < answerButtons.childNodes.length; i++){
    console.log(answerButtons.childNodes[i]);
    answerButtons.childNodes[i].disabled = false;
  }
  
}


function startTimer(duration) {
  const display = document.getElementById('timer');
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        showNextQuestion();
      }
  }, 1000);
}


showQuestion();




//Listeners
answerButtons.addEventListener('click', selectedAnswer);
nextButton.addEventListener('click', showNextQuestion);


var loader = document.getElementById('loader')
  , border = document.getElementById('border')
  , α = 360
  , π = Math.PI
  , t = timePerQuestion / 360 * 1000;

(function draw() {
  if(α<=0){α=360;}
  α--;
  α %= 360;
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
 
  loader.setAttribute( 'd', anim );
  border.setAttribute( 'd', anim );
  
  setTimeout(draw, t); // Redraw
})();

