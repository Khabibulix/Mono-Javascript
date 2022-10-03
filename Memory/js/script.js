"use strict"

const cards = document.querySelectorAll(".card");
const back_side = document.querySelectorAll(".back-view");
const front_side = document.querySelectorAll(".front-view");
const reset_button = document.querySelector("#reset_button");
let date = document.getElementById('time');
let number_of_cards_flipped = 0;
let cards_remaining_in_playground = 16;
let cards_flipped = [];
let cards_src_array = [];
let is_still_playing = false;
let disable_deck = false;
let score = 0;
let sec = 0;
let min = 0;

//Randomize using Math.random for displaying cards in different order at each reload
function randomize_playground(){     
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8] 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);   
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        let img_tag = card.querySelector("img");
        removing_useless_noise_in_string(img_tag.src) 
        img_tag.src = '../assets/img-' + arr[index] + '.png';

    });
}

function incrementing_timer(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
        }
    }
}

function modifying_text_in_html() {
    incrementing_timer();
    date.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    start_game_timer();
}

function start_game_timer(){    
    let time_of_delay = setTimeout(modifying_text_in_html, 1000)
}

function delete_all_in_array(array){
    let i;
    for (i = 0; array.length; i++){array.pop()}
}

// "http://127.0.0.1:5500/Memory/assets/f.png" --> "f.png"
function removing_useless_noise_in_string(str){
    return str.split("/")[str.split("/").length - 1];
}



reset_button.addEventListener("click", function(){
    window.location.reload();
});

randomize_playground();        
start_game_timer(); 

cards.forEach(card => {  
    let current_back_side = card.children[1];
    let current_front_side = card.children[0];    
    let on_back = Boolean(current_back_side.style.visibility="hidden");

    card.addEventListener("click", function main() {
        is_still_playing = true;
        //Flip the card clicked
        if (on_back){  
            current_back_side.style.visibility="visible";
            cards_flipped.push(card);
            cards_src_array.push(card.querySelector("img").src)
            number_of_cards_flipped ++;       
                    
            //Handles comparison of 2 cards
            if (number_of_cards_flipped == 2){
                const src_of_first_card = removing_useless_noise_in_string(cards_src_array[0]);
                const src_of_second_card = removing_useless_noise_in_string(cards_src_array[1]);

                //Check validity of 2 cards flipped
                if (src_of_first_card == src_of_second_card && cards_flipped[0] != cards_flipped[1]){
                    cards_flipped.forEach(card => {
                        card.children[1].style.visibility = "hidden";   
                        card.children[0].style.visibility = "hidden";                          
                        card.style.visibility= "hidden";
                        cards_remaining_in_playground -= 1;                                               
                    });
                    score += 25;                
                    let scoring = document.getElementById("scoring").innerHTML = score;
                }
                
            }
                    
            //Handles too much cards flipped
            if (number_of_cards_flipped > 2){
                current_front_side.style.visibility="visible";

                //Hiding last 2 cards flipped
                cards_flipped.forEach(card_flipped => {                                   
                    card_flipped.children[1].style.visibility="hidden";
                });
                delete_all_in_array(cards_flipped)
                delete_all_in_array(cards_src_array)
                number_of_cards_flipped = 0
            }

            if (cards_remaining_in_playground == 0){
                randomize_playground()
            }
            
        }
        
    });      
    
});





