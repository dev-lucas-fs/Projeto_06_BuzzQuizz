let id = 0;

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
    id = setInterval(showNextQuestion, 2000, nextQuestion);
  }
}

function showNextQuestion(elementToShow) {
  clearInterval(id);
  console.log(elementToShow);
  elementToShow.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
