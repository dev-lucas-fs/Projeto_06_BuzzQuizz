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

// **********************************
// Function do Load Quizz
// **********************************
// loadQuizzScreen(quizzTeste);
function loadQuizzScreen(quizzToAnswer) {
  const screenQuizz = document.querySelector(".container-answer-quizz");
  screenQuizz.classList.remove("hide");

  //Show Header Quizz
  screenQuizz.innerHTML = `
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

  console.log(quizzToAnswer.questions);
  boxQuizz = document.querySelector(".box-quizz-questions");
  quizzToAnswer.questions.forEach(loadQuestions);
}

function loadQuestions(question) {
  boxQuizz.innerHTML += `
  <div class="quizz-question">
    <div class="question-header">
      <h3 class="question-title">${question.title}</h3>
    </div>
    <div class="box-question-options">      
    </div>
  </div>
  `;
  const boxOptions = boxQuizz.lastElementChild.querySelector(
    ".box-question-options"
  );
  question.answers.sort(comparador).forEach((option, index) => {
    boxOptions.innerHTML += `
    <div class="question-option" onclick="selectOptionQuestion(this)">
      <img class="option-img" src=${option.image} alt="" />
      <span class="option-text">${option.text}</span>
    </div>
    `;
  });
}

// **********************************
// Action when select a option
// **********************************
function selectOptionQuestion(elementOption) {
  const parentElement = elementOption.parentElement;
  if (parentElement.classList.contains("answered")) {
    return;
  } else {
    parentElement.classList.add("answered");

    const optionsElments = parentElement.querySelectorAll(".question-option");
    console.log(optionsElments[0] === elementOption);
    optionsElments.forEach((element) => {
      if (element !== elementOption) {
        element.classList.add("unselected-option");
      }
    });
    const nextQuestion = parentElement.parentElement.nextElementSibling;
    console.log(nextQuestion);
    idDelayScroll = setInterval(showNextQuestion, 2000, nextQuestion);
  }
}

// Scroll to Next Question After 2s
function showNextQuestion(elementToShow) {
  clearInterval(idDelayScroll);
  console.log(elementToShow);
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
  promessUserOn.then(loadQuizz);
}

function loadQuizz(response) {
  if (response.status === REQ_OK) {
    quizzToAnswer = response.data;
  }
}

// **********************************
// Sketch
// **********************************
//   <div class="quizz-answer">
//     <div class="answer-header">
//       <h3 class="answer-title">
//         <span class="answer-level-score">XX</span>% de acerto:
//         <span class="answer-level-text">Descricao do nivel</span>
//       </h3>
//     </div>
//     <div class="answer-body">
//       <img src="./images/answer.png" alt="" class="answer-img" />
//       <span class="answer-text">
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         Eveniet libero tempora repellendus ea dolore impedit dolores
//         qui aut, pariatur inventore, corrupti iure veritatis eum non
//         aperiam rerum illo architecto similique.
//       </span>
//     </div>
//   </div>

//   <div class="btns-answer-page">
//     <button class="restart-quiz-button buzzquizz-button">
//       Reiniciar Quiz
//     </button>
//     <button class="back-to-home-button">Voltar para home</button>
//   </div>
//
