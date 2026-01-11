/* Stores various array sorting algorithms for the visualizer */
import type { Animation } from '../interfaces/Animation';
/**
 * Merge Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function mergeSort(array: number[]): Animation[] | number[] {
    const animations: Animation[] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return array;
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
    animations: Animation[]
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
    animations: Animation[]
) {
    let k: number = startIdx;
    let i: number = startIdx;
    let j: number = middleIdx + 1;

    // animate swaps
    while (i <= middleIdx && j <= endIdx) {
        const animation: Animation = {comparison: [-1, -1], swap: [-1, -1]};
        animation.comparison = [i, j];
        if (auxArray[i] <= auxArray[j]) {
            animation.swap = [k, i];
            mainArray[k] = auxArray[i];
            k++;
            i++;
        }
        else {
            animation.swap = [k, j];
            mainArray[k] = auxArray[j];
            k++;
            j++;
        }
        animations.push(animation);
    }

    // animate swaps for values less than middleIdx
    while (i <= middleIdx) {
        animations.push({
            comparison: [i, i],
            swap: [k, i],
        });
        mainArray[k] = auxArray[i];
        k++;
        i++;
    }

    // animate swaps for values less than endIdx
    while (j <= endIdx) {
        animations.push({
            comparison: [j, j],
            swap: [k, j],
        });
        mainArray[k] = auxArray[j]
        k++;
        j++;
    }

}


    