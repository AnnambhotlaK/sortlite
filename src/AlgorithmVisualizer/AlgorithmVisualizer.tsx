import React from "react";
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
        for (let i: number = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array});
    }

    // Render visualizer component
    render() {
        // fetch array from this.state
        const {array} = this.state;

        return (
            <>
                {array.map((value: number, idx: number) => (
                    // array-bar is a single bar in the visualizer
                    // each is assigned a value from the array
                    <div className="array-bar" key={idx}>
                        {value}
                    </div>
                ))}
            </>
        );
    }

}

// Helper for resetArray()
// Generates random integer in given range (min and max inclusive)
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}