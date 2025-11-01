window.addEventListener('load', function () {  

  let isPlaying = true;
  let score = 0;
  let lives = 3;
  let attemptsLeft;
  let remainingCountries = Array.from(COUNTRIES);
  let currentCountry;
  let countryLetter;
  let allMatchingLetters = [];
  let guess;
  
  const RandomCountry = () => {
    let randomIndex = [Math.floor(Math.random() * remainingCountries.length)];
    currentCountry = remainingCountries[randomIndex];
    for (let i = 0; i <currentCountry.length; i++) {
      countryLetter = currentCountry[i].toLowerCase();
    }
  }
  
  const cancelGame = () => {
    if (guess === null) {
      alert("Game is cancelled!");
      isPlaying = false;
      return;
    } 
  }
  
  const startTheGame = () => alert("Guess the country by its capital!");
  
  const wordTrim = () => guess = guess.trim().replace(/\s+/g, " ").toLowerCase();

  const isValidInput = (input) => /^[\p{L}\s\-]+$/u.test(input);
  
  startTheGame();
  
  while (isPlaying){
    attemptsLeft = 5;
    allMatchingLetters = [];
    RandomCountry();
  
    while (attemptsLeft > 0) {
  
      let guessedLettersResponse = allMatchingLetters.length > 0 ? `\n\nYou have already guessed: ${allMatchingLetters}.` : "";
      
      guess = prompt(`The capital of this country is ${currentCountry.capital}.\n\nWhat country is this?${guessedLettersResponse}\n\nAttempts: ${attemptsLeft}. Lives: ${lives}. Score: ${score}`);
  
      cancelGame();
      wordTrim();
  
      if (!isValidInput(guess)) {
        alert("Please input only letters!");
        continue;
      }
  
      if (guess === currentCountry.name.toLowerCase()) {
        score+=attemptsLeft;
        alert (`Correct!.\n\n${currentCountry.capital} is the capital of ${currentCountry.name}.\n\nLives: ${lives}. Score: ${score}`);
        break;
  
      } else {
        attemptsLeft--;
        alert(`Your guess is not correct! Try again!`);
        
        let currentMatchingLetter = [];
  
        for (let i = 0; i <currentCountry.name.length; i++) {
          let countryLetter = currentCountry.name[i].toLowerCase();
          if (guess.includes(countryLetter)) {
            currentMatchingLetter.push(countryLetter);
            if (!allMatchingLetters.includes(countryLetter)) {
              allMatchingLetters.push(countryLetter);
            }
          }
        }
      }
    }
  
    if (attemptsLeft === 0) {
      lives--;
      alert(`You lost one life!\n\n${currentCountry.capital} is the capital of ${currentCountry.name}.\n\nScore: ${score}; Lives left: ${lives}`);
    }
  
    remainingCountries = remainingCountries.filter(country => country !== currentCountry);
  
    if (lives === 0) {
      isPlaying = false;
      alert(`You run out of lives!\n\nGame Over!\n\nFinal score: ${score}`);
    }
  
    if (remainingCountries.length === 0) {
      alert(`Congratulations!\n\nYou guessed all the ${COUNTRIES.length} countries in the world!`);
      isPlaying = false;
    }
  }
  
  });