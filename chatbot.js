let questions = [
    {
        question: "Do you feel happy?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Super!",
        incorrectResponse: "I am sorry"
    },
    {
        question: "Do you like programming?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Nice! Keep coding!",
        incorrectResponse: "It gets better."
    },
    {
        question: "Is JavaScript a programming language?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Correct!",
        incorrectResponse: "JS is a programming language!"
    },
    {
        question: "Is HTML a programming language?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "b",
        correctResponse: "Right, it's a markup language.",
        incorrectResponse: "Nope, it's a markup language."
    },
];

let currentQuestionIndex = 0;

let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");

displayQuestion();

function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    let optionsHTML = Object.keys(currentQuestion.options)
        .map(key => `${key}. ${currentQuestion.options[key]}`)
        .join(' | ');

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");

    botResponse.innerHTML = `
        <strong>Bot:</strong> ${currentQuestion.question}<br>
        ${optionsHTML}
        <br><br>
    `;

    chatContainer.appendChild(botResponse);
}
function scrollChatContainerToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let userResponse = userInput.value.trim().toLowerCase();

    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.innerHTML = `
        <strong>You:</strong> ${userResponse}
        <br><br>
    `;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");

    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML = `
            <strong>Bot:</strong> ${currentQuestion.correctResponse}
            <br><br>
        `;
    } else {
        botResponse.innerHTML = `
            <strong>Bot:</strong> ${currentQuestion.incorrectResponse}
            <br><br>
        `;
    }

    chatContainer.appendChild(botResponse);

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;

    userInput.value = "";

    displayQuestion();
    scrollChatContainerToBottom();
});