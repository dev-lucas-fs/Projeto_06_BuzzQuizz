let quizz_config = {};

const isTitle = (title) => title.length >= 20 && title.length <= 65;
const isUrl = (url) => {
  const regexURL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return regexURL.test(url);
};
const isQuestionNumber = (questionNumber) => questionNumber >= 3;
const isLevelNumber = (levelNumber) => levelNumber >= 2;

const initValidations = {
  title: isTitle,
  image: isUrl,
  questions: isQuestionNumber,
  levels: isLevelNumber,
};

function toggleHideElement(element) {
  element.classList.toggle("hide");
}

function showCreateQuizzQuestions() {
  toggleHideElement(document.querySelector(".quizz-init"));
  toggleHideElement(document.querySelector(".quizz-questions"));

  renderQuestionForms();
}

function setQuizzConfigInitQuizz(elements) {
  quizz_config.image = elements["image"].value;
  quizz_config.levels = Array.from(
    {
      length: Number(elements["levels"].value),
    },
    () => ({
      title: "",
      image: "",
      text: "",
      minValue: 0,
    })
  );
  quizz_config.questions = Array.from(
    {
      length: Number(elements["questions"].value),
    },
    () => ({
      title: "",
      color: "",
      answers: [
        {
          text: "",
          image: "",
          isCorrectAnswer: true,
        },
      ].concat(
        Array.from({ length: 3 }, () => ({
          text: "",
          image: "",
          isCorrectAnswer: false,
        }))
      ),
    })
  );
  quizz_config.title = elements["title"].value;
}

function createInitQuizz(e) {
  e.preventDefault();
  const elements = [...e.target.elements].filter(
    (element) => element.type !== "submit"
  );

  const valid = elements.filter((element) => {
    return !initValidations[element.name](element.value);
  });

  if (valid.length !== 0) return alert("Preencha os dados corretamente");

  setQuizzConfigInitQuizz(e.target.elements);
  showCreateQuizzQuestions();
}

const formInit = document.querySelector("#form-init");

formInit.onsubmit = (e) => {
  createInitQuizz(e);
};

const formQuestion = document.querySelector("#form-question");

const isQuestionText = (text) => text.trim().length >= 20;

const isAnswerText = (text) => text.trim().length > 0;

const isBackgroundColor = (color) => {
  const permittedChars = "0123456789ABCDEFabcdef";
  color = color.trim();
  color = color.split("");
  if (color[0] !== "#") return false;
  if (!(color.length === 7)) return false;
  for (let i = 1; i < color.length; i++)
    if (!permittedChars.includes(color[i])) return false;

  return true;
};

const isCorrectAnswer = (answer) => {
  console.log(answer);
  return isAnswerText(answer.text) && isUrl(answer.image);
};

const isAnswer = (answers) => {
  if (!isCorrectAnswer(answers[0])) return false;
};

const buzzquizzInput = ({ placeholder, type = "text", dataName }) => `
  <input 
    placeholder='${placeholder}'
    class='buzzquizz-input'
    type=${type}
    data-name=${dataName}
    value=''
  />
`;

const questionForm = ({ i }) => `
    <div class='container ${
      i === 1 ? "" : "close"
    }' data-identifier="question-form">
      <div class='container-title'>
        <h1 class='title'>Pergunta ${i}</h1>
        <ion-icon onclick='expandButton(this)' data-identifier="expand" class='icon' name="create-outline"></ion-icon>
      </div>
      <div class='question'>
        ${buzzquizzInput({
          placeholder: "Texto da pergunta",
          dataName: "title",
        })}
        ${buzzquizzInput({
          placeholder: "Cor de fundo da pergunta",
          dataName: "background",
        })}
      </div>
      <div class='answers'>
        <div class='correct'>
          <h1 class='title'>Resposta correta</h1>
          ${buzzquizzInput({
            placeholder: "Resposta correta",
            dataName: "text",
          })}
          ${buzzquizzInput({ placeholder: "URL da imagem", dataName: "image" })}
        </div>
        <div class='incorrect'>
          <h1 class='title'>Resposta incorreta</h1>
          ${buzzquizzInput({
            placeholder: "Resposta incorreta 1",
            dataName: "text",
          })}
          ${buzzquizzInput({
            placeholder: "URL da imagem 1",
            dataName: "image",
          })}
          ${buzzquizzInput({
            placeholder: "Resposta incorreta 2",
            dataName: "text",
          })}
          ${buzzquizzInput({
            placeholder: "URL da imagem 2",
            dataName: "image",
          })}
          ${buzzquizzInput({
            placeholder: "Resposta incorreta 3",
            dataName: "text",
          })}
          ${buzzquizzInput({
            placeholder: "URL da imagem 3",
            dataName: "image",
          })}
        </div>
      </div>
    </div>
`;

function expandButton(e) {
  const parent = e.parentNode.parentNode;
  const form = document.querySelectorAll("#form-question > .container");
  form.forEach((element) => {
    element.classList.add("close");
  });
  parent.classList.remove("close");
  parent.scrollIntoView();
}

function renderQuestionForms() {
  const formQuestion = document.querySelector("#form-question");

  formQuestion.innerHTML = Array.from(
    { length: quizz_config.questions.length },
    (_, i) => questionForm({ i: i + 1 })
  ).join("");

  formQuestion.innerHTML += `
    <button class='buzzquizz-button'>Prosseguir pra criar níveis</button>
  `;
}

