let gridHeight = 16;

const whiteBoard = document.querySelector(".whiteboard");
const whiteBoardProperties = whiteBoard.getBoundingClientRect();

const squareArea = (whiteBoard.clientHeight ** 2) / (gridHeight ** 2);
const squareHeight = Math.sqrt(squareArea);

for (let i = 0; i < (gridHeight**2); i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add(".square");
    whiteBoard.appendChild(newSquare);
    newSquare.setAttribute("style", `width: ${squareHeight}px; height: ${squareHeight}px`);
}