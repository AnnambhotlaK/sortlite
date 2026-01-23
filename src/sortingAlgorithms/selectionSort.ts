/**
 * Selection Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function selectionSort(array: number[]): number[][] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }
    // Perform selection sort
    for (let i = 0; i < array.length - 1; i++) {

        // assume curr index is the minimum unsorted element
        let min_idx = i;

        for (let j = i + 1; j < array.length; j++) {

            // push comparison to animations
            animations.push([0, min_idx, j]);
            animations.push([1, min_idx, j]);

            // array[j] < array[min_idx] -> found new min unsorted, update min_idx
            if (array[j] < array[min_idx]) {
                min_idx = j;
            }

        }

        // outside loop, swap values at i and min_idx
        // should always animate correctly, even if min_idx is same as i

        // push two height change animations.
        // this simulates actually swapping the bars.
        animations.push([2, i, array[min_idx]]);
        animations.push([2, min_idx, array[i]]);

        // swap underlying values
        let temp_i = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp_i;

    }

    return animations;
}