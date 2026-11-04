// =====================================
// ORBITRA - PLANET POPUPS
// =====================================

const planetData = [
    {
        name: "Mercury",
        emoji: "☿",
        color: "#aaa9a5",
        distance: "57.9 million km",
        diameter: "4,879 km",
        temperature: "167°C",
        description: "Mercury is the smallest planet and the closest planet to the Sun."
    },
    {
        name: "Venus",
        emoji: "♀",
        color: "#e6b56b",
        distance: "108.2 million km",
        diameter: "12,104 km",
        temperature: "464°C",
        description: "Venus is the hottest planet in our Solar System because of its thick atmosphere."
    },
    {
        name: "Earth",
        emoji: "🌍",
        color: "#3689d8",
        distance: "149.6 million km",
        diameter: "12,742 km",
        temperature: "15°C",
        description: "Earth is our home planet and the only known planet to support life."
    },
    {
        name: "Mars",
        emoji: "♂",
        color: "#d66b45",
        distance: "227.9 million km",
        diameter: "6,779 km",
        temperature: "-65°C",
        description: "Mars is known as the Red Planet because of iron oxide on its surface."
    },
    {
        name: "Jupiter",
        emoji: "♃",
        color: "#c99b73",
        distance: "778.5 million km",
        diameter: "139,820 km",
        temperature: "-110°C",
        description: "Jupiter is the largest planet and is famous for its Great Red Spot."
    },
    {
        name: "Saturn",
        emoji: "🪐",
        color: "#d8bd83",
        distance: "1.43 billion km",
        diameter: "116,460 km",
        temperature: "-140°C",
        description: "Saturn is a gas giant famous for its spectacular ring system."
    },
    {
        name: "Uranus",
        emoji: "♅",
        color: "#83d5d8",
        distance: "2.87 billion km",
        diameter: "50,724 km",
        temperature: "-195°C",
        description: "Uranus is an ice giant that rotates on its side."
    },
    {
        name: "Neptune",
        emoji: "♆",
        color: "#4169e1",
        distance: "4.5 billion km",
        diameter: "49,244 km",
        temperature: "-200°C",
        description: "Neptune is the farthest planet from the Sun and has extremely strong winds."
    }
];

const planetCards = document.querySelectorAll(".planet");

const popup = document.getElementById("planetPopup");
const closePopup = document.getElementById("closePopup");

const planetImage = document.getElementById("planetImage");
const planetName = document.getElementById("planetName");
const planetDescription = document.getElementById("planetDescription");

const planetDistance = document.getElementById("planetDistance");
const planetDiameter = document.getElementById("planetDiameter");
const planetTemperature = document.getElementById("planetTemperature");

planetCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const planet = planetData[index];

        if (!planet) return;

        planetName.textContent = planet.name;
        planetDescription.textContent = planet.description;

        planetDistance.textContent = planet.distance;
        planetDiameter.textContent = planet.diameter;
        planetTemperature.textContent = planet.temperature;

        // Create a simple planet illustration without external images
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                <defs>
                    <radialGradient id="planet">
                        <stop offset="0%" stop-color="white" stop-opacity=".45"/>
                        <stop offset="100%" stop-color="${planet.color}"/>
                    </radialGradient>
                </defs>
                <circle cx="150" cy="150" r="90" fill="url(#planet)"/>
            </svg>
        `;

        planetImage.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
        planetImage.alt = planet.name;

        popup.style.display = "flex";
    });

});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        popup.style.display = "none";
    }
});


// =====================================
// ORBITRA - SPACE QUIZ
// =====================================

const questions = [
    {
        question: "Which is the largest planet in our Solar System?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Mercury", "Uranus"],
        answer: "Mars"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Mars"],
        answer: "Mercury"
    },
    {
        question: "Which planet is famous for its beautiful rings?",
        options: ["Jupiter", "Saturn", "Neptune", "Earth"],
        answer: "Saturn"
    },
    {
        question: "Which planet is known as the Blue Planet?",
        options: ["Mars", "Earth", "Venus", "Mercury"],
        answer: "Earth"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("quizResult");
const scoreElement = document.getElementById("quizScore");
const nextButton = document.getElementById("nextQuestion");

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    answersElement.innerHTML = "";
    resultElement.textContent = "";

    nextButton.textContent = "Next Question →";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(option);
        });

        answersElement.appendChild(button);

    });

}

function checkAnswer(selectedOption) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {

        resultElement.textContent = "Correct! Great job, Space Explorer! 🚀";
        score++;

    } else {

        resultElement.textContent =
            "Not quite! The correct answer is " + correctAnswer + ".";

    }

    document.querySelectorAll(".answers button").forEach(button => {
        button.disabled = true;
    });

    scoreElement.textContent = "Score: " + score;

}

nextButton.addEventListener("click", () => {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else if (nextButton.textContent === "Play Again") {

        currentQuestion = 0;
        score = 0;
        scoreElement.textContent = "Score: 0";
        showQuestion();

    } else {

        questionElement.textContent = "Mission Completed! 🌌";
        answersElement.innerHTML = "";

        resultElement.textContent =
            "You scored " + score + " out of " + questions.length + "!";

        nextButton.textContent = "Play Again";

    }

});

// Start the quiz
showQuestion();