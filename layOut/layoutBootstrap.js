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
    let numberColumn = event.target.getAttribute("data");
    let numberRow = event.target.getAttribute("dataSecond");
    let btnResult = document.createElement("button");
    btnResult.className = "btn btn-outline-danger";
    var blockWithButtons = document.getElementById("blockWithButtons");
    blockWithButtons.appendChild(btnResult);
    btnResult.innerHTML = numberColumn + ' * ' + numberRow;
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


blockWithUserTime.addEventListener("mouseover", stopShowTimeOfUser);
function stopShowTimeOfUser(){
    clearInterval(timerId);
}
blockWithUserTime.addEventListener("mouseout", startTimer);
function startTimer() {
    timerId = setInterval(showTimeOfUser, 1000);
}



//show display resolution

function showSizeOfWindow() {
    let widthOfWindow = window.outerWidth;
    let heightOfWindow = window.outerHeight;
    showWindowSize = `Display resolution: ${widthOfWindow} X ${heightOfWindow}`;
    document.getElementById('displayResolution').innerHTML = showWindowSize;
}

//create carousel
setInterval(createCarousel, 3000);


let slide = [
    "first1.jpg",
    "second2.jpg",
    "third3.jpg"
];
var counterSlide = 0;
function createCarousel(){
let blockWithCarousel = document.getElementById("blockWithCarousel");
    let currentSlide = counter++ % slide.length;
    let image = new Image(900, 500);
    image.className = "img-thumbnail";
    image.src = slide[currentSlide];
    blockWithCarousel.innerHTML = "";
    blockWithCarousel.appendChild(image);
}


//create carousel second











