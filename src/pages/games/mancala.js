// src/pages/Mancala.jsx    (or wherever you place game pages)

import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/Layout";   // ← assuming you have this

export default function Mancala() {
    const boardRef = useRef(null);
    const [message, setMessage] = useState("Click on your pits to start playing!");
    const [playerTurn, setPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    // Game data – stored as plain objects (not useState, like your tic-tac-toe)
    const game = useRef({
        playerPits: [4,4,4,4,4,4],
        computerPits: [4,4,4,4,4,4],
        playerBank: 0,
        computerBank: 0,
    });

    function resetGame() {
        game.current = {
            playerPits: [4,4,4,4,4,4],
            computerPits: [4,4,4,4,4,4],
            playerBank: 0,
            computerBank: 0,
        };
        setPlayerTurn(true);
        setGameOver(false);
        setMessage("Click on your pits to start playing!");

        // Re-render board
        renderBoard();
    }

    function renderBoard() {
        if (!boardRef.current) return;

        const container = boardRef.current;
        container.innerHTML = ''; // clear

        // Computer bank (right)
        const compBank = document.createElement('div');
        compBank.className = 'bank bank-computer';
        compBank.innerHTML = `<div class="bank-value">${game.current.computerBank}</div><span>Computer</span>`;
        container.appendChild(compBank);

        // Computer pits (top row – visually reversed)
        const topRow = document.createElement('div');
        topRow.className = 'pits-row top';
        for (let i = 5; i >= 0; i--) {
            const pit = document.createElement('div');
            pit.className = 'pit computer-pit';
            pit.dataset.index = i;
            pit.textContent = game.current.computerPits[i];
            topRow.appendChild(pit);
        }
        container.appendChild(topRow);

        // Player pits (bottom row)
        const bottomRow = document.createElement('div');
        bottomRow.className = 'pits-row bottom';
        for (let i = 0; i < 6; i++) {
            const pit = document.createElement('div');
            pit.className = 'pit player-pit';
            pit.dataset.index = i;
            pit.textContent = game.current.playerPits[i];
            if (!gameOver && playerTurn && game.current.playerPits[i] > 0) {
                pit.classList.add('clickable');
                pit.addEventListener('click', () => playerMove(i));
            }
            bottomRow.appendChild(pit);
        }
        container.appendChild(bottomRow);

        // Player bank (left)
        const playerBankEl = document.createElement('div');
        playerBankEl.className = 'bank bank-player';
        playerBankEl.innerHTML = `<div class="bank-value">${game.current.playerBank}</div><span>Player</span>`;
        container.appendChild(playerBankEl);

        // Turn indicator
        const turnEl = document.createElement('div');
        turnEl.className = 'turn-indicator';
        turnEl.textContent = playerTurn ? "Your Turn" : "Computer's Turn";
        container.appendChild(turnEl);
    }

    function updateBoard() {
        if (!boardRef.current) return;

        // Update pit numbers
        const playerPits = boardRef.current.querySelectorAll('.player-pit');
        const compPits   = boardRef.current.querySelectorAll('.computer-pit');

        for (let i = 0; i < 6; i++) {
            playerPits[i].textContent = game.current.playerPits[i];
            compPits[5 - i].textContent = game.current.computerPits[i]; // reversed
        }

        // Update banks
        boardRef.current.querySelector('.bank-player .bank-value').textContent = game.current.playerBank;
        boardRef.current.querySelector('.bank-computer .bank-value').textContent = game.current.computerBank;

        // Update turn
        boardRef.current.querySelector('.turn-indicator').textContent =
            playerTurn ? "Your Turn" : "Computer's Turn";

        // Re-attach listeners only when it's player's turn
        const pits = boardRef.current.querySelectorAll('.player-pit');
        pits.forEach(pit => {
            pit.classList.remove('clickable');
            pit.onclick = null;
        });

        if (!gameOver && playerTurn) {
            pits.forEach(pit => {
                const idx = parseInt(pit.dataset.index);
                if (game.current.playerPits[idx] > 0) {
                    pit.classList.add('clickable');
                    pit.onclick = () => playerMove(idx);
                }
            });
        }
    }

    function playerMove(pitIndex) {
        if (gameOver || !playerTurn || game.current.playerPits[pitIndex] === 0) return;

        let stones = game.current.playerPits[pitIndex];
        game.current.playerPits[pitIndex] = 0;

        let pos = pitIndex;
        let lastWasBank = false;

        while (stones > 0) {
            pos++;
            if (pos < 6) {
                game.current.playerPits[pos]++;
                stones--;
            } else if (pos === 6) {
                game.current.playerBank++;
                stones--;
                lastWasBank = true;
                if (stones === 0) {
                    setMessage("Another turn!");
                    updateBoard();
                    return;
                }
            } else if (pos < 13) {
                const compIdx = pos - 7;
                if (compIdx < 6) {
                    game.current.computerPits[compIdx]++;
                    stones--;
                }
            } else {
                pos = -1;
            }
        }

        // Capture
        if (!lastWasBank && pos < 6 && game.current.playerPits[pos] === 1) {
            const opp = 5 - pos;
            if (game.current.computerPits[opp] > 0) {
                game.current.playerBank += game.current.computerPits[opp] + 1;
                game.current.computerPits[opp] = 0;
                game.current.playerPits[pos] = 0;
                setMessage(`Captured ${game.current.computerPits[opp] + 1} stones!`);
            }
        }

        checkGameEnd();

        if (!gameOver) {
            if (!lastWasBank) {
                setPlayerTurn(false);
                setMessage("Computer thinking...");
                setTimeout(computerMove, 800);
            } else {
                setMessage("Your turn again!");
            }
        }

        updateBoard();
    }

    function computerMove() {
        if (gameOver || playerTurn) return;

        // Very simple random move for now (you can paste better AI later)
        let valid = [];
        for (let i = 0; i < 6; i++) {
            if (game.current.computerPits[i] > 0) valid.push(i);
        }
        if (valid.length === 0) return;

        const idx = valid[Math.floor(Math.random() * valid.length)];
        let stones = game.current.computerPits[idx];
        game.current.computerPits[idx] = 0;

        let pos = idx;
        let lastWasBank = false;

        while (stones > 0) {
            pos++;
            if (pos < 6) {
                game.current.computerPits[pos]++;
                stones--;
            } else if (pos === 6) {
                game.current.computerBank++;
                stones--;
                lastWasBank = true;
                if (stones === 0) {
                    setMessage("Computer takes another turn");
                    updateBoard();
                    setTimeout(computerMove, 800);
                    return;
                }
            } else if (pos < 13) {
                const pIdx = pos - 7;
                if (pIdx < 6) {
                    game.current.playerPits[pIdx]++;
                    stones--;
                }
            } else {
                pos = -1;
            }
        }

        // Capture (symmetric)
        if (!lastWasBank && pos < 6 && game.current.computerPits[pos] === 1) {
            const opp = 5 - pos;
            if (game.current.playerPits[opp] > 0) {
                game.current.computerBank += game.current.playerPits[opp] + 1;
                game.current.playerPits[opp] = 0;
                game.current.computerPits[pos] = 0;
                setMessage(`Computer captured ${game.current.playerPits[opp] + 1} stones`);
            }
        }

        checkGameEnd();

        if (!gameOver) {
            if (!lastWasBank) {
                setPlayerTurn(true);
                setMessage("Your turn!");
            } else {
                setMessage("Computer plays again...");
                setTimeout(computerMove, 800);
            }
        }

        updateBoard();
    }

    function checkGameEnd() {
        const pHas = game.current.playerPits.some(v => v > 0);
        const cHas = game.current.computerPits.some(v => v > 0);

        if (!pHas || !cHas) {
            setGameOver(true);

            // Collect remaining stones
            game.current.playerBank += game.current.playerPits.reduce((a,b)=>a+b,0);
            game.current.computerBank += game.current.computerPits.reduce((a,b)=>a+b,0);
            game.current.playerPits.fill(0);
            game.current.computerPits.fill(0);

            const p = game.current.playerBank;
            const c = game.current.computerBank;

            if (p > c)      setMessage(`You win! ${p}–${c}`);
            else if (p < c) setMessage(`Computer wins ${c}–${p}`);
            else            setMessage(`Tie! ${p}–${p}`);
        }
    }

    useEffect(() => {
        renderBoard();

        // Optional: cleanup
        return () => {
            if (boardRef.current) boardRef.current.innerHTML = '';
        };
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="content">
                    <div>
                        <h2>Mancala</h2>

                        <div ref={boardRef} className="mancala-board">
                            {/* board created in useEffect */}
                        </div>

                        <div className="status">{message}</div>

                        <button onClick={resetGame}>Reset Game</button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .mancala-board {
                    position: relative;
                    width: 620px;
                    height: 280px;
                    background: #8B5A2B;
                    border-radius: 16px;
                    margin: 30px auto;
                    padding: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }

                .pits-row {
                    display: flex;
                    gap: 16px;
                }

                .top  { transform: rotate(180deg); }
                .bottom { }

                .pit {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #A0522D;
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 4px 10px rgba(0,0,0,0.5);
                }

                .pit.clickable {
                    cursor: pointer;
                }
                .pit.clickable:hover {
                    background: #C68642;
                    transform: scale(1.08);
                }

                .bank {
                    position: absolute;
                    width: 80px;
                    height: 160px;
                    background: #5C4033;
                    border-radius: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 28px;
                    font-weight: bold;
                }

                .bank-player { left: 20px; }
                .bank-computer { right: 20px; }

                .bank-value {
                    font-size: 36px;
                    margin-bottom: 8px;
                }

                .turn-indicator {
                    position: absolute;
                    bottom: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #444;
                    color: white;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-size: 16px;
                }

                .status {
                    text-align: center;
                    font-size: 1.3rem;
                    margin: 16px 0;
                    min-height: 1.8rem;
                    color: #444;
                }

                button {
                    padding: 12px 28px;
                    font-size: 1.1rem;
                    background: #8B5A2B;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }
                button:hover {
                    background: #A0522D;
                }
            `}</style>
        </section>
    );
}