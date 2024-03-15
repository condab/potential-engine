const mainContent = document.querySelector(".main-content");
const wordForm = document.querySelector(".wordform");
const formInput = document.querySelector("#word");
const errorMsg = document.querySelector(".error");
const wordInput = document.getElementById("wordInput");
const wordCheck = document.getElementById("wordCheck");

// Caputre word form submit
wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMsg.classList.add("hidden");
  const word = formInput.value;
  updateWord(word);
  updatePoints(word);
});

// Display submitted word
const updateWord = (word) => {
  console.log("Word: " + word);
  if (word == "") {
    wordInput.textContent = "";
    wordCheck.textContent = "";
  } else {
    wordInput.textContent = word;
    wordCheck.textContent = "";
  }
};

// Calculate value and diplay points
const updatePoints = (word) => {
  let letterCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[a,e,i,o,u,l,n,r,s,t]/i)) {
      letterCount++;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[d,g]/i)) {
      letterCount+=2;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[b,c,m,p]/i)) {
      letterCount+=3;
    }
  }
  
  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[f,h,v,w,y]/i)) {
      letterCount+=4;
    }
  }
  
  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[k]/i)) {
      letterCount+=5;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[j,x]/i)) {
      letterCount+=8;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[q,z]/i)) {
      letterCount+=10;
    }
  }

  console.log(`The word '${word}' has ${letterCount} letters.`);

  if (letterCount === 0) {
    document.getElementById("wordPoints").textContent = ""
  } else {
    document.getElementById("wordPoints").textContent = letterCount + " points"
  }

  dictionaryCheck(word);
}

const dictionaryCheck = (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response => {
    if (response.ok) {
      wordCheck.textContent = "(exists)";
      wordCheck.style.color = 'green';
    } else if (word === "") {
      wordCheck.textContent = "";
    } else {
      wordCheck.textContent = "(not a word)";
      wordCheck.style.color = 'red';
    }
  })
}
