export class LineSegment {
    private _point1: number[];
    private _point2: number[];
    constructor(input: string) {
        const lineStartEnd = input.split(' -> ');
        this._point1 = lineStartEnd[0].split(',').map(value => parseInt(value));
        this._point2 = lineStartEnd[1].split(',').map(value => parseInt(value));
    }

    get x() {
        return [this._point1[0], this._point2[0]];
    }

    get y() {
        return [this._point1[1], this._point2[1]];
    }

    getMaxX() {
        return Math.max(this._point1[0], this._point2[0]);
    }

    getMaxY() {
        return Math.max(this._point1[1], this._point2[1]);
    }

    getPointsOnTheLine() {
        const points = [];
        let incrementX = this.x[0] > this.x[1] ? -1 : 1;
        let incrementY = this.y[0] > this.y[1] ? -1 : 1;

        if (this.x[0] === this.x[1]) {
            incrementX = 0;
        }
        if (this.y[0] === this.y[1]) {
            incrementY = 0;
        }
        let x = this.x[0];
        let y = this.y[0];
        
        while(x !== this.x[1] || y !== this.y[1]) {
            points.push([x, y]);
            x += incrementX;
            y += incrementY;
        }

        points.push(this._point2);

        return points;
    }

    isHorizontal(): boolean {
        return this.y[0] === this.y[1];
    }

    isVertical(): boolean {
        return this.x[0] === this.x[1];
    }
}