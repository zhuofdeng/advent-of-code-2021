export class PolymerSequence {
    polymerInstructions: Map<string, string[]> = new Map();
    polymerPair: Map<string, number> = new Map();
    polymerCounts: Map<string, number> = new Map();

    constructor(input: string) {
        const data = input.split('\n').filter((line) => line !== '');
        const polymers = data[0].split('');
        const rules = data.slice(1).map((x) => x.split(" -> "));
        for (const rule of rules) {
            // build out the rules here
            // in case of NB -> C, we need to get NC and BC
            this.polymerInstructions.set(rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]);
        }
        polymers.forEach((v, index) => {
            if (index < polymers.length - 1) {
                const pair = polymers[index] + polymers[index+1];
                const value = this.polymerPair.get(pair) || 0;
                this.polymerPair.set(pair, value+1);
            }
        });
        
        this.polymerCounts.set(polymers[polymers.length-1], 1)
    }

    sequence = (count = 0): void => {
        const polymerKeys = this.polymerPair.keys();
        const currentMap: Map<string, number> = new Map();
        for (const key of polymerKeys) {
            const instruction = this.polymerInstructions.get(key);
            if (instruction) {
                const count = this.polymerPair.get(key) || 0;
                const countLeft = currentMap.get(instruction[0]) || 0;
                const countRight = currentMap.get(instruction[1]) || 0;
                currentMap.set(instruction[0], countLeft + count);
                currentMap.set(instruction[1], countRight + count);
            }
        }

        this.polymerPair = currentMap;

        count -= 1;
        if (count > 0) {
            this.sequence(count);
        }

    }

    count = (): number => {
        this.polymerPair.forEach((count, key) => {
            // only need to get the left side
            // because [bc, cb, ba, ad] => we just need to get (bcba)
            const [left, ] = key
            const value = this.polymerCounts.get(left) || 0;
            this.polymerCounts.set(left, value + count);
        });
        const values = [...this.polymerCounts.values()];
        const min = Math.min(...values);
        const max = Math.max(...values);
        return max - min;
    }
}