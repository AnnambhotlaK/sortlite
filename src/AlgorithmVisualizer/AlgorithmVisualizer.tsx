import React from "react";
import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
import { selectionSort } from '../sortingAlgorithms/selectionSort';
import { insertionSort } from '../sortingAlgorithms/insertionSort';
import { mergeSort } from '../sortingAlgorithms/mergeSort';
import { quickSort } from '../sortingAlgorithms/quickSort';
import { heapSort } from '../sortingAlgorithms/heapSort';
import './AlgorithmVisualizer.css';

// This affects animation speed.
const ANIMATION_SPEED_MS = 3;

// This affects the number of bars in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// Stores active timeouts, or currently animating sorting processes.
// This is necessary for allowing the user to stop animations.
const activeTimeouts = new Set<number>();

// Define component interface
interface AlgorithmVisualizerState {
    // Visualizer requires current state of the array of data
    array: number[];
}

// Define the AlgorithmVisualizer component
export default class AlgorithmVisualizer extends React.Component<{}, AlgorithmVisualizerState> {

    // Basic Constructor
    constructor(props: any) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        // Generate a new array when the component mounts (app first loads)
        this.resetArray();
    }

    // Used to fill array with random integers in the given range
    // Used on component mounting
    resetArray() {
        const array: number[] = [];
        // Fill array with random values from 5 to 500
        for (let i: number = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array});
    }

    /* ALGORITHMS */

    bubbleSort() {
        const animations: number[][] = bubbleSort(this.state.array);
        this.visualizeSorting(animations);
    }

    selectionSort() {
        const animations: number[][] = selectionSort(this.state.array);
        this.visualizeSorting(animations);
    }

    insertionSort() {
        const animations: number[][] = insertionSort(this.state.array);
        this.visualizeSorting(animations);
    }

    quickSort() {
        const animations: number[][] = quickSort(this.state.array);
        this.visualizeSorting(animations);
    }

    mergeSort() {
        const animations: number[][] = mergeSort(this.state.array);
        this.visualizeSorting(animations);
    }

    heapSort() {
        const animations: number[][] = heapSort(this.state.array);
        this.visualizeSorting(animations);
    }

    /**
     * Generic algorithm to visualize sorting algorithms.
     * Uses 2D animation array, where animations are integer arrays.
     * animations[i][0] represents the animationId, corresponding to:
     * a coloring comparison, uncoloring comparison, or a swap of bars.
     * @param animations 
     * @returns none 
     */
    visualizeSorting(animations: number[][]) {
        // animations is empty -> array is sorted, return
        if (animations.length === 0) {
            return;
        }
        // otherwise -> visualize each comparison and swap
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i][0] === 0 || animations[i][0] === 1) {
                const [animationId, barOneIdx, barTwoIdx] = animations[i] as number[];
                const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                console.log(barTwoIdx);
                const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
                // first comparison (animation id is 0) -> set color to red
                // second comparison (animation id is 1) -> set color to pink
                const color: string = animationId === 0 ? 'red' : 'pink';
                const id = setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
            // not on color change -> on swap, so swap bars by swapping the heights.
            else {
                const id = setTimeout(() => {
                    const [animatinoId, barOneIdx, newHeight] = animations[i] as number[];
                    const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
        }
    }

    // Immediately halt all sorting algorithms taking place
    stopAnimations() {
        // clear all timeouts
        activeTimeouts.forEach(id => clearTimeout(id));
        // empty activeTimeouts
        activeTimeouts.clear();
    }

    // Render visualizer component
    render() {
        // fetch array from this.state
        const {array} = this.state;

        return (
            <div className="array-container">
                {/* Generate Bars*/}
                {array.map((value: number, idx: number) => (
                    // array-bar is a single bar in the visualizer
                    // each is assigned a value from the array
                    // styled with height in px = value
                    <div 
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}
                    >
                    </div>
                ))}
                {/* Generate New Array Button*/}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                {/* Algorithm Sort Buttons */}
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.stopAnimations()}>Stop Animations</button>
            </div>
        );
    }

}

// Helper for resetArray()
// Generates random integer in given range (min and max inclusive)
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper for sorting algorithms
// Decides if two arrays are exactly equal
function arraysAreEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i: number = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}