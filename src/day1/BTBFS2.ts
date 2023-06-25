export default function bfs(head: BinaryNode<number>, needle: number): boolean {

    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        const curr = q.shift() // shift on empty list returns undefined
        if (!curr) {
            continue;
        }
        if (curr.value === needle) {
            return true
        }
        q.push(curr.left) // by allowing elts of q to be null, we do not need to check for null here and below
        q.push(curr.right)

    }

    return false

}
