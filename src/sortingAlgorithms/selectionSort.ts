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

        animations.push([2, i, array[min_idx]]);
        animations.push([3, min_idx, array[i]]);

        let temp_i = array[i];
        let temp_min_idx = array[min_idx];

        // swap underlying values
        array[i] = temp_min_idx;
        array[min_idx] = temp_i;

        // push two height change animations.
        // this simulates actually swapping the bars.
        //animations.push([2, i, temp_min_idx]);
        //animations.push([3, min_idx, temp_i]);

    }

    return animations;
}

// How to animate?
// Looping over array in j loop -> add two comparisons of min_idx with j for color and uncolor
// Then, after settling on min_idx -> animate the swap
// How to know when we happen upon the swap? 
// use id values for each type of animation
// first comp = 0, second comp = 1, first swap = 2, second swap = 3