const DEFAULT_COLOR = "black";
const DEFAULT_GRID_HEIGHT = 16;

const whiteBoard = document.querySelector(".whiteboard");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const clearButton = document.querySelector(".clear-icon");
const gridButton = document.querySelector(".grid-icon");
const colorPicker = document.querySelector(".color-wheel");
const drawButton = document.querySelector(".draw-mode");
const rainbowButton = document.querySelector(".rainbow-mode");
const grayscaleButton = document.querySelector(".grayscale-mode");
const eraseButton = document.querySelector(".erase-icon");

let gridSwitch = false;
let mouseOn;
let curColor = DEFAULT_COLOR;
let gridHeight = DEFAULT_GRID_HEIGHT;
let activeButton = "draw";

function getRandomColor() {
    const COLOR_DIGITS = 6;
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < COLOR_DIGITS; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function toggleGrayscaleButton() {
    grayscaleButton.addEventListener("click", (e) => {
        activeButton = "grayscale";
    })
}

function toggleRainbowButton() {
    rainbowButton.addEventListener("click", (e) => {
        activeButton = "rainbow";
    })
}

function toggleDrawButton() {
    drawButton.addEventListener("click", (e) => {
        activeButton = "draw";
    })
}

function toggleEraser() {
    eraseButton.addEventListener("click", (e) => {
        activeButton = "eraser";
    })
}

function toggleGrid() {
    gridButton.addEventListener("click", () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach( (square) => square.classList.toggle("active-border"))
    })
}

function toggleClear() {
    clearButton.addEventListener("click", () => {
        updateGrid()
    })
}

function updateSliderValue() {
    sliderValue.textContent = `${slider.value} x ${slider.value}`;
    slider.addEventListener("input", () =>
        {
            sliderValue.textContent = `${slider.value} x ${slider.value}`;
            gridHeight = slider.value;
            updateGrid();
        }
    )
}

function updateGrid () {

    let gridStatus = null;
    const square = document.querySelector(".square");
    if (square) {
        gridStatus = square.classList.contains("active-border");
    }

    whiteBoard.replaceChildren();
    const squareArea = (whiteBoard.clientHeight ** 2) / (gridHeight ** 2);
    const squareHeight = Math.sqrt(squareArea); 

    for (let i = 0; i < (gridHeight**2); i++) {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        if (gridStatus) newSquare.classList.add("active-border");
        whiteBoard.appendChild(newSquare);
        newSquare.setAttribute("style", `width: ${squareHeight}px; height: ${squareHeight}px`);
    }

    drawOnGrid();
} 

function drawOnGrid () {
    const squares = document.querySelectorAll(".square");
    squares.forEach( (square) => {
        square.addEventListener("mousedown", (e) => {
            mouseOn = true;
            e.preventDefault();
            e.currentTarget.style.backgroundColor = getColor(square);
        })

        square.addEventListener("mouseover", (e) => {
            if (mouseOn) e.currentTarget.style.backgroundColor = getColor(square);
        })

        square.addEventListener("mouseup", () => {
            mouseOn = false;
        })
    } )
}

function getColor(square) {
    switch (activeButton) {
        case "draw":
            return colorPicker.value;
        case "eraser":
            return "#FFFFFF";
        case "rainbow":
            return getRandomColor();
        case "grayscale":
            // if (square.style.backgroundColor !== colorPicker.value) {
            //     square.style.opacity = 0.5;
            // } else {
            //     square.style.opacity += 0.1;
            // }
            return colorPicker.value;
    }
}

function main() {
    updateGrid();
    updateSliderValue();
    toggleClear();
    toggleGrid();
    toggleEraser();
    toggleDrawButton();
    toggleRainbowButton();
    toggleGrayscaleButton();
}

main()