export class BingoBoard {
    private numbers: string[][] = [];
    private won = false;
    
    constructor(input: string) {
        const rows = input.split('\n');
        rows.forEach((row, index) => {
            this.numbers[index] = row.split(' ');
            this.numbers[index] = this.numbers[index].filter((num) => num !== '');
        });
    }

    public get hasWon() {
        return this.won;
    }

    public checkNumber = (number: string) => {
        // check all the number to see if it exists on the board
        this.numbers.forEach((row) => {
            // mark the number if it exists
            const index = row.indexOf(number);
            row[index] = '-1';
        });

        // check for winning condition.

        // 1. check for all rows.
        this.numbers.forEach((row) => {
            if (row.filter((nums) => nums !== '-1').length === 0) {
                this.won = true;
            }
        });

        const columns = this.numbers[0].length;
        let column = 0;
        // 2. check for all columns.
        if (this.won === false) {
            for(column = 0; column < columns; column++) {
                const columnNumbers: string[] = [];
                this.numbers.forEach((row) => {
                    columnNumbers.push(row[column])
                });
                if (columnNumbers.filter((num) => num !== '-1').length === 0) {
                    this.won = true;
                }
            }
        }

        // 3. check Diagonal 
        if (this.won === false) {
            const diagonalNumbers: string[] = [];
            for(column = 0; column < columns; column++) {
                this.numbers.forEach((row) => {
                    diagonalNumbers.push(row[column]);
                })
            }
            if (diagonalNumbers.filter((num) => num !== '-1').length === 0) {
                this.won = true;
            }
        }
    }

    public getScores = (): number => {
        if (this.won === true) {
            let totalScore = 0;
            this.numbers.forEach((row) => {
                row.forEach((element) => {
                    const value = parseInt(element);
                    if (value > -1) {
                        totalScore += value;
                    }
                });
            });

            return totalScore;
        }
        return -1;
    }
}