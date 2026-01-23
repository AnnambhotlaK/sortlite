/**
 * Merge Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function mergeSort(array: number[]): number[][] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }
    // otherwise, make auxiliary array and call on bounds with mergesorthelper
    const auxArray: number[] = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: number[][]
) {
    // Nothing to sort -> return
    if (startIdx === endIdx) return;
    // Otherwise, perform split and search
    const middleIdx: number = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    // finally, perform merge and animations on array
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: number[][]
) {
    let k: number = startIdx;
    let i: number = startIdx;
    let j: number = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        animations.push([0, i, j]); // push comparison to change color
        animations.push([1, i, j]); // push comparison to revert color
        if (auxArray[i] <= auxArray[j]) {
            animations.push([2, k, auxArray[i]]); // push swap to overwrite height values
            mainArray[k++] = auxArray[i++];
        }
        else {
            animations.push([2, k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    // animate swaps for values less than middleIdx
    while (i <= middleIdx) {
        animations.push([0, i, i]);
        animations.push([1, i, i]);
        animations.push([2, k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    // animate swaps for values less than endIdx
    while (j <= endIdx) {
        animations.push([0, j, j]);
        animations.push([1, j, j]);
        animations.push([2, k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}