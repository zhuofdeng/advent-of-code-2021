import { PriorityQueue } from "../PriorityQueue";

class Node {
    value = 0;
    neightbors: Node[] = [];
    visited = false;
    weight = Infinity;

    constructor(value: number) {
        this.value = value;
    }
}

export class Cave {
    nodes: Node[][] = [];
    constructor(input: string, expand = 0) {
        const positions = input.split('\n').map(p => p.split('').map(Number));
        this.nodes = positions.map(row => row.map(v => new Node(v)));
        this.copyMultiply(expand);
        this.nodes[0][0].weight = 0;
        this.nodes.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const node = this.nodes[rowIndex][columnIndex];
                if (columnIndex > 0) {
                    node.neightbors.push(this.nodes[rowIndex][columnIndex - 1]);
                }
                if (columnIndex < this.nodes.length - 1) {
                    node.neightbors.push(this.nodes[rowIndex][columnIndex + 1]);
                }
                if (rowIndex > 0) {
                    node.neightbors.push(this.nodes[rowIndex - 1][columnIndex]);
                }
                if (rowIndex < this.nodes.length - 1) {
                    node.neightbors.push(this.nodes[rowIndex + 1][columnIndex]);
                }
            });
        });   
    }

    copyMultiply = (expand: number) => {
        if (expand === 0) {
            return;
        }
        const numRows = this.nodes.length;

        for (let row = 0; row < numRows; row++) {
            const row1 = this.nodes[row];
            for (let rY = 0; rY < expand; rY++) {
                const y2 = (rY * numRows) + row;
                const row2 = this.nodes[y2] || (this.nodes[y2] = []);
                for (let column = 0; column < numRows; column++) {
                    for (let rX = 0; rX < expand; rX++) {
                        // Skip 0,0 (don't project into the source)
                        if (rY === 0 && rX === 0) {
                            continue;
                        }
        
                        // Compute location to project to
                        const x2 = (rX * numRows) + column;
        
                        // Compute the new risk value
                        const increase = rX + rY;
                        let newValue = (row1[column].value + increase);
                        if (newValue > 9) {
                            newValue -= 9;
                        }
        
                        // create a new node with the proper value.
                        row2[x2] = new Node(newValue);
                    }
                }
            }
        }
    }

    updateNodeWeight = (fromNode: Node, toNode: Node): void => {
        const weight = fromNode.weight + toNode.value;
        if (weight < toNode.weight) {
            toNode.weight = weight;
        }
    }

    runDijkstra = (): number => {
        const nodeQueue = new PriorityQueue();
        nodeQueue.enqueue(this.nodes[0][0]);
        const destinationNode = this.nodes[this.nodes.length-1][this.nodes.length-1];
        // Loop until we've tested everything
        while (!nodeQueue.isEmpty()) {
            // Stop when the exit is visited
            if (destinationNode.visited) {
                break;
            }

            // Get the next unvisited node
            const currentNode: Node = nodeQueue.dequeue();
            if (currentNode.visited) {
                continue;
            }

            currentNode.neightbors.forEach((n) => {
                if (!n.visited) {
                    this.updateNodeWeight(currentNode, n);
                    nodeQueue.enqueue(n);
                }
            });

            currentNode.visited = true;
        }

        return destinationNode.weight;
    }
}