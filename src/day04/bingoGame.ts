import { BingoBoard } from "./bingoBoard";
import { parseBingoBoards, parseBingoNumbers } from "./utils";

export class Bingo {
    private numbers: string[];
    private boards: BingoBoard[] = [];
    private currentNumber!: string;
    private gameOver = false;
    private winningBoard!: BingoBoard;
    private winningScore = 0;

    constructor(input: string) {
        this.numbers = parseBingoNumbers(input);
        const bingoBoards = parseBingoBoards(input);
        bingoBoards.forEach((bingoBoard) => {
            this.boards.push(new BingoBoard(bingoBoard));
        });
    }

    revealNumber() {
        const currentNumber = this.numbers.shift();
        if (currentNumber !== undefined) {
            this.boards.forEach((board) => {
                board.checkNumber(currentNumber);
                if (board.hasWon) {
                    this.currentNumber = currentNumber;
                }
            });
        }
    }

    checkWinners(lastWinner:boolean) {
        for(let i = 0; i < this.boards.length; i++) {
            if (this.boards[i].hasWon) {
                this.winningBoard = this.boards[i];
                if (lastWinner) {
                    // remove the winning board so that
                    // the last board that won is the last winner!.
                    this.boards.splice(i, 1);
                } else {
                    return true;
                }
            }
        }

        return false;
    }

    play(lastWinner = false) {
        while(this.gameOver === false) {
            // we ran out of numbers, the game is over.
            if (this.numbers.length === 0) {
                this.gameOver = true;
            } else {
                // check the next number.
                this.revealNumber();
                if (this.checkWinners(lastWinner)) {
                    this.gameOver = true;
                }
            }

            // game over! lets get the score now!
            if (this.gameOver) {
                if (this.winningBoard) {
                    this.winningScore = parseInt(this.currentNumber) * this.winningBoard.getScores();
                }
            }
        }
    }

    get score() {
        return this.winningScore;
    }
}