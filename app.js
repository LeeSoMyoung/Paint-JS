const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// context default 세팅
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    // 캔버스에 마우스를 올려 놨을 때 좌표를 얻는다.
    const x = event.offsetX;
    const y = event.offsetY;

    // painting하고 있으면 선을 그릴 수 있도록 한다.
    if(!painting){
        // 그림을 그리고 있지 않다면
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseLeave(event){
    stopPainting();
}

if(canvas){
    // 만약 캔버스가 존재하면
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave',onMouseLeave);
}