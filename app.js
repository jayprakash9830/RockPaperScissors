let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");
let result = document.querySelector("#result p");
let userScore = document.querySelector("#user-score");
let compScore = document.querySelector("#comp-score");
let music = document.querySelector("#background-music");
let userMove = null;
let rockStyle = document.querySelector(".user-style");
let arr = ["rock", "paper", "scissors"];

const userStyle = (add, remove1, remove2) => {
  document.getElementById(remove1).classList.remove("user-style");
  document.getElementById(remove2).classList.remove("user-style");
  document.getElementById(add).classList.add("user-style");
};

rock.addEventListener("click", () => {
  userMove = "rock";
  userStyle(userMove, "paper", "scissors");
  compMove();
});

paper.addEventListener("click", () => {
  userMove = "paper";
  userStyle(userMove, "rock", "scissors");
  compMove();
});

scissors.addEventListener("click", () => {
  userMove = "scissors";
  userStyle(userMove, "paper", "rock");
  compMove();
});

const compStyle = (add, remove1, remove2) => {
  document.getElementById(remove1).classList.remove("computer-style");
  document.getElementById(remove2).classList.remove("computer-style");
  document.getElementById(userMove).classList.add("user-style");
  document.getElementById(add).classList.add("computer-style");
};

const styleImg = (option) => {
  if (option == "rock") {
    compStyle("rock", "paper", "scissors");
  }
  if (option == "paper") {
    compStyle("paper", "rock", "scissors");
  }
  if (option == "scissors") {
    compStyle("scissors", "paper", "rock");
  }
};

const compAnim = () => {
  return new Promise((resolve) => {
    let comp;
    let callLeft = 10;
    const intervalId = setInterval(() => {
      if (callLeft > 0) {
        comp = arr[Math.floor(Math.random() * arr.length)];
        styleImg(comp);
        callLeft--;
      } else {
        clearInterval(intervalId);
        resolve(comp);
      }
    }, 100);
  });
};

const finalResult = (comp) => {
  if (comp === userMove) {
    result.innerText = "It's a Tie";
    result.style.backgroundColor = "#081b31";
    result.style.color = "#fff";
  }
  if (userMove === arr[0] && comp === arr[1]) {
    result.innerText = `You Lost, Paper beats Rock`;
    compScore.innerText = parseInt(compScore.innerText) + 1;
    result.style.backgroundColor = "#f51212";
    result.style.color = "white";
  }
  if (userMove === arr[0] && comp === arr[2]) {
    result.innerText = `You Won, Rock beats Scissors`;
    userScore.innerText = parseInt(userScore.innerText) + 1;
    result.style.backgroundColor = "green";
    result.style.color = "white";
  }

  if (userMove === arr[1] && comp === arr[0]) {
    result.innerText = `You Lost, Scissors beats Paper`;
    compScore.innerText = parseInt(compScore.innerText) + 1;
    result.style.backgroundColor = "#f51212";
    result.style.color = "white";
  }
  if (userMove === arr[1] && comp === arr[2]) {
    result.innerText = `You Won, Paper beats Rock`;
    userScore.innerText = parseInt(userScore.innerText) + 1;
    result.style.backgroundColor = "green";
    result.style.color = "white";
  }

  if (userMove === arr[2] && comp === arr[0]) {
    result.innerText = `You Won, Rock beats Scissor`;
    userScore.innerText = parseInt(userScore.innerText) + 1;
    result.style.backgroundColor = "green";
    result.style.color = "white";
  }
  if (userMove === arr[2] && comp === arr[1]) {
    result.innerText = `You Loss, Paper beats Rock`;
    compScore.innerText = parseInt(compScore.innerText) + 1;
    result.style.backgroundColor = "#f51212";
    result.style.color = "white";
  }
};

const compMove = async () => {
  music.currentTime = 0;
  music.play();
  let comp = await compAnim();
  finalResult(comp);
};
