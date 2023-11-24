const circleButton = document.getElementById('circleButton');
const triangleButton = document.getElementById('triangleButton');
const rectangleButton = document.getElementById('rectangleButton');
const pencilButton = document.getElementById('pencilButton');

let drawingmMethod;

circleButton.addEventListener('click', () => setDrawingMethod('circle'));
triangleButton.addEventListener('click', () => setDrawingMethod('triangle'));
rectangleButton.addEventListener('click', () => setDrawingMethod('rectangle'));
pencilButton.addEventListener('click', () => setDrawingMethod('pencil'));

function setDrawingMethod(method) {
  drawingMethod = method;
  clearSelectedButtons();
  document.getElementById(`${method}Button`).classList.add('selected-button');
}

function clearSelectedButtons() {
  const buttons = [circleButton, triangleButton, rectangleButton, pencilButton];
  buttons.forEach(btn => btn.classList.remove('selected-button'));
}


const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let isMouseDown = false;
let drawingMethod = "pencil";
let shapeHeeight = 100;

const getMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseXPosition = event.clientX - rect.left;
  const mouseYPosition = event.clientY - rect.top;
  return { mouseXPosition, mouseYPosition };
};



canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  if (drawingMethod === "pencil") {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    canvasContext.beginPath();
    canvasContext.moveTo(mouseXPosition, mouseYPosition);
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (drawingMethod === "pencil" && isMouseDown) {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    canvasContext.lineTo(mouseXPosition, mouseYPosition);
    canvasContext.stroke();
  }
});

canvas.addEventListener("mouseup", (event) => {
  isMouseDown = false;
  if (drawingMethod !== "pencil") {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    switch (drawingMethod) {
      case "triangle":
        drawTriangle(mouseXPosition, mouseYPosition);
        break;
      case "circle":
        drawCircle(mouseXPosition, mouseYPosition);
        break;
      case "rectangle":
        drawRectangle(mouseXPosition, mouseYPosition);
        break;
      default:
        break;
    }
  } else {
    canvasContext.beginPath();
  }
});

const shapeHeight = 100; 

canvas.addEventListener('mouseup', function(e) {
  if (drawingMethod === 'triangle') {
    const { mouseXPosition, mouseYPosition } = getMousePosition(e);
    drawTriangle(mouseXPosition, mouseYPosition);
  }
});

canvas.addEventListener('mouseup', function(e) {
  if (drawingMethod === 'circle') {
    const { mouseXPosition, mouseYPosition } = getMousePosition(e);
    drawCircle(mouseXPosition, mouseYPosition);
  }
});

canvas.addEventListener('mouseup', function(e) {
  if (drawingMethod === 'rectangle') {
    const { mouseXPosition, mouseYPosition } = getMousePosition(e);
    drawRectangle(mouseXPosition, mouseYPosition);
  }
});

const shapeSizeInput = document.getElementById('shapeSize');
shapeSizeInput.addEventListener('input', function() {
  shapeHeight = parseInt(shapeSizeInput.value);
});


function drawRectangle(x, y) {
  canvasContext.beginPath();
  canvasContext.rect(x, y, shapeHeight, shapeHeight);
  canvasContext.stroke();
}

function drawCircle(x, y) {
  canvasContext.beginPath();
  canvasContext.arc(x, y, shapeHeight / 2, 0, 2 * Math.PI);
  canvasContext.stroke();
}


function drawTriangle(x, y) {
  canvasContext.beginPath();
  canvasContext.moveTo(x, y);
  canvasContext.lineTo(x + shapeHeight, y);
  canvasContext.lineTo(x + shapeHeight / 2, y - Math.sqrt(3) / 2 * shapeHeight);
  canvasContext.closePath();
  canvasContext.stroke();
}
const resettButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  setDrawingMethod('pencil'); 
});

const colorButton = document.getElementById("colorPicker");
colorButton.addEventListener("input", () => {
  canvasContext.strokeStyle = colorButton.value;
});

const widthButton = document.getElementById("widthPicker");
widthButton.addEventListener("input", () => {
  canvasContext.lineWidth = widthButton.value;
});




// const resetButton = document.getElementById("resetButton");
// resetButton.addEventListener("click", () => {
//   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
// });













