const clickArea = document.querySelector('.click-area');
const displayText = document.querySelector('.display-text');
const score = document.querySelectorAll('.score');
const scoreHistory = [];
const MINIMUM_MILLISECOND_TILL_CHANGE = 3000;
const MAXIMUM_MILLISECOND_TILL_CHANGE = 10000;
let millisecondSinceEpochOnTimeout = 0;
let waitingForClick = false;
function play(){
  const millisecondTillChange = Math.floor(Math.random() * (MAXIMUM_MILLISECOND_TILL_CHANGE - MINIMUM_MILLISECOND_TILL_CHANGE)) + MINIMUM_MILLISECOND_TILL_CHANGE;
  clickArea.style.backgroundColor = null;
  displayText.textContent = "";
  setTimeout(() => {
    millisecondSinceEpochOnTimeout = Date.now();
    clickArea.style.backgroundColor = '#009578';
    waitingForClick = true;
  },millisecondTillChange);
}
function addScore(scores){
  scoreHistory.unshift(scores);
  for(let i = 0;i < Math.min(scoreHistory.length,5);i++){
    const scoreElement = scoreHistory[i];
    score[i].textContent = `${scoreElement}ms`;
  }
}
clickArea.addEventListener('click',() => {
  if(waitingForClick){
    const scoreTime = Date.now() - millisecondSinceEpochOnTimeout;
    waitingForClick = false;
    displayText.textContent = `your time was ${scoreTime} ms! click to play again.`;
    addScore(scoreTime);
  }else play();
});