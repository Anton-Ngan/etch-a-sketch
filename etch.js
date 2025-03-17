const DEFAULT_COLOR = "black";
const DEFAULT_GRID_HEIGHT = 16;

// UI Elements
const whiteBoard = document.querySelector(".whiteboard");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const clearButton = document.querySelector(".clear-icon");
const gridButton = document.querySelector(".grid-icon");
const colorPicker = document.querySelector(".color-wheel");
const drawButton = document.querySelector(".draw-mode");
const rainbowButton = document.querySelector(".rainbow-mode");
const opacityButton = document.querySelector(".opacity-mode");
const eraseButton = document.querySelector(".erase-icon");


const Mode = Object.freeze({
    DRAW: 0,
    RAINBOW: 1,
    OPACITY: 2,
    ERASER: 3
});
let mouseOn;
let curColor = DEFAULT_COLOR;
let gridHeight = DEFAULT_GRID_HEIGHT;
let activeButton = Mode.DRAW;


function getRandomColor() {
    const COLOR_DIGITS = 6;
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < COLOR_DIGITS; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function toggleButton(DOMButton, modeType) {
    DOMButton.addEventListener("click", () => {

        const switchOff = (button) => {
            button.classList.toggle("active");
            button.setAttribute("style", "pointer-events: auto");
        }

        switch (activeButton) {
            case Mode.DRAW:
                switchOff(drawButton);
                break;
            case Mode.RAINBOW:
                switchOff(rainbowButton);
                break;
            case Mode.OPACITY:
                switchOff(opacityButton);
                break;
            case Mode.ERASER:
                switchOff(eraseButton);
        }

        activeButton = modeType;
        DOMButton.classList.toggle("active");
        DOMButton.setAttribute("style", "pointer-events: none");
    })
}

function toggleGrid() {
    gridButton.addEventListener("click", () => {
        gridButton.classList.toggle("active");

        const squares = document.querySelectorAll(".square");
        squares.forEach( (square) => {
            square.classList.toggle("active-border");
        })
    })
}

function toggleClear() {
    clearButton.addEventListener("click", () => {
        updateGrid()
    })
}

function updateSliderValue() {

    const sliderProgression = () => {
        let valuePercentage = (slider.value / slider.max) * 100;
        slider.style.background = `linear-gradient(to right, #D76C82
        ${valuePercentage}%,rgb(180, 160, 140) ${valuePercentage}%)`;
    }

    sliderProgression();
    sliderValue.textContent = `${slider.value} x ${slider.value}`;
    slider.addEventListener("input", () =>
        {
            sliderProgression();
            sliderValue.textContent = `${slider.value} x ${slider.value}`;
            gridHeight = slider.value;
            updateGrid();
        }
    )
}

function updateGrid () {

    whiteBoard.replaceChildren();

    for (let i = 0; i < (gridHeight**2); i++) {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        if (gridButton.classList.contains("active")) newSquare.classList.add("active-border");
        whiteBoard.appendChild(newSquare);
        newSquare.style.flexBasis = `calc(100% / ${gridHeight})`;

        newSquare.addEventListener("mousedown", (e) => {
            mouseOn = true;
            e.preventDefault();               // Prevent divs from being dragged as a default behaviour
            newSquare.style.backgroundColor = getColor(newSquare);
        })
        newSquare.addEventListener("mouseover", () => {
            if (mouseOn) newSquare.style.backgroundColor = getColor(newSquare);
        })
        newSquare.addEventListener("mouseup", () => {
            mouseOn = false;
        })    
    }
}

function getColor(square) {
    switch (activeButton) {
        case Mode.DRAW:
            return colorPicker.value;
        case Mode.ERASER:
            return "#FFFFFF";    // White background
        case Mode.RAINBOW:
            const rndColor = getRandomColor()
            colorPicker.value = rndColor;
            return rndColor;
        case Mode.OPACITY:
            return updateColor(square, -0.1);
    }
}

function updateColor(element, change) {

      // Get the current background-color value:
      const value = getComputedStyle(element).getPropertyValue("background-color");
      
      // Get all color components (alpha may not be there if = 1):
      const parts = value.match(/[\d.]+/g);
      
      // If alpha is not there, add it:
      if (parts.length === 3) {
        parts.push(1);
      }
      
      // Modify alpha:
      parts[3] = Math.min(1, Math.max(0, parseFloat(parts[3]) + change));
      
      // Apply new value:
      return `rgba(${ parts.join(',') })`;
}

function main() {
    updateGrid();
    updateSliderValue();
    toggleClear();
    toggleGrid();
    toggleButton(drawButton, Mode.DRAW);
    toggleButton(rainbowButton, Mode.RAINBOW);
    toggleButton(opacityButton, Mode.OPACITY);
    toggleButton(eraseButton, Mode.ERASER);
    drawButton.classList.toggle("active");
    drawButton.setAttribute("style", "pointer-events: none");
}

main();