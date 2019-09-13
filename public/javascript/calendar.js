"use strict"
let selectedYear;
let selectedMonth;
let today = new Date();
let months = ['Januar','Februar','Mars','April','Mai','Juni',
'Juli','August','September','Oktober','November','Desember'];
let eventTime;

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

//current year
function getYear(){
  let year = document.getElementById("currentYear");
  year.innerHTML = today.getFullYear();
  selectedYear =  today.getFullYear();
}

//current month
function getMonth(){
  let month = document.getElementById("currentMonth");
  month.innerHTML = months[today.getMonth()];
  selectedMonth = today.getMonth();
}

//shows calendar for chosen month
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
      div.innerHTML = i;
      row++;  //increase calendar row after sunday
      div.onclick = newEvent;
      div.classList.add("pointer");
    }
    else {
      let div = document.getElementById(row +"-"+ weekday);
      div.innerHTML = i;
      div.onclick = newEvent;
      div.classList.add("pointer");
    }
  }
}

//empty contents in calendar cells
function clearCells() {
  let cells = document.getElementsByClassName("calCell");

  for(let i=0; i<cells.length; i++){
    cells[i].innerHTML = "";
    cells[i].onclick = "";
    cells[i].classList.remove("pointer");
  }
}

//add new event in calendar
function newEvent(evt) {
  eventTime = evt.target.innerHTML + "-" + (selectedMonth+1) + "-" + selectedYear;
  let eventBox = document.getElementById("eventModal");
  eventBox.style.display = "block";

  let newEv = document.getElementById("modalFrame");
  newEv.onclick = createNewEvent;

  let text = document.getElementById("eventHead");
  text.innerHTML = 'Ny hendelse ' + eventTime;
}

function createNewEvent(evt){
  evt.preventDefault();
  let inputText = document.getElementById("desc");
  let eventBox = document.getElementById("eventModal");

  if(evt.target.id === "eventSave") {
    let desc = inputText.value;
    let user = JSON.parse(localStorage.getItem("user"));

    //kall på db for oppretting av event
    dbEvent(desc, eventTime, user.username);
    inputText.value = "";
    eventBox.style.display = "none";
  }
  else if(evt.target.id === "eventCancel") {
    inputText.value = "";
    eventBox.style.display = "none";
  }
}
