//tracking scores
let playerScore = 0;
let computerScore = 0;

//dom elements
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const modal = document.getElementById("gameOverModal");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainBtn = document.getElementById("playAgainBtn");

const buttons = {
  MACE: document.getElementById("btnMace"),
  SWORD: document.getElementById("btnSword"),
  AXE: document.getElementById("btnAxe"),
};

//img paths
const imagePaths = {
  MACE: "mace.png",
  SWORD: "sword.png",
  AXE: "axe.png",
};

//game logic
const rules = {
  MACE: { beats: "SWORD", losesTo: "AXE" },
  AXE: { beats: "MACE", losesTo: "SWORD" },
  SWORD: { beats: "AXE", losesTo: "MACE" },
};

//button click handler
Object.entries(buttons).forEach(([choice, button]) => {
  button.addEventListener("click", () => handlePlayerChoice(choice));
});

function handlePlayerChoice(playerChoice) {
  if (playerScore >= 5 || computerScore >= 5) modal.style.display = "flex";
  const computerChoice = getRandomChoice();

  //update displayed imgs
  playerSign.innerHTML = `<img class="item_img" src="${imagePaths[playerChoice]}" alt="${playerChoice}">`;
  computerSign.innerHTML = `<img class="item_img" src="${imagePaths[computerChoice]}" alt="${computerChoice}">`;

  //determine winner
  if (playerChoice === computerChoice) {
    playerScore++;
    computerScore++;
  } else if (rules[playerChoice].beats === computerChoice) {
    playerScore++;
  } else {
    computerScore++;
  }

  //update scores
  updateScoreText();

  //check for game over
  if (playerScore >= 5 || computerScore >= 5) {
    setTimeout(() => {
      const winner =
        playerScore > computerScore
          ? "You won!"
          : playerScore < computerScore
          ? "Computer won!"
          : "It's a tie!";
      winnerMessage.textContent = `Game Over! ${winner}`;
      modal.style.display = "flex";
    }, 200);
  }
}

function getRandomChoice() {
  const choices = ["MACE", "SWORD", "AXE"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScoreText() {
  playerScoreText.textContent = `Player: ${playerScore}`;
  computerScoreText.textContent = `Computer: ${computerScore}`;
}

playAgainBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScoreText();
  playerSign.innerHTML = "?";
  computerSign.innerHTML = "?";
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
