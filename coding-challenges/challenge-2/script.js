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
  isoCheck(word);
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

const isoCheck = (word) => {
  const wordLower = word.toLowerCase();
  for (let i=0; i < word.length; i++) {
    for (let j=i+1; j< word.length; j++){
      if (wordLower[i]==wordLower[j]) {
        var x = true;
      }
    }
  }
  if (x) {
    wordCheck.textContent = "is not an Isogram";
  } else {
    wordCheck.textContent = "is an Isogram";
  }
  return wordLower
};
