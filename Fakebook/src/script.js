//Variables
const form = document.getElementById("right_side_form")
const submit = document.getElementById("submit_button")

let slideIndex = 1;

//Listeners
document.addEventListener("click",(event) => {console.log(event.key)});


showSlides(slideIndex);

function plusSlides(n) {
    if (n < 0){
        showSlides(slideIndex -= n);        
    } else {
        showSlides(slideIndex += n);
    }
        
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let slide_length = slides.length;

    if (n > slides.length) {slideIndex = 1} //back to first element   
    if (n < 1) {slideIndex = slides.length} //No slider if shitty input

    for (i = 0; i < slides.length; i++) { //delete precedent to make it pretty
        slides[i].style.display = "none";
        }      
    for (i = -1; i < slides.length; i++){
        slides[slideIndex + i].style.display = "block";
    }


            


}



