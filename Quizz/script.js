//Grabbing DOM
const question_container = document.querySelector(".container_for_question p"),
answers_displayed = document.querySelectorAll(".answer"),
good_answers_scoring = document.querySelector("#good_answers span"),
bad_answers_scoring = document.querySelector("#bad_answers span");
let good_answers = 0, bad_answers = 0, current_question = 0, questions = [], total_questions;

//Classes here
/**
 * @param question, a string representing the question that will be asked
 * @param answers, a list representing all possible answers for this question
 * @param correct_answer, a string that is self-explanatory
 */
class Question{
    constructor(question, answers, correct_answer){
        this.question = question;
        this.answers = answers;
        this.correct_answer = correct_answer;
    }
}

//Question objects init
const question1 = new Question(
    "Who is the narrator of Sherlock Holmes adventures?", //question
    ["Shrek", "Sherlock Holmes", "Watson", "Dr Moriarty"], //answers
    "Watson") //correct_answer

const question2 = new Question(
    "Who was the fortieth president of USA?", //question
    ["Kennedy", "Reagan", "Trump", "Bush"], //answers
    "Reagan") //correct_answer

const question3 = new Question(
    "What does 'Bistro' means in Russian?", //question
    ["Fast", "Drink", "Bastard", "I love you"], //answers
    "Fast") //correct_answer

const question4 = new Question(
    "Who created French Academy?", //question
    ["Malherbe", "Francis Ponge", "Le cardinal de Richelieu", "Jésus"], //answers
    "Le cardinal de Richelieu") //correct_answer

const question5 = new Question(
    "Which city had the first metro?", //question
    ["Paris", "Moscow", "London", "Berlin"], //answers
    "London") //correct_answer

questions = [question1, question2, question3, question4, question5];
total_questions = questions.length;


function init_game(){
    //we display the question and its answers
    if(questions[current_question]){        
        question_container.innerText = questions[current_question].question;
        for(let i = 0; i < answers_displayed.length; i++){            
            answers_displayed[i].innerText = questions[current_question].answers[i];
        }
    } else { //The array has finished, the game too       
        document.querySelector(".congratulations").style.display= "flex";
    }
}

function reset_answers_to_original_style(){
    answers_displayed.forEach(answer => {
        answer.style.backgroundColor = "";
    });
}

function handle_score(){
    good_answers_scoring.innerText = good_answers;
    bad_answers_scoring.innerText = bad_answers;
}

init_game();

//Adding click event
answers_displayed.forEach(answer => {
    answer.addEventListener("click", e => {        
            //checking if correct answer         
            if (e.explicitOriginalTarget.textContent == questions[current_question].correct_answer){   
                
                //checking if current question is NOT the last
                if(current_question !== total_questions){                        
                    good_answers++;        
                    current_question++;
                    handle_score();
                    reset_answers_to_original_style();
                    init_game();   
                }

            } else {
                bad_answers++;
                answer.style.backgroundColor = "red";
                handle_score();
            }
    });
});


