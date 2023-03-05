import { foodma } from "./foodma.js";
import { jQueryHomework } from "./jQuery_homework.js";
import { pairGame } from "./pairGame.js";
import { srtPlayer } from "./srtPlayer.js";
import { stockTw } from "./stock_tw.js";
import { srtPlayerFX } from "./srtPlayerFX.js";
import { kingTut } from "./kingTut.js";
import { eren } from "./eren.js";
import { mikasa } from "./mikasa.js";
import { pwd_manager } from "./pwd_manager.js";
import { haterBoy } from "./haterBoy.js";
import { razorTodo } from "./razorTodo.js";
import { mine } from "./mine.js";
import { socketio } from "./socketio.js";
import { bbljoverflow } from "./bbljoverflow.js";
import { bbljWeather } from "./bbljWeather.js";
import { ransomLetter } from "./ransomLetter.js";
import { bbljCalendar } from "./bbljCalendar.js";
import { bbljscooter } from "./bbljscooter.js";
import { visitorCount } from "./visitor_count.js";
import { dataTableReader } from "./dataTableReader.js";
import { babybo } from "./babybo.js";
import { spongebobSquarepants } from "./spongebobSquarepants.js";
import { bblj3DViewer } from './bblj3DViewer.js';
import { jdatatable } from './jdatatable.js';
import { jatatable } from './jatatable.js';
import { dog } from './dog.js';
import { blaze } from './blaze.js';
import { bbljCalendarApi } from './bbljCalendarApi.js';
import { bbljPwdManager } from './bbljPwdManager.js';


/** @type {string} */
const root = window.location.protocol + "//" + window.location.host;

/** @type {HTMLDivElement} */
const main = document.getElementById("main");

function redirect(){
    let rootRe = new RegExp(root);
    let targetPath = window.location.href.replace(rootRe, '').replace("/#!", '').replace('/', '');
    if (targetPath == ""){
        main.innerHTML = "<p>homepage</p>";
    }else if(targetPath == "foodma"){
        main.innerHTML = foodma;
    }else if(targetPath == "jQuery_homework"){
        main.innerHTML = jQueryHomework;
    }else if(targetPath == "pairGame"){
        main.innerHTML = pairGame;
    }else if(targetPath == "srtPlayer"){
        main.innerHTML = srtPlayer;
    }else if(targetPath == "stock_tw"){
        main.innerHTML = stockTw;
    }else if(targetPath == "srtPlayerFX"){
        main.innerHTML = srtPlayerFX;
    }else if(targetPath == "kingTut"){
        main.innerHTML = kingTut;
    }else if(targetPath == "eren"){
        main.innerHTML = eren;
    }else if(targetPath == "mikasa"){
        main.innerHTML = mikasa;
    }else if(targetPath == "pwd_manager"){
        main.innerHTML = pwd_manager;
        const downloadApp = document.getElementById("downloadApp");
        downloadApp.addEventListener("click",function(e){
            e.preventDefault();
            let res = confirm("是否確定要下載此app？");
            if(res){
                window.open('https://drive.google.com/file/d/1QJEhdqZLAXZW4qhyI-tb7Z9FsS1R4tR-/view?usp=sharing');
            }else{
                return;
            }
        });
    }else if(targetPath == "haterBoy"){
        main.innerHTML = haterBoy;
    }else if(targetPath == "razorTodo"){
        main.innerHTML = razorTodo;
    }else if(targetPath == "mine"){
        main.innerHTML = mine;
    }else if(targetPath == "socketio"){
        main.innerHTML = socketio;
    }else if(targetPath == "bbljoverflow"){
        main.innerHTML = bbljoverflow;
    }else if(targetPath == "bbljWeather"){
        main.innerHTML = bbljWeather;
    }else if(targetPath == "ransomLetter"){
        main.innerHTML = ransomLetter;
    }else if(targetPath == "bbljCalendar"){
        main.innerHTML = bbljCalendar;
    }else if(targetPath == "bbljscooter"){
        main.innerHTML = bbljscooter;
    }else if(targetPath == "visitor_count"){
        main.innerHTML = visitorCount;
        getVisitorCt('https://bblj-my-dart.azurewebsites.net/').then(function(count){
            document.getElementById('spanVisitorCt').innerHTML = count;
        });
    }else if(targetPath == "dataTableReader"){
        main.innerHTML = dataTableReader;
    }else if(targetPath == "babybo"){
        main.innerHTML = babybo;
    }else if(targetPath == "spongebobSquarepants"){
        main.innerHTML = spongebobSquarepants;
    }else if(targetPath == "bblj3DViewer"){
        main.innerHTML = bblj3DViewer;
    }else if(targetPath == "jdatatable"){
        main.innerHTML = jdatatable;
    }else if(targetPath == "jatatable"){
        main.innerHTML = jatatable;
    }else if(targetPath == "dog") {
        main.innerHTML = dog;
    }else if(targetPath == "blaze") {
        main.innerHTML = blaze;
    } else if (targetPath == "bbljCalendarApi") {
        main.innerHTML = bbljCalendarApi;
    } else if (targetPath == "bbljPwdManager") {
        main.innerHTML = bbljPwdManager;
    } else {
        main.innerHTML = "<p>homepage</p>";
    }
}

window.addEventListener('DOMContentLoaded', function(e) {
    redirect();
});

window.addEventListener('popstate', function(e) {
    redirect();
});
