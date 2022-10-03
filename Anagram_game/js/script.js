const wordText = document.querySelector(".word"),
refresh_button = document.querySelector(".refresh-word"),
input_field = document.querySelector("input"),
check_button = document.querySelector(".check-word"),
timeText = document.querySelector(".time b"),
hintText = document.querySelector(".hint span");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert("Time off! "+correctWord.toUpperCase()+" was the correct word");
    }, 1000);
}

const init_game = () => {
    initTimer(30);
    let random_object = words[Math.floor(Math.random() * words.length)];
    let wordArray = random_object.word.split("");

    for(let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        //shiffling and swiping
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join('');
    hintText.innerText = random_object.hint;
    correctWord = random_object.word.toLowerCase();
    input_field.value = "";
    input_field.setAttribute("maxlength", correctWord.length);
}

init_game();

const check_word = () => {
    let userWord = input_field.value.toLocaleLowerCase();

    if(!userWord) return alert("Please enter a word!");

    if(userWord !== correctWord) return alert("Nope! "+userWord+"is not the correct word");
    
    alert("Yup, you're right!");
    init_game();
}   

refresh_button.addEventListener("click", init_game);
check_button.addEventListener("click", check_word);