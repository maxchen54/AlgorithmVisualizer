import React from 'react';
import { getAnimations } from '../SortingAlgorithms/SortingAlgorithms';
import './SortingVisualizer.css';

const ARRAY_BARS_AMOUNT = 100;

const BAR_COLOR = 'turquoise';

const SORTING_COLOR = 'red';

const ANIMATION_SPEED = 2;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
        };
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < ARRAY_BARS_AMOUNT; i++) {
            array.push(randomInt(10, 700));
        }
        this.setState({array})
    }

    bubbleSort() {
        const animations = getAnimations(this.state.array, 1);
        this.animateSort(animations)
    }

    mergeSort() {
        const animations = getAnimations(this.state.array, 0);
        this.animateSort(animations);
    }

    quickSort() {
        const animations = getAnimations(this.state.array, 2);
        this.animateSort(animations);
    }

    animateSort(anims) {
        for (let i = 0; i < anims.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (anims[i][2]) { // if the animation is a color change
                const [barOne, barTwo] = anims[i];
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = barOneStyle.backgroundColor === BAR_COLOR ? SORTING_COLOR : BAR_COLOR;
                    barTwoStyle.backgroundColor = barTwoStyle.backgroundColor === BAR_COLOR ? SORTING_COLOR : BAR_COLOR;
                }, i * ANIMATION_SPEED);
            } else { // colors have been indicated, perform the swap animation
                setTimeout(() => {
                    const [barOne, newHeight] = anims[i];
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value, id) => (
                    <div
                      className="array-bar"
                      key={id}
                      style={{
                        backgroundColor: BAR_COLOR,
                        height: `${value}px`,
                    }}></div>
            ))}
            <p>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <p>
                    <div className="input-container">
                        <label for="numBarsInput">Enter Number of Bars:</label>
                        <input type="text" id="numBars"/>
                    </div>
                </p>
            </p>
            </div>
        );
    }
}

function randomInt(lowBound, highBound) {
    return Math.floor(Math.random() * (highBound - lowBound + 1) + lowBound);
}