//create a table in ourlayout


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
// show number sells
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


//create autocomlete

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {types: ['(cities)'], language: 'en'}
    );
    autocomplete.addListener('place_changed', function () {
        counter = 0;
        var place = autocomplete.getPlace();
        localStorage.setItem(counter, place.name);
        showWheather(place.name);
    });

    function showWheather(sity) {
        $.ajax({
            type: 'GET',
            url: 'http://api.worldweatheronline.com/premium/v1/weather.ashx',
            data: {key:'0eee58c1fd354a538fd121743180506',
                q:sity,
                format:'json'},
            success: function (data) {
                data = data.data;
                let sity = data.request[0].query;
                let temperature = data.current_condition[0].temp_C;
                let icon = data.current_condition[0].weatherIconUrl[0].value;

                sityName.innerText = `${sity} ,`;
                temperatureWeather.innerText = `${temperature}  degrees`;
                let imgWeather = new Image();
                imgWeather.className = "img-thumbnail";
                imgWeather.src = icon;
                pictureWeather.appendChild(imgWeather);
            },
            error: function (e) {
            }
        });
    }
}









