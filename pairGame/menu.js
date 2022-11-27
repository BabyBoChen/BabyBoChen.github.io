var menuWrapper = document.getElementById("menu-wrapper");
var divHeader = document.getElementById("header-div");
var canvasDemo = document.getElementById("canvas-demo");
var canvasMenu = document.getElementById("canvas-menu");

if (window.innerWidth < 400){
    canvasDemo.width = 400;
}else{
    canvasDemo.width = window.innerWidth;
}
canvasDemo.height = 150;
if (window.innerWidth < 400){
    canvasMenu.width = 400;
}else{
    canvasMenu.width = window.innerWidth;
}
if (window.innerHeight < 400){
    canvasMenu.height = 400 - divHeader.offsetHeight - canvasDemo.height - 18;
}else{
    canvasMenu.height = window.innerHeight - divHeader.offsetHeight - canvasDemo.height - 18;
}

window.addEventListener("resize",resizeMenuCanvas);

function resizeMenuCanvas(e){
    if (window.innerWidth < 400){
        canvasDemo.width = 400;
    }else{
        canvasDemo.width = window.innerWidth;
    }
    if (window.innerWidth < 400){
        canvasMenu.width = 400;
    }else{
        canvasMenu.width = window.innerWidth;
    }
    if (window.innerHeight < 400){
        canvasMenu.height = 400 - divHeader.offsetHeight - canvasDemo.height - 18;
    }else{
        canvasMenu.height = window.innerHeight - divHeader.offsetHeight - canvasDemo.height - 18;
    }
}


/** @type {CanvasRenderingContext2D} */
var ctx3 = canvasDemo.getContext("2d");
ctx3.imageSmoothingEnabled = true;
ctx3.imageSmoothingQuality = 'low';

var demoCard1 = new Image();
demoCard1.src = "assets/images/back.png";
var demoCard2 = new Image();
demoCard2.src = "assets/images/back.png";
var demoCursor = new Image();
demoCursor.src = "assets/images/demoCursor.png";
var frame = 0;

function gameDemo(){
    if (frame >= 130){
        frame = 0;
        demoCard1.src = "assets/images/back.png";
        demoCard2.src = "assets/images/back.png";
        ctx3.globalAlpha = 1;
    }
    ctx3.clearRect(0,0,canvasDemo.width,canvasDemo.height);
    ctx3.font = "30px Arial";
    ctx3.drawImage(demoCard1,canvasDemo.width/2-demoCard1.naturalWidth,30);
    ctx3.drawImage(demoCard2,canvasDemo.width/2,30);
    if (frame >= 20 && frame <= 40){
        ctx3.drawImage(demoCursor,canvasDemo.width/2+demoCard2.naturalWidth/2,30+demoCard2.naturalHeight/2+30-(frame-20)*1.5);
    }else if(frame > 40 && frame <= 50){
        ctx3.drawImage(demoCursor,canvasDemo.width/2+demoCard2.naturalWidth/2,30+demoCard2.naturalHeight/2);
        ctx3.fillText("Click!",canvasDemo.width/2+demoCard2.naturalWidth/2,30+demoCard2.naturalHeight/2);
        demoCard2.src = "assets/images/aceOfHearts.png";
    }else if(frame > 50 && frame <= 85){
        ctx3.drawImage(demoCursor,canvasDemo.width/2+demoCard2.naturalWidth/2-(frame-50)*5,30+demoCard2.naturalHeight/2);
    }else if (frame > 85 && frame <= 95){
        ctx3.drawImage(demoCursor,canvasDemo.width/2+demoCard2.naturalWidth/2-(85-50)*5,30+demoCard2.naturalHeight/2);
        ctx3.fillText("Click!",canvasDemo.width/2+demoCard2.naturalWidth/2-(85-50)*5,30+demoCard2.naturalHeight/2);
        demoCard1.src = "assets/images/aceOfDiamonds.png";
    }
    else if(frame > 95 && frame <= 115){
        ctx3.globalAlpha = 1;
        ctx3.fillText("Matched!",canvasDemo.width/2-ctx3.measureText("Matched").width/2,30+demoCard2.naturalHeight/2);
        ctx3.globalAlpha = 0.5;
    }else if (frame > 115){
        ctx3.globalAlpha = 0;
    }
    frame++;
}

