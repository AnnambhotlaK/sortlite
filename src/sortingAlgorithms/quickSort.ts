/**
 * Quicksort implementation specifically designed for animation.
 * @param array array of values to sort
 */
export function quickSort(array: number[]): number[][] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

// helper function to perform quicksort and animate it
function quickSortHelper(array: number[], low: number, high: number, animations: number[][]) {
    // low sort point is past high sort point -> return out
    if (low >= high) {
        return;
    }

    // partition
    let pivotPosition: number = partition(array, low, high, animations);

    // recursively sort partitions
    quickSortHelper(array, low, pivotPosition - 1, animations);
    quickSortHelper(array, pivotPosition + 1, high, animations);
}

// partition array, make swaps, and add animations
function partition(array: number[], low: number, high: number, animations: number[][]): number {
    // assign pivot value as end of array, left and right as low and high - 1
    let pivot: number = array[high];
    let l: number = low - 1;

    for (let r = low; r <= high - 1; r++) {

        animations.push([0, r, l + 1]);
        animations.push([1, r, l + 1]);

        // curr element smaller than pivot
        if (array[r] < pivot) {
            // increment idx of smaller element
            l++;
            // swap the two elements
            animations.push([2, l, array[r]]);
            animations.push([2, r, array[l]]);
            [array[l], array[r]] = [array[r], array[l]];
        }
    }

    // compare high with l + 1
    animations.push([0, l + 1, high]);
    animations.push([1, l + 1, high]);

    // finally, swap pivot (l + 1) to correct position (high)
    animations.push([2, l + 1, array[high]]);
    animations.push([2, high, array[l + 1]]);
    [array[l + 1], array[high]] = [array[high], array[l + 1]];

    // return the partition index
    return l + 1;

}
