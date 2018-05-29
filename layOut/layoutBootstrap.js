//create a table in ourlayout

let tableBtn = document.getElementById("tableBtn");
let mainContant = document.getElementById("mainContant");
tableBtn.addEventListener('click', createOurTable);

function createOurTable() {
    mainContant.innerHTML = '';
    let numberRow = document.getElementById("numberRow").value;
    let numberColumn = document.getElementById("numberColumn").value;
    let table = document.createElement("table");
    mainContant.appendChild(table);
    table.className = "table-dark";
    table.id = "ourTable";
    ourTable = document.getElementById("ourTable");

    for (let i = 1; i <= numberRow; i++){
        let ourRows = document.createElement("tr");
        ourRows.setAttribute("data", i);
        table.appendChild(ourRows);
        for (let y = 1; y <= numberColumn; y++){
            let ourColumns = document.createElement("td");
            ourColumns.setAttribute("data", i);
            ourColumns.setAttribute("dataSecond", y);
            ourRows.appendChild(ourColumns);
            ourColumns.addEventListener('click', showNumberCell);
        }
    }
}

function showNumberCell(event) {
    var blockWithButtons = document.getElementById("blockWithButtons");
    let numberSells = document.getElementById("numberSells");
    let numberColumn = event.target.getAttribute("data");
    let numberRow = event.target.getAttribute("dataSecond");
    let btnResult = document.createElement("button");
    btnResult.className = "btn btn-outline-danger";
    var tableBtn = document.getElementById("tableBtn");
    numberSells.innerHTML = numberColumn + ' * ' + numberRow;
}


//create a date in ourlayout

let rowWithTime = document.getElementById("rowWithTime");
// let footer = document.getElementById("footer");

setInterval(showClock, 1000);
function showClock() {
    let today = new Date;
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDay();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    let dayInUkraine = today.toLocaleString('en', {weekday: 'long'});
    let monthInUkraine = today.toLocaleString('en', {month: 'long'});
    showTime = `Today: ${year} year, month: ${monthInUkraine}, day: ${dayInUkraine}, time: ${hour}: ${minute}: ${second}`;
    rowWithTime.innerHTML = showTime;
};

//create time in site
let blockWithUserTime = document.getElementById("blockWithUserTime");
let seconds = 0;
let minute = 0;
let counter = 0;
let timerId;
startTimer();
function showTimeOfUser(){
    counter++;
    seconds = counter%60;
    minute = Math.floor(counter/60);
    blockWithUserTime.innerHTML = `Your time on site is ${minute} minutes ${seconds} seconds`;
}

document.addEventListener("keydown", resetUserTime);
function resetUserTime(event){
    if (event.keyCode == 27) {
        counter = 0;
    }

}

blockWithUserTime.addEventListener("mouseover", stopShowTimeOfUser);
function stopShowTimeOfUser(){
    clearInterval(timerId);
}
blockWithUserTime.addEventListener("mouseout", startTimer);
function startTimer() {
    timerId = setInterval(showTimeOfUser, 1000);
}



//show display resolution
setTimeout(showSizeOfWindow, 3000);
    function showSizeOfWindow() {
        let widthOfWindow = window.outerWidth;
        let heightOfWindow = window.outerHeight;
        showWindowSize = `Display resolution: ${widthOfWindow} X ${heightOfWindow}`;
        document.getElementById('displayResolution').innerHTML = showWindowSize;
    }

//create carousel
// setInterval(createCarousel, 1000);
// let slide = [
//     "first1.jpg",
//     "second2.jpg",
//     "third3.jpg"
// ];
// var counterSlide = 0;
// function createCarousel(){
// let blockWithCarousel = document.getElementById("blockWithCarousel");
//     let currentSlide = counter++ % slide.length;
//     let image = new Image(900, 500);
//     image.className = "img-thumbnail";
//     image.src = slide[currentSlide];
//     blockWithCarousel.innerHTML = "";
//     blockWithCarousel.appendChild(image);
// }


//create OOP carousel
var img = [
    "first1.jpg",
    "second2.jpg",
    "third3.jpg"
];

let createCarouselBtn = document.getElementById("createCarousel");
createCarouselBtn.addEventListener("click", function () {
   let carusel = new Carousel(img, blockWithCarouselFirst);
   carusel.createCarousel();
});
let carouseselWithArrows;
let createCarouselWithArrowsBtn = document.getElementById("createCarouselWithArrows");
createCarouselWithArrowsBtn.addEventListener("click", function () {
    carouseselWithArrows = new CarouseselWithArrows(img, blockWithCarouselFirst);
});

class Carousel {
    constructor (img, block) {
        this.img = img;
        this.block = block;
        this.currentSlide = 0;
        this.showImage();
    }

    createCarousel(){
       setInterval(function (that) {
            that.setCorrectSlide('+');
            that.showImage();
        }, 1000, this);
    }

    setCorrectSlide(action){

        if(action == '+') {
            if (this.currentSlide < this.img.length - 1) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
        } else {
            if (this.currentSlide == 0) {
                this.currentSlide = this.img.length - 1;
            } else {
                this.currentSlide--;
            }
        }
    }

    showImage(){
        let image = new Image(900, 500);
        image.className = "img-thumbnail";
        image.src = this.img[this.currentSlide];
        this.block.innerHTML = "";
        this.block.appendChild(image);
    }
}

class CarouseselWithArrows extends Carousel{
    constructor (img, block){
        super(img, block);
        this.createArrow();
    }

    createArrow(){
        let leftArrow = document.getElementById("left");
        let rightArrow = document.getElementById("right");
        let arrowILeft = document.createElement("i");
        let arrowIRight = document.createElement("i");
        arrowILeft.classList.add("fas", "fa-angle-left");
        arrowIRight.classList.add("fas", "fa-angle-right");
        left.appendChild(arrowILeft);
        right.appendChild(arrowIRight);
        arrowILeft.addEventListener("click", this.leftClick);
        arrowIRight.addEventListener("click", this.rightClick);
    }

    leftClick(){
        let that = carouseselWithArrows;
        that.setCorrectSlide('-');
        that.showImage();
    }

    rightClick() {
        let that = carouseselWithArrows;
        that.setCorrectSlide('+');
        that.showImage();
    }
}









