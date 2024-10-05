let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id: "0",
        question: "What is urban farming?",
        options: ["The practice of cultivating and processing food in urban areas", "Farming in rural areas", "Planting in forests", "Fishing in urban lakes"],
        correct: "The practice of cultivating and processing food in urban areas",
    },
    {
        id: "1",
        question: "Which is a benefit of urabn farming",
        options: ["Increased pollution", "Improved food security", "High transportation cost", "Low food production"],
        correct: "Improved food security",
    },
    {
        id: "2",
        question: "Which method is commonly used in urban farming",
        options: ["Hydroponics","Slash and burn", "Shifting agriculture", "Nomadic farming"],
        correct: "Hydroponics",
    },
    {
        id: "3",
        question: "Which of the following does urban farming reduce?",
        options: ["Heating effects", "Green spaces", "Biodiversity", "Population"],
        correct: "Heating effects",
    },
    {
        id: "4",
        question: "Which is not a challenge faced by urban farmers",
        options: ["Limited space", "High land costs", "Soil conamination", "Abundant water supply"],
        correct: "Abundant water supply",
    },
    {
        id: "5",
        question: "which is a common location for urban farming",
        options: ["Rooftop", "Mountains", "Oceans", "Deserts"],
        correct: "Rooftop",
    }, {
        id: "6",
        question: "which crop is least likely to be grown in an urban farm?",
        options: ["Wheat", "Tomatoes", "Herbs", "Lettuce"],
        correct: "Wheat",
    },
    {
        id: "7",
        question: "Whcih technology is used to monitor plant health in urban farming?",
        options: ["Drones", "Sensors", "Satellites", "Fitness trackers"],
        correct: "Sensors",
    },
    {
        id: "8",
        question: "Which method uses water to grow plants without soil?",
        options: ["Aquaponics", "Aeroponics", "Hydroponics", "Zooponics"],
        correct: "Aquaponics",
    },
    {
        id: "9",
        question: "Which is often grown in urban farms",
        options: ["Wheat", "Corn", "Mint", "Rice"],
        correct: "Mint",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};