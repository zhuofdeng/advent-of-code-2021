export class PriorityQueue {
    queue: any[]
    constructor() {
        this.queue = [];
    }

    isEmpty = () => {
        return this.queue.length === 0;
    }

    dequeue = (): any => {
        const item = this.queue.shift();
        return item;
    }

    enqueue = (item: any) => {
       if(this.isEmpty()) {
            this.queue.push(item);
            return;
        }

        let startIndex = 0;
        let endIndex = this.queue.length;
        // binary search our position.
        while(startIndex < endIndex) {
            const midIndex = Math.floor((startIndex + endIndex) / 2);
            if (this.queue[midIndex].weight < item.weight) {
                startIndex = midIndex + 1;
            } else {
                endIndex = midIndex;
            }
        }

        this.queue.splice(startIndex, 0, item);
    }
}