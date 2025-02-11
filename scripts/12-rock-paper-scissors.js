//the code works well without the removeitem
const score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
};

updateScoreElements();

//we can just use the default operator instead of the below code
/*if(!score) // it works same as score === null
{
  score = {
    wins : 0,
    losses : 0,
    ties : 0
  }
} */

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//}
function autoPlay()
{
  if(!isAutoPlaying)
  {
    intervalId = setInterval(() => //we use function inside another function
    {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  }
  else{
    //to stop interval we use clear interval
    clearInterval(intervalId);
    isAutoPlaying= false;
  }
}

//while using playGame() directly into the event listener it will only call the function
//and it results in undefined
//so we create a function and call the function inside it
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click',() => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElements();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

//addeventlistener also provide the parameter called event with that we can get the key value while using the event : keydown
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r')
  {
    playGame('rock');
  }
  else if(event.key === 'p')
  {
    playGame('paper');
  }
  else if(event.key === 's')
  {
    playGame('scissors');
  }
});

function playGame(playerMove)
{
  const computerMove = pickComputerMove();

  let result = '';
  
  if(playerMove === 'scissors')
  {
    if(computerMove === 'rock')
    {
      result = 'You Lose';
    }
    else if(computerMove === 'paper')
    {
      result = 'You Win';
    }
    else if(computerMove === 'scissors')
    {
      result = 'Tie';
    }
  }
  else if(playerMove === 'paper')
  {
    if(computerMove === 'rock')
    {
      result = 'You Win';
    }
    else if(computerMove === 'paper')
    {
      result = 'Tie';
    }
    else if(computerMove === 'scissors')
    {
      result = 'You Lose';
    }
  }
  else if(playerMove === 'rock')
  {
    if(computerMove === 'rock')
    {
      result = 'Tie';
    }
    else if(computerMove === 'paper')
    {
      result = 'You Lose'
    }
    else if(computerMove === 'scissors')
    {
      result = 'You Win';
    }
  }

  if(result === 'You Win')
  {
    score.wins += 1;
  }
  else if(result === 'You Lose')
  {
    score.losses += 1; 
  }
  else if(result === 'Tie')
  {
    score.ties +=1;
  }

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElements();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png"> <img class="move-icon" src="images/${computerMove}-emoji.png">Computer`;
}

function updateScoreElements()
{
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() 
{
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3)
  {
    computerMove = 'rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3)
  {
    computerMove = 'paper';
  }
  else if( randomNumber >= 2/3 && randomNumber < 1)
  {
    computerMove = 'scissors';
  }
  return computerMove;
}
