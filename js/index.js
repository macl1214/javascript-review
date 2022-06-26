function computerPlay() {
  console.log("From computerPlay...");
  let message = "Computer plays... ";
  let ran = Math.floor(Math.random() * 3) + 1;

  switch(ran) {
    case 1:
      console.log(message + "Rock");
      return 'Rock';
    case 2:
      console.log(message + "Paper");
      return 'Paper';
    case 3:
      console.log(message + "Scissors");
      return 'Scissors';
    default:
      console.error("Error in computerPlay()");
  }
}

computerPlay();