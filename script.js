// script.js

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const progressContainer = document.createElement('div');
    progressContainer.id = 'progress-container';
    document.querySelector('.container').insertBefore(progressContainer, quizContainer);

    const questions = [
        {
            question: "Who was the first Prime minister of canada?",
            options: ["George Washington", "liaquat Ali Khan", "John A. Macdonald", "None"],
            answer: "John A. Macdonald"
        },
        {
            question: "In which year did the Titanic sink?",
            options: ["1912", "1905", "1898", "1923"],
            answer: "1912"
        },
        {
            question: "who gave this quiz?",
            options: ["Prof. Gabriel", "John Adams", "Judy", "Thomas"],
            answer: "Prof. Gabriel"
        },
        {
            question: "Humber college was founded in...",
            options: ["1970", "1990", "1967", "200"],
            answer: "1967"

        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // Fake authentication
    const isAuthenticated = true;

    if (isAuthenticated) {
        loadQuestion();
    } else {
        quizContainer.innerHTML = "<p>You need to be authenticated to take this quiz.</p>";
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            progressContainer.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            quizContainer.innerHTML = `
                <div class="question">
                    <h2>${question.question}</h2>
                    ${question.options.map(option => `<button class="option">${option}</button>`).join('')}
                </div>
            `;
            document.querySelectorAll('.option').forEach(button => {
                button.addEventListener('click', () => checkAnswer(button));
            });
        } else {
            displayResult();
        }
    }

    function checkAnswer(button) {
        const selectedAnswer = button.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('incorrect');
        }
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    }

    function displayResult() {
        quizContainer.innerHTML = "";
        resultContainer.innerHTML = `<p>Your score is ${score} out of ${questions.length}</p>`;
    }
});
