/**
 * Bubble Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function bubbleSort(array: number[]): number[][] {

    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }

    // Perform bubble sort
    for (let i = 0; i < array.length; i++) {
        let isSwapped: boolean = false;

        for (let j = 0; j < array.length - 1; j++) {

            // Push two comparisons with id 0 and 1
            animations.push([0, j, j + 1]);
            animations.push([1, j, j + 1])

            // a[j] greater than a[j+1] -> need to bubble a[j] up
            if (array[j] > array[j + 1]) {

                // Push two swaps with id 2
                animations.push([2, j, array[j + 1]]);
                animations.push([2, j + 1, array[j]]);

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                isSwapped = true;

            }
        }

        // looped over array with no swap -> sorted, break now
        if (!isSwapped) {
            break;
        }

    }

    return animations;
}