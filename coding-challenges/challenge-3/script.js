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

function removeEmailDomains(emailArray) {
  return emailArray.map(email => {
    if (email.includes('@')) {
      return email.split('@')[0]; 
    } else {
      return email; // Handle cases without '@'
    }
  });
}

async function stringToSHA1(str) {
  // Encode the string as UTF-8
  const utf8Encoder = new TextEncoder();
  const buffer = utf8Encoder.encode(str);

  // Hash the buffer
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);

  // Convert ArrayBuffer to hex string 
  const hashArray = Array.from(new Uint8Array(hashBuffer));            
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
  return hashHex;
}

async function hashArrayElements(data) {
  const hashedArray = [];
  for (const item of data) {
    const hash = await stringToSHA1(item); // Using the stringToSHA1 function from earlier
    hashedArray.push(hash);
  }
  console.log("SHA-1 Hashes:", hashedArray);
  return hashedArray;
}

// Map JSON response to email array
function extractEmails(data) {
  const emails = data.data.map(user => user.email);
  return emails;
}

fetch('https://reqres.in/api/users?page=1')
  .then(response => response.json())
  .then(data => {
      const extractedEmails = extractEmails(data);
      const usernames = removeEmailDomains(extractedEmails); 
      console.log("Extracted Emails:", extractedEmails);
      console.log("Extracted Usernames:", usernames);
      hashArrayElements(usernames);
  })
  .catch(error => console.error('Error fetching data:', error));
