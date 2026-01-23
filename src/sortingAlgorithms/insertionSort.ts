/**
 * Insertion Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function insertionSort(array: number[]): number[][] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }
    // Perform insertion sort
    for (let i = 1; i < array.length; i++) {

        // start sorting from minimum unsorted index (i)
        let j = i;

        // push comparison of j and j - 1
        // firstSwap indicates that we are making the first swap
        let firstSwap = true;
        animations.push([0, j, j - 1]);
        animations.push([1, j, j - 1]);

        // j not at start and a[j] less than its previous -> swap with previous
        while (j > 0 && array[j] < array[j - 1]) {

            // push comparison of j and j - 1 (only if not the first swap)
            if (!firstSwap) {
                animations.push([0, j, j - 1]);
                animations.push([1, j, j - 1]);
            }

            // reset firstSwap to false
            firstSwap = false;

            // push swaps
            animations.push([2, j, array[j - 1]]);
            animations.push([2, j - 1, array[j]]);

            // swap underlying values
            let temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            j--;
        }

    }

    return animations;
}