var demo = setInterval(gameDemo,1000/20);

/** @type {CanvasRenderingContext2D} */
var ctx2 = canvasMenu.getContext("2d");
var menuCursor1 = new Image();
menuCursor1.src = "assets/images/cursorSpade.png";
var menuCursor2 = new Image();
menuCursor2.src = "assets/images/cursorHeart.png";
var menuCursor3 = new Image();
menuCursor3.src = "assets/images/cursorDiamond.png";
var menuCursor4 = new Image();
menuCursor4.src = "assets/images/cursorClub.png";
var cursorRadius = 15;
var cursorAngle = 0;
/** @type {String} */
var btnStart = "START";
/** @type {Boolean} */
var cursorOnBtnStart = false;
var mouseX = canvasMenu.width/2 + 80;
var mouseY = 20;

canvasMenu.addEventListener("mousemove",mouseoverCanvasMenu);

function mouseoverCanvasMenu(e){

    /** @type {MouseEvent} */
    var mouseEvent = e;
    mouseX = mouseEvent.clientX;
    mouseY = mouseEvent.clientY - (divHeader.offsetHeight + canvasDemo.height);
    if (mouseY <= 40 && mouseY >= 0){
        cursorOnBtnStart = true;
    }else{
        cursorOnBtnStart = false;
    }

}

function menuRender(){

    ctx2.clearRect(0,0,canvasMenu.width,canvasMenu.height);
    ctx2.save();
    if (cursorAngle >= 360){
        cursorAngle = 0;
    }
    ctx2.font = "40px Arial";
    ctx2.fillStyle = "white";
    var btnStartWidth = ctx2.measureText(btnStart).width;
    var btnStartX = canvasMenu.width/2-btnStartWidth/2;
    ctx2.fillText(btnStart,btnStartX,40);
    if (cursorOnBtnStart){
        ctx2.beginPath();
        ctx2.rect(5,5,canvasMenu.width-10,40);
        ctx2.lineWidth = "2";
        ctx2.strokeStyle = "blue";
        ctx2.stroke();
    }
    ctx2.drawImage(menuCursor1,mouseX+(cursorRadius*Math.sin(cursorAngle/180*Math.PI)),mouseY+(cursorRadius*Math.cos(cursorAngle/180*Math.PI)));
    ctx2.drawImage(menuCursor2,mouseX+(cursorRadius*Math.sin((cursorAngle+90)/180*Math.PI)),mouseY+(cursorRadius*Math.cos((cursorAngle+90)/180*Math.PI)));
    ctx2.drawImage(menuCursor3,mouseX+(cursorRadius*Math.sin((cursorAngle+180)/180*Math.PI)),mouseY+(cursorRadius*Math.cos((cursorAngle+180)/180*Math.PI)));
    ctx2.drawImage(menuCursor4,mouseX+(cursorRadius*Math.sin((cursorAngle+270)/180*Math.PI)),mouseY+(cursorRadius*Math.cos((cursorAngle+270)/180*Math.PI)));
    cursorAngle += 10;

}

var menu = setInterval(menuRender,1000/20);

canvasMenu.addEventListener("click",startGame);

function startGame(e){
    /** @type {MouseEvent} */
    var mouseEvent = e;
    if (cursorOnBtnStart){
        clearInterval(demo);
        clearInterval(menu);
        menuWrapper.style.display = "none";
        window.removeEventListener("resize",resizeMenuCanvas);
        canvasMenu.removeEventListener("mousemove",mouseoverCanvasMenu);
        canvasMenu.removeEventListener("click",startGame);
        endGame = false;
        spawnCards();
        startEngine();
        startControl();
    }
}