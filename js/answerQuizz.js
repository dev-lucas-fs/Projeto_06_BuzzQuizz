let quizzTeste = {
  id: 10640,
  title: "Quiz - Doutor Pet 🐶🐶",
  image:
    "https://c4.wallpaperflare.com/wallpaper/935/641/266/lindo-cachorro-wallpaper-preview.jpg",
  questions: [
    {
      title: "Qual o dogginho mais fofo?",
      color: "#0000ff",
      answers: [
        {
          text: "Bichon Frisé",
          image:
            "https://www.animalsforsale.com.br/components/com_djclassifieds/images/item/3261_3261_bichon-frise-3_thb_thb.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Poodle",
          image:
            "https://tocadobichomaringa.com.br/wp-content/uploads/2021/10/poodle-branco.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Qual o cachorro mais perigoso? 😳",
      color: "#ff0000",
      answers: [
        {
          text: "Pinscher 😡🤬😡",
          image:
            "https://cobasi.vteximg.com.br/arquivos/ids/265361/Pinscher.jpg?v=637021869369770000",
          isCorrectAnswer: true,
        },
        {
          text: "Pitbull 😎😎🥰",
          image:
            "https://cachorrosincriveis.com.br/wp-content/uploads/2018/06/pitbull-2.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Você gosta de cachorro??",
      color: "#00ff00",
      answers: [
        {
          text: "SIMM 😍😍🥰",
          image: "https://images6.alphacoders.com/678/thumb-1920-678636.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "NÃO, EU SOU CHTAO(A)!",
          image:
            "https://img.estadao.com.br/thumbs/640/resources/jpg/5/0/1522880008605.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Pet iniciante",
      image:
        "https://i.pinimg.com/originals/7c/11/11/7c11116ca0d263e3afb597a791be0a82.jpg",
      text: "Você precisa aprofundar mais seus conhecimentos sobre pets!",
      minValue: 0,
    },
    {
      title: "Doutor Pet",
      image:
        "https://wl-incrivel.cf.tsp.li/resize/728x/jpg/f4e/43b/69a8a856e89a899cdad228af45.jpg",
      text: "Parabéns! Os pets te amam! Você possui profundos conhecimentos sobre pets!",
      minValue: 100,
    },
  ],
};

// Randomizer
function comparador() {
  return Math.random() - 0.5;
}

let idDelayScroll = 0;

let boxQuizz;

let correctQuizzAnswers = [];
let numberOfQuestions = 0;
let numberOfQuestionsAnswered = 0;
let scoreQuizz = 0;
let quizzToAnswer = quizzTeste;

// **********************************
// Function do Load Quizz
// **********************************
// loadQuizzScreen();
function loadQuizzScreen() {
  console.log("Executando funcao loadQuizzScreen");
  const screenQuizz = document.querySelector(".container-answer-quizz");
  screenQuizz.classList.remove("hide");

  const screenList = document.querySelector(".container-list-quizzes");
  screenList.classList.add("hide");

  const screenCreate = document.querySelector(".container-create-quizz");
  screenCreate.classList.add("hide");

  //Show Header Quizz
  screenQuizz.innerHTML = `
  <div class="quizz-header" id="quizz-header">
    <h2 class="quizz-title">${quizzToAnswer.title}</h2>
  </div>
  <section class="box-quizz-questions">
  </section>
  `;

  // Scroll to page header
  screenQuizz.firstElementChild.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Header Quizz background properties
  const imgBackground = document.getElementById("quizz-header");
  imgBackground.style.background = `linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizzToAnswer.image})`;
  imgBackground.style.backgroundRepeat = "no-repeat";
  imgBackground.style.backgroundAttachment = "scroll";
  imgBackground.style.backgroundSize = "cover";
  imgBackground.style.backgroundPosition = "center";

  // console.log(quizzToAnswer.questions);
  boxQuizz = document.querySelector(".box-quizz-questions");

  // Set global variables to default
  correctQuizzAnswers = [];
  numberOfQuestions = quizzToAnswer.questions.length;
  numberOfQuestionsAnswered = 0;
  scoreQuizz = 0;

  // Render Question
  quizzToAnswer.questions.forEach(loadQuestions);

  // Change Questions headers background color
  const questionHeaders = document.querySelectorAll(".question-header");
  questionHeaders.forEach((elementHeader, headerNumber) => {
    elementHeader.style.backgroundColor =
      quizzToAnswer.questions[headerNumber].color;
  });

  // console.log(correctQuizzAnswers);
  loadResult();
}

function loadQuestions(question, questionNumber) {
  boxQuizz.innerHTML += `
  <div class="quizz-question">
    <div class="question-header question-${questionNumber}">
      <h3 class="question-title">${question.title}</h3>
    </div>
    <div class="box-question-options">      
    </div>
  </div>
  `;

  const boxOptions = boxQuizz.lastElementChild.querySelector(
    ".box-question-options"
  );

  const correctQuestionAnswers = [];
  question.answers.sort(comparador).forEach((option, optionNumber) => {
    boxOptions.innerHTML += `
    <div class="question-option ${questionNumber} option-${optionNumber}" onclick="selectOptionQuestion(this)">
      <img class="option-img" src=${option.image} alt="" />
      <span class="option-text">${option.text}</span>
    </div>
    `;
    if (option.isCorrectAnswer) {
      correctQuestionAnswers.push(optionNumber);
    }
  });
  correctQuizzAnswers.push(correctQuestionAnswers);
}

function loadResult() {
  boxQuizz.innerHTML += `
  <div class="box-answer hide">
    <div class="quizz-answer">
      <div class="answer-header">
        <h3 class="answer-title">
        </h3>
      </div>
      <div class="answer-body">
        <img src="" alt="" class="answer-img" />
        <span class="answer-text">
        </span>
      </div>
    </div>

    <div class="btns-answer-page">
      <button class="restart-quiz-button buzzquizz-button" onclick="loadQuizzScreen()">
        Reiniciar Quiz
      </button>
      <button class="back-to-home-button" onclick="loadHomeScreen()">Voltar para home</button>
    </div>
  </div>
  `;
}

function loadHomeScreen() {
  console.log("Executando funcao loadQuizzScreen");
  const screenList = document.querySelector(".container-list-quizzes");
  screenList.classList.remove("hide");

  const screenQuizz = document.querySelector(".container-answer-quizz");
  screenQuizz.classList.add("hide");

  const screenCreate = document.querySelector(".container-create-quizz");
  screenCreate.classList.add("hide");
}

// **********************************
// Action when select a option
// **********************************
function selectOptionQuestion(elementOption) {
  const parentElement = elementOption.parentElement;
  // Allow only one attempt
  if (parentElement.classList.contains("answered")) {
    return;
  } else {
    parentElement.classList.add("answered");
    numberOfQuestionsAnswered++;

    // Get the question of the selected option
    let questionSelected;
    for (let i = 0; i < numberOfQuestions; i++) {
      if (elementOption.classList.contains(i)) {
        questionSelected = i;
        break;
      }
    }
    // console.log(questionSelected);

    const optionsElements = parentElement.querySelectorAll(".question-option");
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

    if (numberOfQuestionsAnswered === numberOfQuestions) {
      scoreQuizz = Math.round((scoreQuizz / numberOfQuestions) * 100);
      refreshResult();
      document.querySelector(".box-answer").classList.remove("hide");
    }

    // console.log(scoreQuizz);
    const nextQuestion = parentElement.parentElement.nextElementSibling;
    // console.log(nextQuestion);
    idDelayScroll = setInterval(showNextQuestion, 2000, nextQuestion);
  }
}

function refreshResult() {
  let userLevel = 0;

  // console.log(quizzToAnswer.levels[0].minValue);
  quizzToAnswer.levels.forEach((level, index) => {
    if (scoreQuizz >= level.minValue) {
      userLevel = index;
      // console.log(level.minValue);
    }
  });

  document.querySelector(".answer-title").innerHTML = `
    <span class="answer-level-score">${scoreQuizz}</span>% de acerto:
    <span class="answer-level-text">${quizzToAnswer.levels[userLevel].title}</span>  
    `;
  document.querySelector(".answer-img").src =
    quizzToAnswer.levels[userLevel].image;
  document.querySelector(".answer-text").innerHTML =
    quizzToAnswer.levels[userLevel].text;
}

// Scroll to Next Question After 2s
function showNextQuestion(elementToShow) {
  clearInterval(idDelayScroll);
  // console.log(elementToShow);
  elementToShow.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// **********************************
// API GET
// **********************************
const URL_QUIZZ =
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/10637";
const REQ_OK = 200;

function getOneQuizz(URL_QUIZZ) {
  const promessGetQuizz = axios.get(URL_QUIZZ);
  promessGetQuizz.then(loadQuizz);
}

function loadQuizz(response) {
  if (response.status === REQ_OK) {
    quizzToAnswer = response.data;
    loadQuizzScreen();
  }
}
