import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import type { Animation } from '../interfaces/Animation';
import './AlgorithmVisualizer.css';

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
        for (let i: number = 0; i < 270; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array});
    }

    /* ALGORITHMS */

    bubbleSort() {

    }

    quickSort() {
    
    }

    mergeSort() {
        const animations: (number[] | Animation[]) = sortingAlgorithms.mergeSort(this.state.array);
        // if animations stores numbers -> array is sorted, return now
        if (typeof animations[0] === 'number') {
            return;
        }
        else {
            const animationArray = animations as Animation[];
            for (let i = 0; i < animationArray.length; i++) {
                // get animation from array
                const animation = animationArray[i];
                const comparison = animation.comparison;
                // convert to HTML elements and set styles for sorting
                setTimeout(() => {
                    const arrayBars = document.getElementsByClassName('array-bar');
                    (arrayBars[comparison[1]] as HTMLElement).style.backgroundColor = 'red';
                    (arrayBars[comparison[0]] as HTMLElement).style.backgroundColor = 'red';
                    setTimeout(() => {
                        (arrayBars[comparison[1]] as HTMLElement).style.backgroundColor = 'pink';
                        (arrayBars[comparison[0]] as HTMLElement).style.backgroundColor = 'pink';
                    }, (i + 1) * 10);
                }, i * 10);
            }
        }
    }

    heapSort() {
        
    }

    testSortingAlgorithms() {
        //TODO: Implement on all algos
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
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
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