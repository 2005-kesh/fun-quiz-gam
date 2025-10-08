const questions = [
  {
    question: "What animal is known as the 'King of the Jungle'?",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Cheetah", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    answers: [
      { text: "Vincent Van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "Which ocean is the largest?",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Pacific_Ocean_-_en.png",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  }
];

const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".answers");
const nextButton = document.querySelector(".next-button");
const scoreEl = document.querySelector(".score");
const imageEl = document.querySelector(".question-image");
const progressbarEl = document.querySelector(".progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    scoreEl.textContent = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    imageEl.src = currentQuestion.image;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => selectAnswer(answer, button));
        answersEl.appendChild(button);
    });

    progressbarEl.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
}

function resetState() {
    nextButton.style.display = "none";
    while (answersEl.firstChild) 
        answersEl.removeChild(answersEl.firstChild);
}

function selectAnswer(answer, button) {
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(btn => btn.disabled = true);
    if (answer.correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }
    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionEl.textContent = "You finished the quiz";
    scoreEl.textContent = `Your score: ${score} out of ${questions.length}`;
    nextButton.textContent = "play again";
    nextButton.style.display = "inline-block";
    progressbar.style.width = `100%`;
    nextButton.onclick = startQuiz;
}

startQuiz();