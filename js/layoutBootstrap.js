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


//create OOP carousel
var img = [
    "img/first1.jpg",
    "img/second2.jpg",
    "img/third3.jpg"
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

let carouselWithHover;
createCarouselWithHover.addEventListener('click', function () {
    carouselWithHover = new CarouselWithHover(img, blockWithCarouselFirst);
});

class Carousel {
    constructor (img, block) {
        this.img = img;
        this.block = block;
        this.currentSlide = 0;
        this.intervalIdCarousel = false;
        this.showImage();
    }

    createCarousel(){
       this.intervalIdCarousel = setInterval(this.intervalCallback.bind(this), 1000);
    }

    intervalCallback () {
        this.setCorrectSlide('+');
        this.showImage();
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
        arrowILeft.addEventListener("click", this.leftClick.bind(this));
        arrowIRight.addEventListener("click", this.rightClick.bind(this));

    }

    leftClick(){
        this.setCorrectSlide('-');
        this.showImage();
    }

    rightClick() {
        this.setCorrectSlide('+');
        this.showImage();
    }
}

class CarouselWithHover extends Carousel{
    constructor (img, block){
        super(img, block);
        this.createCarousel();
        this.block.addEventListener('mouseover', this.stopSlider.bind(this));
        this.block.addEventListener('mouseout', this.createCarousel.bind(this));
    }

    stopSlider(){
        clearInterval(this.intervalIdCarousel);
    }
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

//create jquery table

$.noConflict();
let allStudents = [];
// let students = [];
jQuery( document ).ready(function ($) {

    $('#jqueryTable').click(function () {
        $('#blockWithCarouselFirst').append('<div></div>');
        $('#blockWithCarouselFirst > div').addClass('form-group');

        for (let i = 0; i < 7; i++) {
            $('#blockWithCarouselFirst > div').append('<input class="form-control fieldsOfStudents"></input>');
            //    $('#blockWithCarouselFirst .form-group > input').addClass('form-control fieldsOfStudents');
        }
        ;

        $('.fieldsOfStudents:eq(0)').attr({'placeholder': 'Fill your name', 'name': 'name'});
        $('.fieldsOfStudents:eq(1)').attr({'placeholder': 'Fill your secondname', 'name': 'secondname'});
        $('.fieldsOfStudents:eq(2)').attr({'placeholder': 'Fill your age', 'name': 'age'});
        $('.fieldsOfStudents:eq(3)').attr({'placeholder': 'Fill your faculty', 'name': 'faculty'});
        $('.fieldsOfStudents:eq(4)').attr({'placeholder': 'Fill your course', 'name': 'course'});
        $('.fieldsOfStudents:eq(5)').attr({'placeholder': 'Fill any site', 'name': 'site'});
        $('.fieldsOfStudents:eq(6)').attr({
            'placeholder': 'Fill your phone',
            'id': 'phone',
            'name': 'phone'
        }).addClass("phone");
        $("#phone").mask("(380) 99-999-99-99");

        $('#blockWithCarouselFirst').append('<button></button>');
        $('#blockWithCarouselFirst > button').addClass('btn btn-outline-info')
            .attr('id', 'addStudent')
            .text('Add student');
        $('#addStudent').on('click', addStudent);


        $('<table>', {
            class: 'tableWithStudent'
        }).appendTo('#blockWithCarouselFirst');

    });

    function addStudent() {
        let students = [];
        $('.fieldsOfStudents').each(function (i, elem) {
            students.push($(this).val());
        });
        allStudents.unshift(students);

        drawTable();

        let counter = 0;
        localStorage.setItem(counter++, JSON.stringify(allStudents));

    }


    function drawTable() {
        allStudents.forEach(function (value, key) {

            $('<tr>', {
                class: 'tableRow'
            }).prependTo('.tableWithStudent');
            $('<td>')
                .text(key)
                .appendTo('.tableWithStudent .tableRow:first-child');

            $('.fieldsOfStudents').each(function (index, elem) {
                $('<td>', {
                    name: $(this).attr('name')
                }).text($(this).val())
                    .appendTo('.tableWithStudent .tableRow:first-child');
                console.log(allStudents);
            });

        });


    };


});








