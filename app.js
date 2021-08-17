const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = canvas.offsetWidth;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 이걸 설정해주지 않으면, 이미지를 저장할 때 배경이 투명색이 된다.
ctx.fillStyle='white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// context default 세팅
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // 캔버스에 마우스를 올려 놨을 때 좌표를 얻는다.
    const x = event.offsetX;
    const y = event.offsetY;

    // painting하고 있으면 선을 그릴 수 있도록 한다.
    if (!painting) {
        // 그림을 그리고 있지 않다면
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseLeave(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick(event) {
    if (filling) {
        filling = false;
        mode.innerText = "채우기";
    }
    else {
        filling = true;
        mode.innerText = "그리기";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = '그림.png';
    link.click();
    console.log(link);
    console.log(image);
}

if (canvas) {
    // 만약 캔버스가 존재하면
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleRightClick);
}


Array.from(colors).forEach((color) => {
    color.addEventListener('click', handleColorClick);
});


if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}