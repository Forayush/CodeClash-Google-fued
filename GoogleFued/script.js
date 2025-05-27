const prompts = [
    {
        question: "What do you think of when you hear the word 'JavaScript'?",
        answers: ["Programming", "Web Development", "Frontend", "Versatile", "Language"]
    },
    {
        question: "What do you usually do on a Saturday?",
        answers: ["Sleep", "Party", "Watch Movies", "Go Shopping", "Play Sports"]
    },
    {
        question: "What is your favorite color?",
        answers: ["Blue", "Red", "Green", "Yellow", "Black"]
    },
    {
        question: "What is a popular programming language?",
        answers: ["JavaScript", "Python", "Java", "C++", "Ruby"]
    },
    {
        question: "What do you do in your free time?",
        answers: ["Read", "Watch TV", "Exercise", "Play Video Games", "Travel"]
    },
    {
        question: "What is your favorite season?",
        answers: ["Summer", "Winter", "Spring", "Autumn", "Rainy"]
    },
    {
        question: "What is your dream vacation destination?",
        answers: ["Hawaii", "Paris", "Bali", "Japan", "Australia"]
    },
    {
        question: "What is your favorite type of music?",
        answers: ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical"]
    },
    {
        question: "What is your favorite ice cream flavor?",
        answers: ["Chocolate", "Vanilla", "Strawberry", "Mint", "Cookie Dough"]
    },
    {
        question: "What do you usually eat for breakfast?",
        answers: ["Eggs", "Cereal", "Pancakes", "Toast", "Fruit"]
    },
    {
        question: "What is the best way to relax?",
        answers: ["Meditate", "Take a Bath", "Read a Book", "Watch Movies", "Listen to Music"]
    },
    {
        question: "What is your favorite animal?",
        answers: ["Dog", "Cat", "Bird", "Fish", "Rabbit"]
    },
    {
        question: "What is the most important meal of the day?",
        answers: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"]
    },
    {
        question: "What do you want to be when you grow up?",
        answers: ["Doctor", "Engineer", "Artist", "Teacher", "Scientist"]
    },
    {
        question: "What is your favorite movie genre?",
        answers: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"]
    },
    {
        question: "What is your favorite sport?",
        answers: ["Football", "Basketball", "Tennis", "Baseball", "Soccer"]
    }
];
let currentQuestionIndex = 0;
let score = 0;
let countdown;
let timeLeft = 10;
let incorrectGuesses = 0;
let foundAnswers = [];

function loadQuestion() {
    const promptElement = document.getElementById("prompt");
    const currentQuestion = prompts[currentQuestionIndex];
    promptElement.textContent = currentQuestion.question;
    document.getElementById("results").textContent = "";
    document.getElementById("next").style.display = "none";
    document.getElementById("inputContainer").style.display = "block";
    document.getElementById("userInput").value = "";
    timeLeft = 10;
    incorrectGuesses = 0;
    foundAnswers = [];

    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const option = document.createElement("option");
        option.value = answer;
        suggestionBox.appendChild(option);
    });

    document.getElementById("time").textContent = timeLeft;
    startTimer();
}

function startTimer() {
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endRound();
        }
    }, 1000);
}

function submitAnswer() {
    const inputElement = document.getElementById("userInput");
    const userInput = inputElement.value.trim().toLowerCase();
    inputElement.value = "";

    const currentQuestion = prompts[currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.map(ans => ans.toLowerCase());

    if (correctAnswers.includes(userInput)) {
        if (!foundAnswers.includes(userInput)) {
            foundAnswers.push(userInput);
            document.getElementById("results").innerHTML =
                `✅ Correct! (${foundAnswers.length}/${correctAnswers.length})<br><ul>${foundAnswers.map(a => `<li>${a}</li>`).join('')}</ul>`;
        } else {
            document.getElementById("results").innerHTML += `<p>⚠️ You already found "${userInput}". Try something else!</p>`;
        }
    } else {
        incorrectGuesses++;
        document.getElementById("results").innerHTML += `<p>❌ Incorrect! ${3 - incorrectGuesses} attempts left.</p>`;
    }

    if (foundAnswers.length === correctAnswers.length || incorrectGuesses >= 3) {
        clearInterval(countdown);
        endRound();
    }
}

function endRound() {
    const currentQuestion = prompts[currentQuestionIndex];
    const correctAnswers = currentQuestion.answers;
    document.getElementById("inputContainer").style.display = "none";
    showAnswersTable(correctAnswers);
    document.getElementById("next").style.display = "block";
}

function showAnswersTable(answers) {
    let tableHTML = `<table class="answers-table"><thead><tr><th>Correct Answers</th></tr></thead><tbody>`;
    answers.forEach(answer => {
        tableHTML += `<tr><td>${answer}</td></tr>`;
    });
    tableHTML += `</tbody></table>`;
    document.getElementById("results").innerHTML += tableHTML;
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % prompts.length;
    loadQuestion();
}

document.getElementById("submit").addEventListener("click", submitAnswer);
document.getElementById("next").addEventListener("click", nextQuestion);
loadQuestion();