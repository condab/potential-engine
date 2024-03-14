
const mainContent = document.querySelector(".main-content");
const wordForm = document.querySelector(".wordform");
const formInput = document.querySelector("#word");
const errorMsg = document.querySelector(".error");

// Caputre word form submit
wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMsg.classList.add("hidden");
  console.log(formInput.value);
  const word = formInput.value;
  updateWord(word);
});

const updateWord = (word) => {
  console.log(word);

  return `
    <article class="scrabbleCalc">
          <div class="scrabbleCalc">
            <span class="scrabbleCalc__wordInput">${word}</span>
          </div>
        </article>
    `;

}