function isQuestionForm(questionForm) {
  const question = {};
  const title = questionForm.querySelector('input[data-name="title"]');
  const background = questionForm.querySelector(
    'input[data-name="background"]'
  );
  let answers = {
    texts: questionForm.querySelectorAll('input[data-name="text"]'),
    images: questionForm.querySelectorAll('input[data-name="image"]'),
  };
  answers = Array.from({ length: answers.images.length }, (_, i) => ({
    text: answers.texts[i],
    image: answers.images[i],
  }));

  if (!(isQuestionText(title.value) && isBackgroundColor(background.value)))
    return false;

  question.title = title.value;
  question.color = background.value;

  if (!(isAnswerText(answers[0].text.value) && isUrl(answers[0].image.value)))
    return false;

  let min = 0;

  question.answers = [
    {
      text: answers[0].text.value,
      image: answers[0].image.value,
      isCorrectAnswer: true,
    },
  ];

  for (let i = 1; i < answers.length; i++)
    if (isAnswerText(answers[i].text.value) && isUrl(answers[i].image.value)) {
      min++;
      question.answers.push({
        text: answers[i].text.value,
        image: answers[i].image.value,
        isCorrectAnswer: false,
      });
    }

  if (min < 1) return false;

  return question;
}

function showQuizzLevels() {
  document.querySelectorAll(".container-create-quizz > div").forEach((page) => {
    page.classList.add("hide");
  });
  document.querySelector(".quizz-levels").classList.remove("hide");
  renderLevelsForm();
}

formQuestion.onsubmit = (e) => {
  e.preventDefault();
  const questions = [];
  const questionForms = e.target.querySelectorAll(
    '.container[data-identifier="question-form"]'
  );

  for (let i = 0; i < questionForms.length; i++) {
    const question = isQuestionForm(questionForms[i]);
    if (!question) {
      alert("Preencha os dados corretamente");
      return;
    }
    questions.push(question);
  }
  quizz_config.questions = questions;
  showQuizzLevels();
};

const formLevel = document.querySelector("#form-level");

const buzzquizzTextArea = ({ placeholder, dataName = "" }) => `
  <textarea 
    class='buzzquizz-input' 
    placeholder='${placeholder}'
    data-name='${dataName}'
  ></textarea>
`;

function levelForm({ i }) {
  return `
    <div class='container ${i === 1 ? "" : "close"}'>
      <div class='container-title'>
        <h1 class='title'>Nível ${i}</h1>
        <ion-icon onclick='expandButton(this)' data-identifier="expand" class='icon' name="create-outline"></ion-icon>
      </div>
      ${buzzquizzInput({ placeholder: "Título do nível", dataName: "title" })}
      ${buzzquizzInput({
        placeholder: "% de acerto mínima",
        dataName: "min-value",
      })}
      ${buzzquizzInput({
        placeholder: "URL da imagem do nível",
        dataName: "image",
      })}
      ${buzzquizzTextArea({
        placeholder: "Descrição do nível",
        dataName: "text",
      })}
    </div>
  `;
}

function renderLevelsForm() {
  formLevel.innerHTML = "";
  quizz_config.levels.forEach((level, i) => {
    formLevel.innerHTML += levelForm({ i: i + 1 });
  });
  formLevel.innerHTML += `
    <button class='buzzquizz-button'>Finalizar Quizz</button>
  `;
}

const isLevelTitle = (text) => text.trim().length >= 10;

const isLevelMinValue = (number) => number >= 0 && number <= 100;

const isDescriptionLevel = (text) => text.trim().length >= 30;

function isLevelForm(levelForm) {
  const title = levelForm.querySelector('input[data-name="title"]');
  const image = levelForm.querySelector('input[data-name="image"]');
  const text = levelForm.querySelector('textarea[data-name="text"]');
  const minValue = levelForm.querySelector('input[data-name="min-value"]');
  console.log(title);
  if (
    !(
      isLevelTitle(title.value) &&
      isLevelMinValue(minValue.value) &&
      isDescriptionLevel(text.value) &&
      isUrl(image.value)
    )
  )
    return false;

  return {
    title: title.value,
    image: image.value,
    text: text.value,
    minValue: Number(minValue.value),
  };
}

formLevel.onsubmit = (e) => {
  e.preventDefault();
  let levels = [];
  const inputsContainer = formLevel.querySelectorAll(".container");

  for (let i = 0; i < inputsContainer.length; i++) {
    const level = isLevelForm(inputsContainer[i]);

    if (!level) {
      alert("Preencha os dados corretamente");
      levels = [];
      return;
    }

    levels.push(level);
  }

  const minValues = levels.map(({ minValue }) => minValue);
  const UniqueMinValues = minValues.filter(
    (value, i, array) => array.indexOf(value) === i
  );

  if (minValues.length !== UniqueMinValues.length) {
    alert("Preencha os dados corretamente");
    return;
  }

  if (!minValues.includes(0)) {
    alert("Preencha os dados corretamente");
    return;
  }

  quizz_config.levels = levels;
  createQuizzAPI((res) => {
    const items = localStorage.quizzes ? JSON.parse(localStorage.quizzes) : [];
    items.push(res.data);
    localStorage.setItem("quizzes", JSON.stringify(items));
    showSuccessQuizz();
  });
};

function showSuccessQuizz() {
  document.querySelector(".quizz-levels").classList.add("hide");
  document.querySelector(".quizz-success").classList.remove("hide");
}

function createQuizzAPI(fn) {
  const URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

  axios
    .post(URL, quizz_config)
    .then((res) => {
      fn(res);
    })
    .catch((e) => console.log(e));
}
