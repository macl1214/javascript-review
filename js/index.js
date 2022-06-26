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
        return `${Win} Rock beats Scissors`;
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

const VALID_OPTIONS = ['Rock', 'Paper', 'Scissors'];

const playerSelection = 'Scissors';
const computerSelection = computerPlay();

console.log(playRound(playerSelection, computerSelection));