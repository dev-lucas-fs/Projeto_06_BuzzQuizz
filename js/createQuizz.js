const quizz_config = {
  question: 0,
  title: "",
  level: 0,
  image_url: "",
};

const isTitle = (title) => title.length >= 20 && title.length <= 65;
const isUrl = (url) => {
  const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  return regexURL.test(url)
}
const isQuestionNumber = (questionNumber) => questionNumber >= 3;
const isLevelNumber = (levelNumber) => levelNumber >= 2;

const initValidations = {
  "title": isTitle,
  "image_url": isUrl,
  "question": isQuestionNumber,
  "level": isLevelNumber,
};

function toggleHideElement(element) {
  element.classList.toggle("hide");
}

function showCreateQuizzQuestions() {
  toggleHideElement(document.querySelector(".quizz-init"));
  toggleHideElement(document.querySelector(".quizz-questions"));
}

function createInitQuizz(e) {
  e.preventDefault();
  const elements = [...e.target.elements].filter(
    (element) => element.type !== "submit"
  );

  const valid = elements.filter((element) => {
    return !initValidations[element.name](element.value)
  });

  if (valid.length !== 0)
    return alert("Preencha os dados corretamente");

  elements.forEach((element) => (quizz_config[element.name] = element.value));

  showCreateQuizzQuestions();
}

const formInit = document.querySelector("#form-init");

formInit.onsubmit = (e) => {
  createInitQuizz(e);
};
