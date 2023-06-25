export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    let seen: boolean[] = new Array(graph.length).fill(false)
    let parents: number[] = new Array(graph.length).fill(-1)
    let outputPath: number[] = []

    seen[source] = true;
    let q = [source];
    do {
        const curr = q.shift() as number;
        seen[curr] = true;
        if (curr === needle) {
            break;
        }
        for (let i = 0; i < graph.length; i++) {
            if (!seen[i] && graph[curr][i] != 0) {
                parents[i] = curr;
                q.push(i)
            }
        }
    } while (q.length > 0)

    if (!seen[needle]) {
        return null
    }

    for (let curr = needle; curr != -1; curr = parents[curr]) {
        outputPath.push(curr)
    }
    return outputPath.reverse()
}
