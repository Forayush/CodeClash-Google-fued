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
let timeLeft = 10; // Time allowed for each question
let incorrectGuesses = 0; // Track incorrect guesses

function loadQuestion() {
    const promptElement = document.getElementById("prompt");
    const currentQuestion = prompts[currentQuestionIndex];
    promptElement.textContent = currentQuestion.question;
    document.getElementById("results").textContent = ""; // Clear previous results
    document.getElementById("next").style.display = "none"; // Hide next button
    timeLeft = 10; // Reset time for the new question
    incorrectGuesses = 0; // Reset incorrect guesses for the new question
    document.getElementById("time").textContent = timeLeft; // Display time left
    startTimer(); // Start the countdown
}

function startTimer() {
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById("results").textContent = "Time's up! The correct answers were: " + prompts[currentQuestionIndex].answers.join(', ');
            document.getElementById("next").style.display = "block"; // Show next question button
        }
    }, 1000);
}

function submitAnswer() {
    clearInterval(countdown); // Stop the timer
    const userInput = document.getElementById("userInput").value.toLowerCase(); // Convert user input to lowercase
    const currentQuestion = prompts[currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.map(answer => answer.toLowerCase()); // Convert all correct answers to lowercase

    if (correctAnswers.includes(userInput)) {
        score++;
        document.getElementById("results").textContent = `Correct! Score: ${score}`;
        document.getElementById("next").style.display = "block"; // Show next question button
    } else {
        incorrectGuesses++;
        if (incorrectGuesses < 3) {
            document.getElementById("results").textContent = `Incorrect! You have ${3 - incorrectGuesses} attempts left. Try again!`;
        } else {
            document.getElementById("results").textContent = `Incorrect! You've used all your attempts. The correct answers were: ${correctAnswers.join(', ')}`;
            document.getElementById("next").style.display = "block"; // Show next question button
        }
    }
    
    document.getElementById("userInput").value = ""; // Clear input field
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % prompts.length; // Loop through questions
    loadQuestion();
}

document.getElementById("submit").addEventListener("click", submitAnswer);
document.getElementById("next").addEventListener("click", nextQuestion);

// Load the first question on page load
loadQuestion();