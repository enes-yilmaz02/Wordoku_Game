import {   startDate, alphabets, qwerty } from "./five";






let three=document.getElementById('three');
let four=document.getElementById('four');
let five=document.getElementById('five');
let allowedAttempts=5;
const temp=[''];
const sum=[''];

document.getElementById('three').addEventListener("click", function() {
  allowedAttempts=3;
});
document.getElementById('four').addEventListener("click", function() {
  allowedAttempts=4;
});

document.getElementById('five').addEventListener("click", function() {
  allowedAttempts=5;
});


 var wordList_three = [
   
  
    "ara",
    "ava",
    "pac",
    "asa",
    "aca",
    "ucu",
    
 ];

var globalSetOfWords_three = [
   
    "ara",
    "ava",
    "pac",
    "asa",
    "aca",
    "ucu",
    
 ]
 
   var wordList_four = [
   
    "para",
    "dava",
    "paca",
    "masa",
    "baca",
    "sucu",
   
 ];

 
 var globalSetOfWords_four = [
    "para",
    "dava",
    "paca",
    "masa",
    "baca",
    "sucu",
    
 
 ]

  var wordList_five = [
   
    "param",
    "davam",
    "pacam",
    "masam",
    "bacam",
    "sucum",
   
 ];

 
 var globalSetOfWords_five = [
    "param",
    "davam",
    "pacam",
    "masam",
    "bacam",
    "sucum",
    
 
 ]



  const Wordle = function () {
    let currentRow = 0;
    let currentColumn = 0;
    let currentWord = [];
    allowedAttempts;
    wordList_five;
    wordList_four;
    wordList_three;
    globalSetOfWords_five;
    globalSetOfWords_four;
    globalSetOfWords_three;
    let scoreCard = [];
    let answer = null;
  
    const checkIfAValidWord = (word) => {
      if(allowedAttempts==3){
        return globalSetOfWords_three.includes(word) || wordList_three.includes(word);
      }
      if(allowedAttempts==4){
        return globalSetOfWords_four.includes(word) || wordList_four.includes(word);
      }
      if(allowedAttempts==5){
        return globalSetOfWords_five.includes(word) || wordList_five.includes(word);
      }
      
    }
  
    const getTheWordIndexForToday = () => {
      const timeDiff = new Date().getTime() - startDate.getTime();
      if(allowedAttempts==3){
        return Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % wordList_three.length;
      }
      if(allowedAttempts==4){
        return Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % wordList_four.length;
      }
      if(allowedAttempts==5){
        return Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % wordList_five.length;
      }
      
      
    }
  
    const checkIfItsAMatch = (word) => {
      return String(word).toLowerCase() === answer;
    }
  
    const showMessage = (msg) => {
      const messageContainer = document.querySelector('#messages');
      messageContainer.innerText = msg;
      messageContainer.classList.add('shown');
      setTimeout(() => {
        messageContainer.classList.remove('shown');
      }, 2000);
    }
  
    const createBoard = () => {
      const board = document.querySelector('#board');
      board.innerHTML = "";
      // create 6 blank rows
      for (let i = 0; i < allowedAttempts; i++) {
        let row = document.createElement('div');
        row.className = 'board-row';
        row.id = 'row-' + i;
        board.appendChild(row);
        for (let j = 0; j < allowedAttempts; j++) {
          // 5 satır oluşturmak
          let column = document.createElement('div');
          column.className = 'board-column';
          column.id = 'column-' + i + "-" + j;
          row.appendChild(column);
  
          // create front & back side of the cards (just for a flip animation)
          let columnFront = document.createElement('div');
          columnFront.className = 'board-column-front';
          columnFront.id = 'column-front-' + i + "-" + j;
          column.appendChild(columnFront);
          let columnBack = document.createElement('div');
          columnBack.className = 'board-column-back';
          columnBack.id = 'column-back-' + i + "-" + j;
          column.appendChild(columnBack);
        }
      }
    }
  
    const enterAKey = (event) => {
      if (currentColumn < allowedAttempts) {
        document.querySelector('#column-front-' + currentRow + "-" + currentColumn).innerText = event.target.innerText;
        document.querySelector('#column-back-' + currentRow + "-" + currentColumn).innerText = event.target.innerText;
        currentColumn++;
        currentWord.push(event.target.innerText);
      }
    }
  
    window.addEventListener('keydown', (evt) => {
      if (qwerty.includes(evt.key.toLowerCase())) {
        enterAKey({ target: { innerText: evt.key.toUpperCase() } })
      }
      else if (evt.key === 'Backspace') {
        goBack();
      }
      else if (evt.key === 'Enter') {
        checkTheCurrentRow();
      }
    });
  
     const generateScoreCard = async () => {
      if(allowedAttempts==3){
        let result = `Kelime Oyunu ${getTheWordIndexForToday() + 1} / ${wordList_three.length}\n\n`;
        return result;
      }
      if(allowedAttempts==4){
        let result = `Kelime Oyunu ${getTheWordIndexForToday() + 1} / ${wordList_four.length}\n\n`;
        return result;
      }
      if(allowedAttempts==5){
        let result = `Kelime Oyunu ${getTheWordIndexForToday() + 1} / ${wordList_five.length}\n\n`;
        return result;
      }
      
      
      scoreCard.forEach((line) => {
        const lineOutput = [...line].reduce((prev, curr) => {
          switch (curr) {
            case 'green':
              return prev + '🟩';
            case 'yellow':
              return prev + '🟨';
            default:
              return prev + '⬛';
          }
        }, '');
        result += `${lineOutput}\n`;
      });
      await navigator.clipboard.writeText(result);
      showMessage("Result is copied to clipboard")
    }
  
  
     const showBanner = () => {
      const banner = document.querySelector("#banner");
      setTimeout(() => { banner.style.display = "flex"; }, 1000);
      document.querySelector('.share').onclick = generateScoreCard;
    }
  
    const showAnswer = () => {
      const banner = document.querySelector("#answer-banner");
      banner.style.display = "flex";
      document.querySelector('#answer-text').innerHTML = "The answer is " + answer;
    }
 
  
    const checkTheCurrentRow = () => {
     
      if (currentWord.length < allowedAttempts) {
        showMessage("Kelimeyi Tamamlayınız.");
      } else if (!checkIfAValidWord(currentWord.join("").toLowerCase())) {
        showMessage("Kelime bulunamadı!");
      }
      else {
        
          const letters = currentWord;
        const lettersInAnswer = answer.split("");
        const lineScore = [];
        letters.forEach((letter, index) => {
          if (letter.toLowerCase() === lettersInAnswer[index].toLowerCase()) {
            // exact match turn green
           
              document.querySelector("#column-back-" + currentRow + "-" + index).classList.add('green');
            document.querySelector("#column-" + currentRow + "-" + index).classList.add('flipped');
            document.querySelector("#keypad-key-" + letter.toLowerCase()).classList.add('green');
            lineScore.push("green");
            
  
          } else if (lettersInAnswer.includes(letter.toLowerCase())) {
            // partial match turn yellow
            document.querySelector("#column-back-" + currentRow + "-" + index).classList.add('yellow');
            document.querySelector("#column-" + currentRow + "-" + index).classList.add('flipped');
            document.querySelector("#keypad-key-" + letter.toLowerCase()).classList.add('yellow');
            lineScore.push("yellow")
          } else {
            // no match turn grey
            document.querySelector("#column-back-" + currentRow + "-" + index).classList.add('grey');
            document.querySelector("#column-" + currentRow + "-" + index).classList.add('flipped');
            document.querySelector("#keypad-key-" + letter.toLowerCase()).classList.add('grey');
            lineScore.push("grey");
          }
        });
        scoreCard.push(lineScore);
  
        if (checkIfItsAMatch(currentWord.join("").toLowerCase())) {
          currentRow === 0 && showMessage("Are you real?");
          currentRow === 1 && showMessage("Genius!");
          currentRow === 2 && showMessage("Awesome!");
          currentRow === 3 && showMessage("Great Job!");
          currentRow === 4 && showMessage("Good Job!");
          currentRow === 5 && showMessage("Phew!");
  
          showBanner();
        }
        else if (currentRow + 1 === allowedAttempts) {
          showAnswer();
        } else {
          currentRow++;
          currentColumn = 0;
          currentWord = [];
        }
      
        }
     
    }
  
    const goBack = () => {
      if (currentColumn > 0) {
        document.querySelector('#column-front-' + currentRow + "-" + (currentColumn - 1)).innerText = "";
        document.querySelector('#column-back-' + currentRow + "-" + (currentColumn - 1)).innerText = "";
        currentColumn--;
        currentWord.pop();
      }
    }
  
    const setupKeypad = () => {
      const alphabets = document.querySelector('#alphabets');
      alphabets.innerHTML = "";
      const specialKeys = document.querySelector('#special-keys');
      specialKeys.innerHTML = "";
      qwerty.forEach(e => {
        let key = document.createElement('div');
        key.className = 'keypad-key';
        key.id = 'keypad-key-' + e;
        key.innerText = String(e).toUpperCase();
        alphabets.appendChild(key);
        key.onclick = enterAKey;
      });
  
      let backKey = document.createElement('div');
      backKey.className = 'keypad-special-key';
      backKey.id = 'keypad-key-back';
      backKey.innerText = "Geri";
      backKey.onclick = goBack;
      specialKeys.appendChild(backKey);
  
      let enterKey = document.createElement('div');
      enterKey.className = 'keypad-special-key';
      enterKey.id = 'keypad-key-enter';
      enterKey.innerText = "Enter";
      enterKey.onclick = checkTheCurrentRow;
  
      specialKeys.appendChild(enterKey)
    }
  
    const getRandomWordIndex = () => {
      if(allowedAttempts==3){
        return (Math.floor(Math.random() * (wordList_three.length + 1) + 1)) % wordList_three.length;
      }
      if(allowedAttempts==4){
        return (Math.floor(Math.random() * (wordList_four.length + 1) + 1)) % wordList_four.length;
      }
      if(allowedAttempts==5){
        return (Math.floor(Math.random() * (wordList_five.length + 1) + 1)) % wordList_five.length;
      }
      
    }
  
    const startGame = (random = false) => {
      currentRow = 0;
      currentColumn = 0;
      currentWord = [];
      scoreCard = [];
      createBoard();
      setupKeypad();
      document.querySelector('#messages').classList.remove('shown');
      document.querySelector("#banner").style.display = "none";
      document.querySelector("#answer-banner").style.display = "none";
      if (random) {
        if(allowedAttempts==3){
          answer = wordList_three[getRandomWordIndex()]
        }
        if(allowedAttempts==4){
          answer = wordList_four[getRandomWordIndex()]
        }
        if(allowedAttempts==5){
          answer = wordList_five[getRandomWordIndex()]
        }
       
      } else {
        if(allowedAttempts==3){
          answer = wordList_three[getTheWordIndexForToday()]
        }
        if(allowedAttempts==4){
          answer = wordList_four[getTheWordIndexForToday()]
        }
        if(allowedAttempts==5){
          answer = wordList_five[getTheWordIndexForToday()]
        }
       
        
      }
    }
  
    this.startGame = startGame;
  }




 



if(document.getElementById('three').addEventListener("click",function(){
three.style.backgroundColor="#ffc0cb";
four.style.backgroundColor="transparent";
five.style.backgroundColor="transparent";
 window.wordle = new Wordle();
 wordle.startGame();

}));

if(document.getElementById('four').addEventListener("click",function(){
  four.style.backgroundColor="#ffc0cb";
  three.style.backgroundColor="transparent";
  five.style.backgroundColor="transparent";
  window.wordle = new Wordle();
wordle.startGame();

}));
if(document.getElementById('five').addEventListener("click",function(){
  four.style.backgroundColor="transparent";
  three.style.backgroundColor="transparent";
  five.style.backgroundColor="#ffc0cb";
  window.wordle = new Wordle();
  wordle.startGame();

}));
