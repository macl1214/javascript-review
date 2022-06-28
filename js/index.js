function getPlayerSelection() {
  
  while (true) {

    let playerSelection = prompt("Rock, Paper, or Scissors? Enter \'q\' to quit`");

    if (playerSelection.toUpperCase() === 'Q') {
      throw new Error('Game terminated');
    }

    if (VALID_OPTIONS.includes(playerSelection.toUpperCase())) {
      return playerSelection;
    } else {
      alert('That is not a valid entry! try again.')
    }
  }
}

function game(numOfGames = 5) {
  console.log("========== Welcome to Tic Tac Toe! ==========\n");
  let score = 0;
  const maxGames = numOfGames;

  console.log(`This will be a best out of ${maxGames}`);
  console.log('\n');

  for (let round = 1; round <= maxGames; round++) {
    console.log(`----- Round ${round} -----`);

    try {
      let playerSelection = getPlayerSelection();
      let computerSelection = computerPlay();
      
      let result = playRound(playerSelection, computerSelection);
      console.log(result);

      if (result.includes('win')) {
        score++;
      } 
      
      if (result.includes('lose')) {
        score--;
      }

    } catch (err) {
      console.log(err.message);
      return;
    }

    console.log("\n");
  }

  console.log("==========================================");
  console.log("We've reached the end! Tallying up the score...");
  console.log("\n");

  setTimeout(function() {
    if (score > 0) {
      console.log("Congratulations, you won!");
    } else if (score < 0) {
      console.log("The computer bested you. Better luck next time!");
    } else {
      console.log("It ends in a draw!!!");
    }
  }, 5000);
  
}

function computerPlay() {
  let message = "Computer plays... ";
  let ran = Math.floor(Math.random() * 3) + 1;

  switch(ran) {
    case 1:
      return 'Rock';
    case 2:
      return 'Paper';
    case 3:
      return 'Scissors';
    default:
      console.error("Error in computerPlay()");
  }
}

function playRound(button) {
  
  const playerSelection = button.target.id;
  const computerSelection = computerPlay();
  let message = "";

  displayOption("user", playerSelection);
  displayOption("computer", computerSelection);

  if (playerSelection === computerSelection) {
    message = `It's a tie! You both played ${playerSelection}`;
    displayResult(0, message);
    return;
  }

  const WIN = 'You win!';
  const LOSE = 'You lose!';

  console.log(`You played:\t\t\t${playerSelection}`);
  console.log(`Computer played:\t${computerSelection}`);
  console.log('\n');

  switch(playerSelection) {
    case 'Rock':
      if (computerSelection === 'Paper') {
        message = `${LOSE} Rock loses to Paper`;
        displayResult(-1, message);
      } else {
        message = `${WIN} Rock beats Scissors`;
        displayResult(1, message);
      }
      break;
    case 'Paper':
      if (computerSelection === 'Rock') {
        message = `${WIN} Rock beats Paper`;
        displayResult(1, message);
      } else {
        message = `${LOSE} Paper loses to Scissors`;
        displayResult(-1, message);
      }
      break;
    case 'Scissors':
      if (computerSelection === 'Rock') {
        message = `${LOSE} Scissors loses to Rock`;
        displayResult(-1, message);
      } else {
        message = `${WIN} Scissors beats Paper`;
        displayResult(1, message);
      }
      break;
    default:
      console.error("Error in playRound()");
  }

  assertWinner();
}

function displayOption(playerType, option) {
  
  if (playerType === "user") {
    const userDisplay = document.querySelector(".user-display");
    userDisplay.innerText = option;
  }

  if (playerType === "computer") {
    const computerDisplay = document.querySelector(".computer-display");
    computerDisplay.innerText = option;
  }
}

function displayResult(result, message) {
  
  const resultMessage = document.querySelector(".result-message");

  switch (result) {
    case -1:  // loss
      resultMessage.classList.add('lose');
      computerScore++;
      break;
    case 0:   // tie
      resultMessage.classList.remove('win', 'lose');
      break;
    case 1:
      resultMessage.classList.add('win');
      playerScore++;
      break;
  }

  resultMessage.innerText = message;
  displayScores();
}

function displayScores() {
  const playerScoreTracker = document.querySelector(".user-wins");
  const computerScoreTracker = document.querySelector(".computer-wins");

  playerScoreTracker.innerText = playerScore;
  computerScoreTracker.innerText = computerScore;
}

function assertWinner() {

  console.log("in assertWinner()");
  
  if (playerScore === 5 || computerScore == 5) {
    
    console.log("in final()");

    const container = document.querySelector(".container");
    const finalBox = document.createElement("div");
    const finalMessage = document.createElement("div");
    const resetButton = document.createElement("button");
    
    finalStyle(finalBox, resetButton);
    
    resetButton.innerText = "Reset";
    
    if (playerScore === 5) {
      finalMessage.innerText = "YOU WON!";
      finalMessage.classList.add('win');
    } else if (computerScore === 5) {
      finalMessage.innerText = "YOU LOST!";
      finalMessage.classList.add('lose');
    }

    container.innerHTML = "";
    finalBox.appendChild(finalMessage);
    container.appendChild(finalBox);
    container.appendChild(resetButton);
  }
}

function finalStyle(finalBox, resetButton) {
  
  finalBox.classList = "";
  finalBox.classList.add('final-message');
  resetButton.classList.add('final-button');
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  // Reset page
  document.querySelector(".container").innerHTML = originalPage;

  // Reset score and display
  playerScore = 0;
  computerScore = 0;
  
  displayScores();
  
  // Reset button events
  buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.addEventListener('click', playRound));
}

// Set up
const originalPage = document.querySelector(".container").innerHTML;
const VALID_OPTIONS = ["ROCK", "PAPER", "SCISSORS"];
let buttons = document.querySelectorAll("button");
let playerScore = 0;
let computerScore = 0;

// Begin 
displayScores();
buttons.forEach(button => button.addEventListener('click', playRound));