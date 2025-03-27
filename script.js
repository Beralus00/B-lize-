document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const restartBtn = document.getElementById("restartBtn");
    const yearElement = document.getElementById("year");

    let squares = Array(9).fill(null);
    let xIsNext = true;

    const renderBoard = () => {
        board.innerHTML = "";
        squares.forEach((value, i) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = value;
            square.addEventListener("click", () => handleClick(i));
            board.appendChild(square);
        });
    };

    const calculateWinner = () => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (squares[i] || calculateWinner()) return;

        squares[i] = xIsNext ? 'X' : 'O';
        xIsNext = !xIsNext;
        updateStatus();
        renderBoard();
    };

    const updateStatus = () => {
        const winner = calculateWinner();
        if (winner) {
            statusText.textContent = `Winner: ${winner}`;
        } else if (squares.every(square => square)) {
            statusText.textContent = "Draw!";
        } else {
            statusText.textContent = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }
    };

    const resetGame = () => {
        squares = Array(9).fill(null);
        xIsNext = true;
        updateStatus();
        renderBoard();
    };

    restartBtn.addEventListener("click", resetGame);
    yearElement.textContent = new Date().getFullYear();

    // Initial render
    updateStatus();
    renderBoard();
});
