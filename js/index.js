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

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.charAt(0).toUpperCase() 
                    + playerSelection.substring(1).toLowerCase();

  if (playerSelection === computerSelection) {
    return `It's a tie! You both played ${playerSelection}`;
  }

  const WIN = 'You win!';
  const LOSE = 'You lose!';

  console.log(`You played:\t\t\t${playerSelection}`);
  console.log(`Computer played:\t${computerSelection}`);
  console.log('\n');

  switch(playerSelection) {
    case 'Rock':
      if (computerSelection === 'Paper') {
        return `${LOSE} Rock loses to Paper`;
      } else {
        return `${WIN} Rock beats Scissors`;
      }
      break;
    case 'Paper':
      if (computerSelection === 'Rock') {
        return `${WIN} Rock beats Paper`;
      } else {
        return `${Lose} Paper loses to Scissors`;
      }
      break;
    case 'Scissors':
      if (computerSelection === 'Rock') {
        return `${LOSE} Scissors loses to Rock`;
      } else {
        return `${WIN} Scissors beats Paper`;
      }
      break;
    default:
      console.error("Error in playRound()");
  }
}

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

const VALID_OPTIONS = ["ROCK", "PAPER", "SCISSORS"];

let numOfGames = 5;

game(numOfGames);