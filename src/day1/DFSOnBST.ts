export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    if (head.value === needle) {
        return true
    }

    if (head.value > needle) {
        if (head.left) {
            return dfs(head.left, needle)
        }
        else {
            return false
        }
    }
    else {
        if (head.right) {
            return dfs(head.right, needle)
        }
        else {
            return false
        }
    }




}
