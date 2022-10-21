// gameboard objet

const GameboardData = (() => {
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return {
        board
    };
})();

// player object

const PlayerData = (inputName, position) => {
    const username = inputName;
    let letter = "";
    let color = "";
    if (position === 0) {
        letter = "X";
        color = "green";
    }
    else {
        letter = "O"
        color = "purple";
    }
    return {
        username,
        letter,
        color
    };
};

// computer object

const ComputerData = (position) => {
    let letter = "";
    if (position === 0) {
        letter = "X";
        color = "green";
    }
    else {
        letter = "O"
        color = "purple";
    }
    return {
        letter,
        color
    };
};

// selectors for items on the page

const inputArea = document.querySelector(".game-start");
const playerNameInput = document.querySelector("#name");
const playGame = document.querySelector(".start");
const tiles = document.querySelectorAll(".tile");
const gameInfo = document.querySelector(".game-info");

playGame.addEventListener("click", initializeGame);

// function that initializes the game

function initializeGame() {
    inputArea.classList.add("hidden");
    let playerName = playerNameInput.value;
    if (playerName === "") {
        playerName = "Player";
    }
    tiles.forEach(tile => {
        tile.addEventListener("click", gameLoop);
    });
    const playerPosition = getRandom(2);
    let computerPosition = 0;
    if (playerPosition === 0) {
        computerPosition = 1;
    }
    window.gameboard = GameboardData;
    window.player = PlayerData(playerName, playerPosition);
    window.computer = ComputerData(computerPosition);
    if (playerPosition === 0) {
        gameInfo.textContent = `${window.player.username} is X!`;
    }
    else {
        gameInfo.textContent = `${window.player.username} is O!`;
    }
    gameInfo.classList.remove("hidden");
    if (computerPosition === 0) {
        computerMove();
    }
}

// handles the basic gameloop of the game

function gameLoop() {
    const playerTile = this.getAttribute("data-key");
    if (isNaN(window.gameboard.board[playerTile]) === true) {
        return;
    }
    this.classList.add(window.player.color);
    this.textContent = window.player.letter;
    window.gameboard.board[playerTile] = window.player.letter;
    const playerVictory = checkVictory();
    if (playerVictory === true) {
        gameOver("Player");
        return;
    }
    const tieCheck = checkTie();
    if (tieCheck === true) {
        gameOver("Tie");
        return;
    }
    computerMove();
    const computerVictory = checkVictory();
    if (computerVictory === true) {
        gameOver("Computer");
        return;
    }
    const secondTieCheck = checkTie();
    if (secondTieCheck === true) {
        gameOver("Tie");
        return;
    }
}


// function that allows the computer to make its move

function computerMove() {

    let selection = undefined;
        while (true) {
            selection = getRandom(9);
            if (isNaN(window.gameboard.board[selection]) === false) {
                break;
            }
    }

    const selectedTile = document.querySelector(`div[data-key="${selection}"]`);
    selectedTile.classList.add(window.computer.color);
    selectedTile.textContent = window.computer.letter;
    window.gameboard.board[selection] = window.computer.letter;   
}

// function that checks for victory

function checkVictory() {
    if (
        (window.gameboard.board[0] === "X" && window.gameboard.board[1] === "X" && window.gameboard.board[2] === "X") ||
        (window.gameboard.board[0] === "O" && window.gameboard.board[1] === "O" && window.gameboard.board[2] === "O") ||
        (window.gameboard.board[3] === "X" && window.gameboard.board[4] === "X" && window.gameboard.board[5] === "X") ||
        (window.gameboard.board[3] === "O" && window.gameboard.board[4] === "O" && window.gameboard.board[5] === "O") ||
        (window.gameboard.board[6] === "X" && window.gameboard.board[7] === "X" && window.gameboard.board[8] === "X") ||
        (window.gameboard.board[6] === "O" && window.gameboard.board[7] === "O" && window.gameboard.board[8] === "O") ||
        (window.gameboard.board[0] === "X" && window.gameboard.board[3] === "X" && window.gameboard.board[6] === "X") ||
        (window.gameboard.board[0] === "O" && window.gameboard.board[3] === "O" && window.gameboard.board[6] === "O") ||
        (window.gameboard.board[1] === "X" && window.gameboard.board[4] === "X" && window.gameboard.board[7] === "X") ||
        (window.gameboard.board[1] === "O" && window.gameboard.board[4] === "O" && window.gameboard.board[7] === "O") ||
        (window.gameboard.board[2] === "X" && window.gameboard.board[5] === "X" && window.gameboard.board[8] === "X") ||
        (window.gameboard.board[2] === "O" && window.gameboard.board[5] === "O" && window.gameboard.board[8] === "O") ||
        (window.gameboard.board[2] === "X" && window.gameboard.board[4] === "X" && window.gameboard.board[6] === "X") ||
        (window.gameboard.board[2] === "O" && window.gameboard.board[4] === "O" && window.gameboard.board[6] === "O") ||
        (window.gameboard.board[0] === "X" && window.gameboard.board[4] === "X" && window.gameboard.board[8] === "X") ||
        (window.gameboard.board[0] === "O" && window.gameboard.board[4] === "O" && window.gameboard.board[8] === "O")
        ){
            return true;
        } 
    else {
        return false;
    }
}

// function to handle checking if there is a tie

function checkTie() {
    let totalNumbers = 0;
    for (let i = 0; i < 8; i++) {
        if (isNaN(window.gameboard.board[i]) === false) {
            totalNumbers++;
        }
    }
    if (totalNumbers === 0) {
        return true;
    }
    else {
        return false;
    }
}

// function that handles displaying who one the match and then resetting everything

function gameOver(winner) {
    if (winner === "Player") {
        gameInfo.textContent = `${window.player.username} Wins!`;
    }
    else if (winner === "Computer") {
        gameInfo.textContent = "Computer Wins!";
    }
    else {
        gameInfo.textContent = "It's a Tie!";
    }
}

// function handles getting random numbers for assigning who goes first and the computers moves

function getRandom(max) {
    return Math.floor(Math.random() * max);
}