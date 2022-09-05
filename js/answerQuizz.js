// For Randomizer
function comparador() {
  return Math.random() - 0.5;
}

// **********************************
// Global Variables
// **********************************
let idDelayScroll = 0;
let flagScroll = false;

let boxQuizz;
let correctQuizzAnswers = [];
let numberOfQuestions = 0;
let numberOfQuestionsAnswered = 0;
let scoreQuizz = 0;
let quizzToAnswer = 0;

// **********************************
// RENDER SCREEN QUIZZ FUNCTIONS:
// **********************************
// Function to Quizz Page
// **********************************
function loadQuizzScreen() {
  // Set global variables to default
  correctQuizzAnswers = [];
  numberOfQuestions = quizzToAnswer.questions.length;
  numberOfQuestionsAnswered = 0;
  scoreQuizz = 0;

  // Show quizz screen unrendered
  const screenQuizz = document.querySelector(".container-answer-quizz");
  screenQuizz.classList.remove("hide");

  // Hide another screens
  const screenList = document.querySelector(".container-quizz-list");
  screenList.classList.add("hide");
  const screenCreate = document.querySelector(".container-create-quizz");
  screenCreate.classList.add("hide");

  //Render Header Quizz
  renderQuizzHeader(screenQuizz);

  // Render Questions
  boxQuizz = document.querySelector(".box-quizz-questions");
  quizzToAnswer.questions.forEach(renderQuestions);
  preLoadResult();
}

// **********************************
// Function to render Quizz HEADER
// **********************************
function renderQuizzHeader(screenQuizzElement) {
  screenQuizzElement.innerHTML = `
  <div class="quizz-header" id="quizz-header">
    <h2 class="quizz-title">${quizzToAnswer.title}</h2>
  </div>
  <section class="box-quizz-questions">
  </section>
  `;

  // Header Quizz background properties
  const imgBackground = document.getElementById("quizz-header");
  imgBackground.style.background = `linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizzToAnswer.image})`;
  imgBackground.style.backgroundRepeat = "no-repeat";
  imgBackground.style.backgroundAttachment = "scroll";
  imgBackground.style.backgroundSize = "cover";
  imgBackground.style.backgroundPosition = "center";

  // Scroll to page header
  screenQuizzElement.firstElementChild.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// **********************************
// Function to render Quizz QUESTIONS
// **********************************
function renderQuestions(question, questionNumber) {
  // Render Question Header
  boxQuizz.innerHTML += `
  <div class="quizz-question unanswered-question">
    <div class="question-header "
    style="background-color: ${question.color};">
      <h3 class="question-title" data-identifier="question">${question.title}</h3>
    </div>
    <div class="box-question-options">      
    </div>
  </div>
  `;

  const correctQuestionAnswers = [];
  // Render Question Options
  const boxOptions = boxQuizz.lastElementChild.querySelector(
    ".box-question-options"
  );
  question.answers.sort(comparador).forEach((option, optionNumber) => {
    boxOptions.innerHTML += `
    <div class="question-option ${questionNumber} " onclick="selectOptionQuestion(this)" data-identifier="answer">
      <img class="option-img" src=${option.image} alt="Imagem não suportada ou indisponível" />
      <span class="option-text">${option.text}</span>
    </div>
    `;
    if (option.isCorrectAnswer) {
      correctQuestionAnswers.push(optionNumber);
    }
  });
  // Update array of correct answers
  correctQuizzAnswers.push(correctQuestionAnswers);
}

// **********************************
// Function pre load HTML Result
// **********************************
function preLoadResult() {
  boxQuizz.innerHTML += `
  <div class="box-answer hide">
    <div class="quizz-answer">
      <div class="answer-header">
        <h3 class="answer-title">
        </h3>
      </div>
      <div class="answer-body">
        <img src="" alt="Imagem não suportada ou indisponível" class="answer-img" />
        <span class="answer-text">
        </span>
      </div>
    </div>

    <div class="button-group">
      <button onclick="loadQuizzScreen()" class="buzzquizz-button btn-restart">Reiniciar Quizz</button>
      <button onclick="backToHome()" class="buzzquizz-link">Voltar pra home</button>
    </div>
  </div>
  `;
}

// **********************************
// Function to render RESULT after complete quizz
// **********************************
function renderResult() {
  let userLevel = 0;

  quizzToAnswer.levels.forEach((level, index) => {
    if (scoreQuizz >= level.minValue) {
      userLevel = index;
    }
  });

  document.querySelector(".answer-title").innerHTML = `
    <span class="answer-level-score" data-identifier="quizz-result">${scoreQuizz}</span>% de acerto:
    <span class="answer-level-text">${quizzToAnswer.levels[userLevel].title}</span>  
    `;
  document.querySelector(".answer-img").src =
    quizzToAnswer.levels[userLevel].image;
  document.querySelector(".answer-text").innerHTML =
    quizzToAnswer.levels[userLevel].text;
}

// **********************************
// USER`S ACTIONS FUNCTIONS:
// **********************************
// Action when User select a option
// **********************************
function selectOptionQuestion(elementOption) {
  const boxOptions = elementOption.parentElement;
  const elementQuestion = boxOptions.parentElement;

  // Reset auto scroll: Disable auto-scroll if user click before automatic Scroll.
  if (flagScroll) {
    flagScroll = false;
    clearInterval(idDelayScroll);
  }

  // Allow only one attempt fo question
  if (elementQuestion.classList.contains("answered-question")) {
    return;
  } else {
    elementQuestion.classList.remove("unanswered-question");
    elementQuestion.classList.add("answered-question");
    numberOfQuestionsAnswered++;

    // Get the question of the selected option
    let questionSelected;
    for (let i = 0; i < numberOfQuestions; i++) {
      if (elementOption.classList.contains(i)) {
        questionSelected = i;
        break;
      }
    }

    // Check question correction
    const optionsElements = boxOptions.querySelectorAll(".question-option");
    optionsElements.forEach((element, optionNumber) => {
      // Show correct and wrong answer
      if (correctQuizzAnswers[questionSelected].includes(optionNumber)) {
        element.classList.add("right-option");
        if (element === elementOption) {
          scoreQuizz++;
        }
      } else {
        element.classList.add("wrong-option");
      }

      // Apply opactity in inselected option
      if (element !== elementOption) {
        element.classList.add("unselected-option");
      }
    });

    let elementToScroll;

    // Check if Quizz is complete
    if (numberOfQuestionsAnswered === numberOfQuestions) {
      scoreQuizz = Math.round((scoreQuizz / numberOfQuestions) * 100);
      // Show Result
      renderResult();
      const elementResult = document.querySelector(".box-answer");
      elementResult.classList.remove("hide");

      // Scroll to result box
      elementToScroll = elementResult;
    } else {
      // Scroll to firt unanswered-question
      elementToScroll = document.querySelector(".unanswered-question");
    }
    idDelayScroll = setInterval(showNextQuestion, 2000, elementToScroll);
    flagScroll = true;
  }
}

// Scroll to Next Question After 2s
function showNextQuestion(elementToShow) {
  elementToShow.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  flagScroll = false;
  clearInterval(idDelayScroll);
}
