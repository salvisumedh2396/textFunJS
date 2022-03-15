let textBox = document.getElementById("my-text-box");
let result = document.getElementById("result");

//console.log(textBox,result);

//Check for empty text-box

let isEmpty = () => {
    if(textBox.value.length != 0){
        return false;
    }else{
        return true;
    }
};

//reverse functionality

let reverseStr = () => {
    if(isEmpty()){
        result.innerHTML = "Please enter some text";
    }else{
        let myText = textBox.value;
        result.innerHTML = `The reversed text is:
        <span>${myText.split("").reverse().join("")}</span>`;
    }
};

//check palindrome

let isPalindrome = () => {
    if(isEmpty()){
        result.innerHTML = "Please enter some text";
    }else{
        let myText = textBox.value.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
        if(myText == myText.split("").reverse().join("")){
            result.innerHTML = `It is  <span>A palindrome</span>`;
        }else{
            result.innerHTML = `It is <span>Not a Palindrome</span>`
        }
    }
};

//character count

let charCount = () => {
    if (isEmpty()){
        result.innerHTML = "Please enter some text";
    }else{
        let myText = textBox.value;
        result.innerHTML = `The character count is : <span>${myText.length}</span>`;
    }
}

//word count

let wordCount = () => {
    if (isEmpty()){
        result.innerHTML = "Please enter some text";
    }else{
        let myText = textBox.value;
        result.innerHTML = `The word count is : <span>${myText.trim().split(/\s+/).filter((item)=>item).length}</span>`;
    }    
}

//search given word in text

let search = () => {
    let searchText = document.getElementById("search-text").value;
    if(isEmpty() || searchText.length == 0){
        result.innerHTML = "Either Or Both Input Fields Are Empty";
    }else{
        let myText = textBox.value;
        if(myText.includes(searchText)){
            result.innerHTML = `The text contains <span>'${searchText}'</span>`;
        }else{
            result.innerHTML = `The text does not contain <span>'${searchText}'</span>`;
        }
    }
}

//search meaning

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const res = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            //console.log(data[0].meanings[0].partOfSpeech);
            //console.log(data[0].meanings[0].definitions[0].definition);
            res.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            res.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playSound() {
    sound.play();
}