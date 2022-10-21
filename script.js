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
    const computerName = "Computer";
    let letter = "";
    if (position === 0) {
        letter = "X";
        color = "green";
    }
    else {
        letter = "O"
        color = "purple";
    }
    const computerTurn = getRandom(9);
    return {
        computerName,
        letter,
        color,
        computerTurn
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

async function initializeGame() {
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
    await sleep(2000);
    gameInfo.classList.add("hidden");
    if (computerPosition === 0) {
        computerFirstTurn();
    }
}

// handles the basic gameloop of the game

function gameLoop() {
    console.log(window.gameboard.board);
}


// function handles getting random numbers for assigning who goes first and the computers moves

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

// function that allows the computer to make its first move

function computerFirstTurn() {
    const selection = window.computer.computerTurn;
    const selectedTile = document.querySelector(`div[data-key="${selection}"]`);
    selectedTile.textContent = window.computer.letter;
    selectedTile.classList.add(window.computer.color);
    window.gameboard.board[selection] = window.computer.letter;    
}

// function to have the program sleep

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}