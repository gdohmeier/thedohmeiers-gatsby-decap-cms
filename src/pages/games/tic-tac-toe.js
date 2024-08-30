import React from "react";
import Layout from "../../components/Layout";
import {useRef,useEffect} from 'react';

export default function App() {
    const ref = useRef(null);

    function resetBoard() {
        const board = ref.current;
    
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }

        const cells = document.getElementsByClassName('ttt-cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
            cells[i].style.backgroundColor = 'lightgray';
        }
        window.location.reload(false);
    }

    function evaluateBoard() {
        const board = ref.current;

        // Evaluate the board and return a score
        // You can customize the scoring system based on your preference
        // This is a simplified example where X wins = 10, O wins = -10, draw = 0
        if (checkWin(board, 'X')) {
            return 1;
        } if (checkWin(board, 'O')) {
            return -1;
        }
        return 0;
    }

    function checkWin(board, player) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
            }
        }
        return false;
    }

    useEffect(() => {
       const board = ref.current;
       let currentPlayer = "X";
       let gameOver = false;

        // Create the game board cells
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.className = "ttt-cell";
            cell.dataset.index = i;
            board.appendChild(cell);
            cell.addEventListener("click", () => makeMove(cell));
        }

        function makeMove(cell) {
            
            if (!gameOver && !cell.textContent) {
                cell.textContent = currentPlayer;
                checkWinner(currentPlayer);
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                if (currentPlayer === "O" && !gameOver) {
                    setTimeout(computerMove, 500);
                }
            }
        }

        function computerMove() {
            if (!gameOver) {
                const bestMove = findBestMove();
                const chosenCell = document.querySelector(`[data-index="${bestMove.index}"]`);
                makeMove(chosenCell);
            }
        }

        function checkWinner(player) {
            const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                const cells = document.querySelectorAll(".ttt-cell");

                //console.log(cells[a].textContent);

                if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
                    
                    console.log(board.children[a].style.backgroundColor);

                    board.children[a].style.backgroundColor = 'green';
                    board.children[b].style.backgroundColor = 'green';
                    board.children[c].style.backgroundColor = 'green';
                    
                    announceWinner(player);
                    return;
                }
            }

            const isTie = [...document.querySelectorAll(".ttt-cell")].every(cell => cell.textContent !== "");
            if (isTie) {
                announceTie();
            }
        }

        function isMoveLeft(board) {
            return board.includes("");
        }

        function minimax(board, depth, isMaximizingPlayer) {
            if (checkWin(board, "X")) {
                return 10 - depth;
            }
            if (checkWin(board, "O")) {
                return depth - 10;
            }
            if (!isMoveLeft(board)) {
                return 0;
            }

            if (isMaximizingPlayer) {
                let bestScore = -Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === "") {
                        board[i] = "X";
                        bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
                        board[i] = "";
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === "") {
                        board[i] = "O";
                        bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
                        board[i] = "";
                    }
                }
                return bestScore;
            }
        }

        function findBestMove() {
            let bestScore = -Infinity;
            let bestMove = -1;
            const cells = [...document.querySelectorAll(".ttt-cell")];
            const board = cells.map(cell => cell.textContent || "");

            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    const score = minimax(board, 0, false);
                    board[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }

            return { index: bestMove };
        }

        function announceWinner(player) {
            gameOver = true;
            setTimeout(() => alert(`Player ${player} wins!`), 100);
        }

        function announceTie() {
            gameOver = true;
            setTimeout(() => alert("It's a tie!"), 100);
        }


    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="content">
                    <div>
                        <h2>Tic-Tac-Toe</h2>
                        <div ref={ref} class="ttt-board">
                        </div>
                        <button onClick={resetBoard}>Reset</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

