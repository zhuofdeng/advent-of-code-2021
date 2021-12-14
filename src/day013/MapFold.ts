export class MapFold {
    grid: Map<number, number[]> = new Map();
    foldInstructions: string[] = [];
    maxRow = 0;
    maxColumn = 0;
    constructor(input: string) {
        const data = input.split('\n');
        data.forEach((value) => {
            if (value !== '') {
                if (value.startsWith('fold')) {
                    this.foldInstructions.push(value);
                } else {
                    const [x, y] = value.split(',').map(v => parseInt(v))
                    const row = this.grid.get(y) || [];
                    row.push(x);
                    row.sort((a, b) => a - b);
                    this.grid.set(y, row);
                }
            }
        });
        this.grid = new Map([...this.grid].sort((a,b)=> a[0] - b[0]));
    }

    foldHorizontal = (y: number) => {
        this.grid.forEach((values, key) => {
            if (key > y) {
                const lookUpKey = y - (key - y);
                let newValues = this.grid.get(lookUpKey) || [];
                newValues = newValues.concat(values).sort((a, b) => a - b).filter((item, pos, ary) => {
                    return !pos || item != ary[pos - 1];
                });

                if (newValues[newValues.length-1] > this.maxColumn) {
                    this.maxColumn = newValues[newValues.length-1];
                }
                this.grid.set(lookUpKey, newValues);
                this.grid.delete(key);
            }
        });
    }

    foldVertical = (x: number) => {
        this.grid.forEach((values, key) => {
            let gridValue = values.map((v) => {
                return  (v > x) ? v = x - ( v -  x) : v}
            );
            gridValue = gridValue.sort((a, b) => a - b).filter((item, pos, ary) => {
                return !pos || item != ary[pos - 1];
            });
            if (key > this.maxRow) {
                this.maxRow = key;
            }
            this.grid.set(key, gridValue); 
        });
    }

    fold = (step = 0, oneFold = true) => {
        const instruction = this.foldInstructions[step];
        const horizontal = instruction.indexOf('y=');
        const vertical = instruction.indexOf('x=');

        if (horizontal > 0) {
            const y = instruction.substring(horizontal+2);
            this.foldHorizontal(parseInt(y));
        } else if (vertical > 0) {
            const x = instruction.substring(vertical+2);
            this.foldVertical(parseInt(x));
        }

        step += 1;
        if (step < this.foldInstructions.length && oneFold === false) {
            this.fold(step);
        }
    }

    showCode = () => {
        // Characters are of height 6 (added extra row for console output padding)
        // Message length is 8, letter width is 4 + single char of padding between each letter
        const messageGrid: string[][] = [];
        for(let i = 0; i < this.maxColumn; i++) {
            messageGrid[i] = [];
            for(let j = 0; j < this.maxRow; j++) {
                messageGrid[i][j] = '';
            }
        }

        this.grid = new Map([...this.grid].sort((a, b) => a[0] - b[0]));
        this.grid.forEach((values, key) => {
            values.forEach((y) => {
                messageGrid[key][y] = '#';
            })
        });

        console.log(`CODE:....`);
        messageGrid.forEach((m) => {
            const line = m.join('');
            console.log(`${line}\n`)
        });
    }
    count = () => {
        let total = 0;
        this.grid.forEach((values) => {
            total += values.length;
        });
        return total;
    }
}