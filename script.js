const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Alle mogelijke winnende combinaties
const winningConditions = [
    [0, 1, 2], // horizontale rijen
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // verticale rijen
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonale lijnen
    [2, 4, 6]
];

// Tekst updaten op basis van wie aan de beurt is
function updateStatus() {
    if (gameActive) {
        statusText.innerText = `Speler ${currentPlayer} is aan de beurt`;
        statusText.style.color = currentPlayer === 'X' ? '#00f0ff' : '#ff0055';
    }
}

// Wordt aangeroepen wanneer we op een vakje klikken
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Niet klikken op een al ingevuld vakje, of als de game al klaar is
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update de state en de UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

// Controleren of er iemand heeft gewonnen of gelijk is gespeeld
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `🏆 Speler <strong>${currentPlayer}</strong> heeft gewonnen!`;
        statusText.style.color = currentPlayer === 'X' ? '#00f0ff' : '#ff0055';
        board.classList.add('win-animation');
        gameActive = false;
        return;
    }

    // Kijken of het speelveld vol is zonder winnaar (Gelijkspel)
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusText.innerText = 'Het is gelijkspel! 🤝';
        statusText.style.color = 'white';
        gameActive = false;
        return;
    }

    // Wissel van speler
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Spel resetten
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    updateStatus();

    board.classList.remove('win-animation');

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

// Event listeners toevoegen
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);

// Zet de originele status kleur en tekst op de juiste (speler X starts)
updateStatus();
