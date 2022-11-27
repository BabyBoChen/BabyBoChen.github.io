//data

var filmInfo = [
    {
        caption: "名偵探柯南：緋色的彈丸(2021)",
        url: "https://zh.wikipedia.org/wiki/%E5%90%8D%E5%81%B5%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E7%B7%8B%E8%89%B2%E7%9A%84%E5%BD%88%E4%B8%B8",
        star: 3
    },
    {
        caption: "名偵探柯南：紺青之拳(2019)",
        url: "https://zh.wikipedia.org/wiki/%E5%90%8D%E5%81%B5%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E7%B4%BA%E9%9D%92%E4%B9%8B%E6%8B%B3",
        star: 2
    },
    {
        caption: "名偵探柯南：零的執行人(2018)",
        url: "https://zh.wikipedia.org/wiki/%E5%90%8D%E5%81%B5%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E9%9B%B6%E7%9A%84%E5%9F%B7%E8%A1%8C%E4%BA%BA",
        star: 1
    },
    {
        caption: "名偵探柯南：唐紅的戀歌(2017)",
        url: "https://zh.wikipedia.org/wiki/%E5%90%8D%E5%81%B5%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E5%94%90%E7%B4%85%E7%9A%84%E6%88%80%E6%AD%8C",
        star: 4
    },
    {
        caption: "名偵探柯南：純黑的惡夢(2016)",
        url: "https://zh.wikipedia.org/wiki/%E5%90%8D%E5%81%B5%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E7%B4%94%E9%BB%91%E7%9A%84%E6%83%A1%E5%A4%A2",
        star: 5
    }
];

//initialize

var currentSlideIndex = 0;
var count = 0;
var pause = false;

for (let i = 0; i < 5; i++) {
    let slide = document.createElement("div");
    slide.className = "slide";
    let img = new Image();
    img.src = `./Images/0${i}.jpg`;
    img.className = "poster";
    img.captionId = i;
    slide.append(img);
    $("#frame").append(slide);
    let dot = document.createElement("span");
    dot.className = "dot";
    $("#swiper").append(dot);
}
$(".dot:nth-child(2n+1)").addClass("dotSquare");

for (let i = 0; i < 5; i++) {
    let img = new Image();
    img.src = "./Images/chngstar.png";
    img.setAttribute("marked", false);
    $("#stars").append(img);
}


function moveTo(index) {
    currentSlideIndex = index;
    $(".dot").removeClass("dotWhite");
    $("#frame").css(
        "transform", `translateX(${-currentSlideIndex * 100}%)`
    );
    $("#caption p").text(filmInfo[currentSlideIndex].caption);
    $(".dot").eq(currentSlideIndex).addClass("dotWhite");
    count = 0;
    let scoreOfTheFilm = filmInfo[currentSlideIndex].star;
    if (scoreOfTheFilm == 0) {
        $("#stars img").addClass("gray");
    } else {
        $(`#stars img:nth-child(${scoreOfTheFilm})`)
            .nextAll().addClass("gray");
        $(`#stars img:nth-child(${scoreOfTheFilm})`).removeClass("gray")
            .prevAll().removeClass("gray");
    }
    $("#display").text(`${filmInfo[currentSlideIndex].caption}獲得了${scoreOfTheFilm}顆星的評價！`);
}
moveTo(0);

//Register events and callback function

$("#slideshow").click(function () {
    let currentPoster = $(".slide").eq(currentSlideIndex);
    window.open(filmInfo[currentSlideIndex].url, '_blank');
});
$("#slideshow").mouseover(function () {
    $("#caption p").addClass("underline");
    pause = true;
});
$("#slideshow").mouseleave(function () {
    $("#caption p").removeClass("underline");
    pause = false;
});
$(".dot").click(function (e) {
    e.stopPropagation();
    let index = $(".dot").index(this);
    moveTo(index);
});
$(".fas").click(function (e) {
    e.stopPropagation();
    if (this.id == "nextArr") {
        currentSlideIndex++;
        if (currentSlideIndex >= $(".poster").length) {
            currentSlideIndex = 0;
        }
    } else {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = $(".poster").length - 1;
        }
    }
    moveTo(currentSlideIndex);
});

$("#stars img").mouseover(function () {
    pause = true;
    $(this).removeClass("gray")
        .prevAll().removeClass("gray");
    $(this).nextAll().addClass("gray");
});

$("#stars img").mouseout(function () {
    pause = false;
    let scoreOfTheFilm = filmInfo[currentSlideIndex].star;
    if (scoreOfTheFilm == 0) {
        $("#stars img").addClass("gray");
    } else {
        $(`#stars img:nth-child(${scoreOfTheFilm})`).removeClass("gray")
            .prevAll().removeClass("gray");
        $(`#stars img:nth-child(${scoreOfTheFilm})`).nextAll().addClass("gray");
    }
});
$("#stars img").click(function () {
    let index = $("#stars img").index(this);
    filmInfo[currentSlideIndex].star = index + 1;
    $("#display").text(`${filmInfo[currentSlideIndex].caption}獲得了${index + 1}顆星的評價！`);
});
$("#stars img").dblclick(function () {
    let index = $("#stars img").index(this);
    filmInfo[currentSlideIndex].star = 0;
    $("#display").text(`${filmInfo[currentSlideIndex].caption}獲得了${0}顆星的評價！`);
});

//mainloop for slideshow

setInterval(function () {
    if (pause) return;
    else {
        count++;
    }
    if (count >= 3) {
        $(".dot").removeClass("dotWhite");
        currentSlideIndex++;
        if (currentSlideIndex >= $(".poster").length) {
            currentSlideIndex = 0;
        }
        moveTo(currentSlideIndex)
        count = 0;
    }
}, 1000);

////////////////////////////////////////homework3

//initialize

var pic = $("#pic");
var width = $(window).innerWidth();
var height = $(window).innerHeight();

var picRatio = 0.6;
pic.width(width*picRatio);
pic.height(height*picRatio);

var originX = width*((1-picRatio)/2);
var originY = height*((1-picRatio)/2);

pic.css("left",originX);
pic.css("top",originY);

//register events and callback function

$(window).resize(function(){

    width = $(window).innerWidth();
    height = $(window).innerHeight();
    pic.width(width*picRatio);
    pic.height(height*picRatio);
    originX = width*((1-picRatio)/2);
    originY = height*((1-picRatio)/2);
    pic.css("left",originX);
    pic.css("top",originY);
});

pic.mousedown(function(e){
    if (e.which == 1){

        growing = !(growing);
    }
    else if (e.which == 3){
        rotation = 0;
        if (rotating){
            pic.css("transition", "transform 1s");
            pic.css("transform",`rotate(0deg)`);
        }else{
            rotationDirection *= -1;
            pic.css("transition", "");
        }
        rotating = !(rotating);
    }
});

//animation

var growing = true;
var growingRate = 0.01;
var fps = 0;
var rotating = false;
var rotation = 0;
var rotationDirection = 1;

function grow(){

    if (growing){
        if (picRatio <= 0.6){
            growingRate = 0.01;
        }else if (picRatio >= 0.9){
            growingRate = -0.01;
        }
        picRatio += growingRate;
        
        $(window).trigger('resize');
    }
    
    if (rotating){
        if (rotation >= 360){
            rotation -= 360;                    
        }else if (rotation <= -360){
            rotation += 360;
        }
        rotation += rotationDirection;
        pic.css("transform",`rotate(${rotation}deg)`);
    }
    fps++;
    window.requestAnimationFrame(grow);
}
grow();
setInterval(function(){
    $("#fps").text(`fps:${fps}`);
    fps = 0;
},1000);