import React from "react";
import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
import { selectionSort } from '../sortingAlgorithms/selectionSort';
import { insertionSort } from '../sortingAlgorithms/insertionSort';
import { mergeSort } from '../sortingAlgorithms/mergeSort';
import { quickSort } from '../sortingAlgorithms/quickSort';
import './AlgorithmVisualizer.css';

import ArrayBarSlider from '../components/ArrayBarSlider';
import AnimationSpeedSlider from '../components/AnimationSpeedSlider';

// This affects the maximum value of a bar in the array.
const MAX_ARRAY_VALUE = 400;

// Stores active timeouts, or currently animating sorting processes.
// This is necessary for allowing the user to stop animations.
const activeTimeouts = new Set<number>();

// Define component interface
interface AlgorithmVisualizerState {
    // Visualizer requires current state of the array of data
    array: number[];
    // Number of bars to display in the visualizer
    numberOfBars: number;
    // Animation speed of bar swaps in milliseconds
    animationSpeed: number;
}

// Define the AlgorithmVisualizer component
export default class AlgorithmVisualizer extends React.Component<{}, AlgorithmVisualizerState> {

    // Basic Constructor
    constructor(props: any) {
        super(props);
        this.state = {
            array: [],
            numberOfBars: 300,
            animationSpeed: 3,
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
        for (let i: number = 0; i < this.state.numberOfBars; i++) {
            array.push(randomIntFromInterval(5, MAX_ARRAY_VALUE));
        }
        this.setState({array: array});
    }

    // Update state of array bars upon changing number of bars
    handleNumberOfBarsChange = (newValue: number) => {
        this.setState({ numberOfBars: newValue }, () => {
            this.resetArray();
        });
    }

    // Update animation speed upon changing speed slider
    handleAnimationSpeedChange = (newValue: number) => {
        this.setState({ animationSpeed: newValue }, () => {
            this.resetArray();
        });
    }

    /* ALGORITHMS START */

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

    /* ALGORITHMS END */

    /**
     * Generic algorithm to visualize sorting algorithms.
     * Uses 2D animation array, where animations are integer arrays.
     * animations[i][0] represents the animationId, corresponding to:
     * a coloring comparison, uncoloring comparison, or a swap of bars.
     * @param animations 
     * @returns none 
     */
    visualizeSorting(animations: number[][]) {
        // fetch array, numberOfBars, and animationSpeed from this.state
        const {array, numberOfBars, animationSpeed} = this.state;
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
                }, i * animationSpeed);
                activeTimeouts.add(id);
            }
            // not on color change -> on swap, so swap bars by swapping the heights.
            else {
                const id = setTimeout(() => {
                    const [animatinoId, barOneIdx, newHeight] = animations[i] as number[];
                    const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * animationSpeed);
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
        // fetch array, numberOfBars, and animationSpeed from this.state
        const {array, numberOfBars, animationSpeed} = this.state;

        return (
            <div className="visualizer-container">

                {/* Change number of bars in the array */}
                <div className="array-bar-slider">
                    <ArrayBarSlider value={numberOfBars} onChange={this.handleNumberOfBarsChange}></ArrayBarSlider>
                </div>

                {/* Change speed of bar animations */}
                <div className="animation-speed-slider">
                    <AnimationSpeedSlider value={animationSpeed} onChange={this.handleAnimationSpeedChange}></AnimationSpeedSlider>
                </div>

                <div className="visualizer-title-container">
                    <h1>Sorting Algorithm Visualizer</h1>
                    <p>by <a target="_blank" rel="noopener noreferrer" href="https://github.com/AnnambhotlaK">Kishore Annambhotla</a></p>
                </div>
                
                {/* Generate Bars*/}
                <div className="array-bars-container">
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
                </div>

                <div className="button-container">
                    {/* Generate New Array Button*/}
                    <button onClick={() => this.resetArray()}>New Array</button>

                    {/* Algorithm Sort Buttons */}
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>

                    {/* Stop Animations Button */}
                    <button onClick={() => this.stopAnimations()}>Stop Animations</button>
                </div>
                

                
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