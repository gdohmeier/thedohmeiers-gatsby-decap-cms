---
templateKey: blog-post
title: A game of tic-tac-toe
date: 2024-07-13T14:44:00.000Z
description: A simple tic-tac-toe game with javascript.
featuredpost: true
featuredimage: /img/tic-tac-toe1.jpeg
tags:
  - game
  - fun
---
![tic-tac-toe](/img/tic-tac-toe1.jpeg "A game of tic-tac-toe")

# tic-tac-toe

In this post I implement a simple tic-tac-toe game with javascript that can be played within the page of the post...

8/11/23 - I have updated the code with simple ai to pick best move to make the game more difficult.

Repost to new site.

```javascript
  <html lang="en">
      <head>
          <title>Tic-Tac-Toe</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
              }

              h1 {
                  margin-top: 30px;
              }

              .board {
                  display: grid;
                  grid-template-columns: repeat(3, 100px);
                  grid-template-rows: repeat(3, 100px);
                  gap: 5px;
                  margin-top: 30px;
              }

              .cell {
                  width: 100px;
                  height: 100px;
                  background-color: lightgray;
                  border: 1px solid #000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 36px;
                  cursor: pointer;
              }

              button {
                  margin-top: 20px;
                  font-size: 16px;
                  cursor: pointer;
              }
          </style>
      </head>
      <body>
          <h1>Tic-Tac-Toe</h1>
          <div id="board" class="board">
          <!-- The board will be populated dynamically -->
          </div>
          <button onclick="resetBoard()">Reset</button>
          <script>

              const board = document.getElementById("board");
              let currentPlayer = "X";
              let gameOver = false;

              // Create the game board cells
              for (let i = 0; i < 9; i++) {
                  const cell = document.createElement("div");
                  cell.className = "cell";
                  cell.dataset.index = i;
                  board.appendChild(cell);
                  cell.addEventListener("click", ()=>makeMove(cell));
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

              function evaluateBoard(board) {
                  // Evaluate the board and return a score
                  // You can customize the scoring system based on your preference
                  // This is a simplified example where X wins = 10, O wins = -10, draw = 0
                  if (checkWin(board, "X")) {
                      return 10;
                  } else if (checkWin(board, "O")) {
                      return -10;
                  }
                  return 0;
              }

              function checkWin(board, player) {
                  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                  [0, 4, 8], [2, 4, 6]// Diagonals
                  ];

                  for (const combo of winningCombos) {
                      const [a,b,c] = combo;
                      if (board[a] === player && board[b] === player && board[c] === player) {
                          return true;
                      }
                  }
                  return false;
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
                  const cells = [...document.querySelectorAll(".cell")];
                  const board = cells.map(cell=>cell.textContent || "");

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

                  return {
                      index: bestMove
                  };
              }

              function checkWinner(player) {
                  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                  [0, 4, 8], [2, 4, 6]// Diagonals
                  ];

                  for (const combo of winningCombos) {
                      const [a,b,c] = combo;
                      const cells = document.querySelectorAll(".cell");
                      if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {

                          document.getElementById('board').children[a].style.backgroundColor = 'green';
                          document.getElementById('board').children[b].style.backgroundColor = 'green';
                          document.getElementById('board').children[c].style.backgroundColor = 'green';

                          announceWinner(player);
                          return;
                      }
                  }

                  const isTie = [...document.querySelectorAll(".cell")].every(cell=>cell.textContent !== "");
                  if (isTie) {
                      announceTie();
                  }
              }

              function announceWinner(player) {
                  gameOver = true;
                  setTimeout(()=>alert(`Player ${player} wins!`), 100);
              }

              function announceTie() {
                  gameOver = true;
                  setTimeout(()=>alert("It's a tie!"), 100);
              }

              function resetBoard() {
                  currentPlayer = "X";
                  gameOver = false;

                  for (let i = 0; i < board.length; i++) {
                      board[i] = "";
                  }

                  const cells = document.getElementsByClassName('cell');
                  for (let i = 0; i < cells.length; i++) {
                      cells[i].innerText = '';
                      cells[i].style.backgroundColor = 'lightgray';
                  }
              }
          </script>
      </body>
  </html>
```

``
