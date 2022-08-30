const pages = document.querySelectorAll(".BuzzQuizz__Pages .Page");

function createQuizz() {
  pages[0].classList.add("hide");
  pages[1].classList.add("hide");
  pages[2].classList.remove("hide");
}
