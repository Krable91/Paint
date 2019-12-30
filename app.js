const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
Array.from(colors).forEach(item => item.addEventListener('click', changeColor));

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting === false){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    //console.log(x, y);
}
function changeColor(){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}
function handleCanvasClick(){
    if(filling === true){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}