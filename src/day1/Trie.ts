type TrieNode = {
    children: TrieNode[],
    value: string
    isWord: boolean,
}

export default class Trie {
    private root: TrieNode

    constructor() {
        this.root = { children: [], isWord: false, value: "" } as TrieNode;
    }

    private indexOfChar(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0)

    }

    insert(item: string): void {
        let ptr = this.root;
        for (const c of item) {
            const i = this.indexOfChar(c);
            if (!ptr.children[i]) {
                ptr.children[i] = { children: [], isWord: false, value: c } as TrieNode;
            }
            ptr = ptr.children[i];
        }
        ptr.isWord = true
    }


    delete(item: string): void {
        // if delete nothing, done
        // go through letters of item one by one
        // any char with only one child will be deleted
        if (item.length === 0) {
            return;
        }

        let ptr = this.root;
        let firstToDelParent = null;
        let subword = []

        for (const c of item) {
            const i = this.indexOfChar(c);
            if (!ptr.children[i]) {
                // word does not exist.
                return;
            }
            const nextPtr = ptr.children[i];
            if (!firstToDelParent && nextPtr.children.length <= 1) {
                firstToDelParent = ptr;
                subword.push(nextPtr.value);
            }
            if (nextPtr.children.length > 1) {
                firstToDelParent = null;
                subword = [];
            }
            ptr = nextPtr
        }
        // reached end of item; delete word
        ptr.isWord = false;
        // delete nodes using posttraversal starting from firstToDel, following subword.

        if (firstToDelParent && ptr.children.length === 0) {
            this.delete1(firstToDelParent, subword);
        }


    }

    private delete1(ptr: TrieNode, subword: string[]): void {
        let head = subword.shift();
        if (!head) {
            return;
        }
        this.delete1(ptr.children[this.indexOfChar(head)], subword);
        delete ptr.children[this.indexOfChar(head)];
    }


    find(partial: string): string[] {
        // follow partial down the trie
        // depth first traversal to return words in alphabetical order.
        let ptr = this.root;
        for (const c of partial) {

            const i = this.indexOfChar(c);
            if (!ptr.children[i]) {
                return [];
            }
            ptr = ptr.children[i];
        }

        return this.find1(ptr, partial, []);
    }

    // helper function to write out the words of the trie that begin with subword using depth first traversal
    private find1(ptr: TrieNode, prefix: string, output: string[]): string[] {
        if (ptr.isWord) {
            output.push(prefix);
        }
        for (const child of ptr.children) {
            if (child) {
                this.find1(child, prefix + child.value, output);
            }
        }
        return output;
    }
}
