function directThirdPage() {
    document.querySelector(".container-quizz-list").classList.add("hide");
    document.querySelector(".container-create-quizz").classList.remove("hide");
}
  
let allQuizzes = {};

function directSecondPage(id) {
    quizzToAnswer = allQuizzes[id];
    loadQuizzScreen();
}

const request = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

request.then(listServerQuizzes);

let userQuizzes;
let userIDs = [];

if (localStorage.length !== 0) {
    userQuizzes = JSON.parse(localStorage.quizzes);
    userIDs = userQuizzes.map((quizz) => {return quizz.id});

    document.querySelector(".no-quizzes").classList.add("hide");
    document.querySelector(".your-quizzes").classList.remove("hide");

    let listUser = "";
    for (let card of userQuizzes) {
        listUser += `<figure onclick="directSecondPage(${card.id})" data-identifier="quizz-card">
                         <img src="${card.image}" alt="Imagem não suportada ou indisponível"/>
                         <figcaption>
                             ${card.title}
                         </figcaption>
                     </figure>`;

        allQuizzes[card.id] = card;
    }
    document.querySelector(".your-quizzes div").innerHTML = listUser;
}

function listServerQuizzes(response) {
    let listAll = "";
    for (let card of response.data) {
        if (!userIDs.includes(card.id)) {
            listAll += `<figure onclick="directSecondPage(${card.id})" data-identifier="quizz-card">
                            <img src="${card.image}" alt="Imagem não suportada ou indisponível"/>
                            <figcaption>
                                ${card.title}
                            </figcaption>
                        </figure>`;

            allQuizzes[card.id] = card;
        }
    }
    document.querySelector(".all-quizzes div").innerHTML = listAll;
}
