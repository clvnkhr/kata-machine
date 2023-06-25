export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));

    let firstBreak = -1;
    for (let i = jump; i < breaks.length; i = i + jump) {
        if (breaks[i]) {
            firstBreak = i;
            break;
        }
    }
    // off-by-one type error
    if (firstBreak === -1 && breaks[breaks.length - 1]) {
        return breaks.length - 1
    }
    if (firstBreak > -1) {
        for (let i = firstBreak - jump; i <= firstBreak; i++) {
            if (breaks[i]) {
                return i;
            }
        }
    }
    return -1;
}
