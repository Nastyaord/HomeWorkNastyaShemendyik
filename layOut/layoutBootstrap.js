 //create a table in ourlayout

let tableBtn = document.getElementById("tableBtn");
let mainContant = document.getElementById("mainContant");
tableBtn.addEventListener('click', createOurTable);

function createOurTable() {
    let numberRow = document.getElementById("numberRow").value;
    let numberColumn = document.getElementById("numberColumn").value;

    let table = document.createElement("table");
    mainContant.appendChild(table);
    table.className = "table-dark";


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
        // console.log(event.target);
        let numberColumn = event.target.getAttribute("data");
        let numberRow = event.target.getAttribute("dataSecond");
        let btnResult = document.createElement("button");
        btnResult.className = "btn btn-outline-danger";
        var blockWithButtons = document.getElementById("blockWithButtons");
        blockWithButtons.appendChild(btnResult);
        btnResult.innerHTML = numberColumn + ' * ' + numberRow;

    }

 //create a date in ourlayout

 let btnWithDate = document.getElementById("btnWithDate");
 let footer = document.getElementById("footer");

 btnWithDate.addEventListener('click', showClock);

 function showClock() {
     let today = new Date;
     let year = today.getFullYear();
     let month = today.getMonth();
     let day = today.getDay();
     let hour = today.getHours();
     let second = today.getSeconds();
     let dayInUkraine = today.toLocaleString('en', {weekday: 'long'});
     let monthInUkraine = today.toLocaleString('en', {month: 'long'});
     console.log(dayInUkraine);

     showTime = `Today: ${year} year, month: ${monthInUkraine}, day: ${dayInUkraine}, time: ${hour} ${second}`;
     footer.innerHTML = showTime;
 }

//show display resolution

 function showSizeOfWindow() {
     let widthOfWindow = window.outerWidth;
     let heightOfWindow = window.outerHeight;
     showWindowSize = `Display resolution: ${widthOfWindow} X ${heightOfWindow}`;
     document.getElementById('displayResolution').innerHTML = showWindowSize;

     function test(){
         
         alert('Вызывалась '+(test.count++));
         3
     };
     4
     test.count=0;

 }














