export default class MinHeap {
    public length: number;
    private data: number[];


    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;

    }
    // delete means delete head.
    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];

        if (this.length === 1) {
            this.data = [];
            this.length--;
            return out;
        }
        // delete head, put last to the head and heapify down.
        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const p = this.parent(idx);
        const pVal = this.data[p];
        const val = this.data[idx];

        if (pVal > val) {
            this.data[idx] = pVal;
            this.data[p] = val;
            this.heapifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (leftIdx >= this.length) {
            return;
        }

        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];
        const val = this.data[idx];

        if (leftVal > rightVal && val > rightVal) {
            this.data[rightIdx] = val;
            this.data[idx] = rightVal;
            this.heapifyDown(rightIdx);
        }
        else if (rightVal > leftVal && val > leftVal) {
            this.data[leftIdx] = val;
            this.data[idx] = leftVal;
            this.heapifyDown(leftIdx);
        }
    }
}
