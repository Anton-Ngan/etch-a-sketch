const DEFAULT_COLOR = "black";
const DEFAULT_GRID_HEIGHT = 16;

const whiteBoard = document.querySelector(".whiteboard");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const clearButton = document.querySelector(".clear-icon");
const gridButton = document.querySelector(".grid-icon");

let gridSwitch = false;
let mouseOn;
let curColor = DEFAULT_COLOR;
let gridHeight = DEFAULT_GRID_HEIGHT;



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
            e.currentTarget.style.backgroundColor = curColor;
        })

        square.addEventListener("mouseover", (e) => {
            if (mouseOn) e.currentTarget.style.backgroundColor = curColor;
        })

        square.addEventListener("mouseup", () => {
            mouseOn = false;
        })
    } )
}


function main() {
    updateGrid();
    updateSliderValue();
    toggleClear();
    toggleGrid();
}

main()