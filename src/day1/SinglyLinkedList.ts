type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;


    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const newNode = { value: item } as Node<T>
        this.length++;
        if (!this.head) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) { throw new Error("out of bounds") }
        if (idx === 0) {
            this.prepend(item);
        } else if (this.head) {
            this.length++;
            let oneBefore = this.head;
            for (let i = 0; i < idx - 1 && oneBefore.next; i++) {
                oneBefore = oneBefore.next;
            }
            const newNode = { value: item } as Node<T>;
            if (!oneBefore.next) {
                oneBefore.next = newNode;
            } else {
                newNode.next = oneBefore.next;
                oneBefore.next = newNode;
            }
        }

    }
    append(item: T): void {
        this.insertAt(item, this.length)
    }
    remove(item: T): T | undefined {
        if (this.head) {
            if (this.head.value === item) {
                this.head = this.head.next;
                this.length--;
                return item;
            }
            else {
                let curr = this.head
                for (let i = 0; i < this.length && curr.next; i++) {
                    if (curr.next.value === item) {
                        curr.next = curr.next.next;
                        this.length--;
                        return item;
                    }
                }
            }
        }
        return undefined

    }
    get(idx: number): T | undefined {
        if (idx === 0 && this.head) {
            return this.head.value;
        } else if (this.head) {
            let curr = this.head;
            for (let i = 0; i < idx && curr.next; i++) {
                curr = curr.next
            }
            return curr.value
        }
        return undefined;

    }
    removeAt(idx: number): T | undefined {
        if (idx >= this.length) { throw new Error("out of bounds"); }
        this.length--;
        if (idx === 0 && this.head) {
            const temp = this.head.value;
            this.head = this.head.next;
            return temp;
        } else if (this.head) {
            let oneBefore = this.head;
            for (let i = 0; i < idx - 1 && oneBefore.next; i++) {
                oneBefore = oneBefore.next
            }
            if (oneBefore.next) {
                const temp = oneBefore.next.value;
                if (oneBefore.next.next) {
                    oneBefore.next = oneBefore.next.next
                } else {
                    oneBefore.next = undefined;
                }
                return temp
            }
        }
        return undefined;
    }
}
