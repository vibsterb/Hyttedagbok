"use strict"
let selectedYear;
let selectedMonth;
let today = new Date();
let months = ['Januar','Februar','Mars','April','Mai','Juni',
'Juli','August','September','Oktober','November','Desember'];


//addTemplate("calTemplate");

function calView(){
  getYear();
  getMonth();
  showCal();
  let arrowRight = document.getElementById("nextMonth");
  arrowRight.onclick = nextMonth;

  let arrowLeft = document.getElementById("prevMonth");
  arrowLeft.onclick = prevMonth;
}

//viser neste måned
function nextMonth(){

  if(selectedMonth === 11){
    selectedMonth = 0;
    selectedYear = selectedYear+1;
    let year = document.getElementById("currentYear");
    year.innerHTML = selectedYear;
  }
  else {
    selectedMonth = selectedMonth+1;
  }

  let month = document.getElementById("currentMonth");
  month.innerHTML = months[selectedMonth];
  showCal();
}

//viser forrige måned
function prevMonth(){

  if(selectedMonth === 0){
    selectedMonth = 11;
    selectedYear = selectedYear-1;
    let year = document.getElementById("currentYear");
    year.innerHTML = selectedYear;
  }
  else {
    selectedMonth = selectedMonth-1;
  }

  let month = document.getElementById("currentMonth");
  month.innerHTML = months[selectedMonth];
  showCal();
}

//inneværende år
function getYear(){
  let year = document.getElementById("currentYear");
  year.innerHTML = today.getFullYear();
  selectedYear =  today.getFullYear();
}

//inneværende måned
function getMonth(){
  let month = document.getElementById("currentMonth");
  month.innerHTML = months[today.getMonth()];
  selectedMonth = today.getMonth();
}

//viser kalender for valgt måned
function showCal(){
  let cal = document.getElementById("calGrid3");
  clearCells();

  let d = new Date(selectedYear, selectedMonth);
  //gir antall dager i forrige måned uten +1 på 2.parameter
  let daysOfMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
  let row = 1;
  let weekday = 0; //teller som styrer hvilken rad i kalenderen vi er på

  //må finne startdag/ukedag for første dag i måneden
  for(let i=1; i<=daysOfMonth; i++){
    d.setDate(i); //setter dato til denne dagen i måneden
    weekday = d.getDay(); //gir ukedag for aktuell dag i måneden

    if(weekday === 0){
      let div = document.getElementById(row +"-"+ "7");
      div.innerHTML = i ;
      row++;  //etter søndag øker kalenderrad med 1
    }
    else {
      let div = document.getElementById(row +"-"+ weekday);
      div.innerHTML = i ;
    }
  }
}

//tømmer alt innhold i kalendercellene
function clearCells() {
  let cells = document.getElementsByClassName("calCell");
  for(let i=0; i<cells.length; i++){
    cells[i].innerHTML ="";
  }
}
