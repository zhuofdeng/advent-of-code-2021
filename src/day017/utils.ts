export interface Probe {
    maxY?: number,
    initialXVelocity?: number
    initialYVelocity?: number
}

export const checkProbe = (initialXVelocity: number, initialYVelocity: number, targetX: number[], targetY: number[]): Probe => {
    let velocityX = initialXVelocity;
    let velocityY = initialYVelocity;

    let x = 0;
    let y = 0;

    const minY = Math.min(...targetY);
    let maxY = y;

    let result: Probe = {
        maxY,
    }
    while (y > minY) {
        x += velocityX;
        y += velocityY;

        if (y > maxY) {
            maxY = y;
        }

        velocityX += velocityX === 0 ? 0 : velocityX > 0 ? -1 : 1;
        velocityY--;

        if (x >= targetX[0] && x <= targetX[1] && y >= targetY[0] && y <= targetY[1]) {
            result = {
                maxY,
                initialXVelocity,
                initialYVelocity,
            };
            break;
        }
    }

    // didn't hit the target at all...
    return result;
}

export const getValidProbePaths = (targetX: number[], targetY: number[]): Probe[] => {
    const minY = Math.min(...targetY);
    const maxY = Math.max(...targetY.map(Math.abs));
    const maxX = Math.max(...targetX);

    const validProbePaths = [];
    // check each initial position and see if it will hit the target.
    for (let x = 0; x <= maxX + 1; x++) {
        for (let y = minY; y <= Math.abs(maxY); y++) {
            const hitTarget = checkProbe(x, y, targetX, targetY);
            if (hitTarget.initialXVelocity !== undefined && hitTarget.initialYVelocity !== undefined) {
                validProbePaths.push(hitTarget);
            }
        }
    }

    return validProbePaths;
}
