"use strict"
let selectedYear;
let selectedMonth;
let d = new Date();

//templateController();
addTemplate("calTemplate");
getYear();
getMonth();
showCal();

function templateController(){
  addTemplate("startTemplate");

  let login = document.getElementById("loginStart");
  login.onclick = showLoginForm;

  let loginForm = document.getElementById("loginForm");
  loginForm.onsubmit = loginUser;

}

function getYear(){
  let year = document.getElementById("currentYear");
  year.innerHTML = d.getFullYear();
  selectedYear =  d.getFullYear();
}

function getMonth(){
  let month = document.getElementById("currentMonth");
  let months = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'];
  month.innerHTML = months[d.getMonth()];
  selectedMonth = d.getMonth();
}

function showCal(){
  let cal = document.getElementById("calGrid3");

  //gir antall dager i forrige måned uten +1 på 2.parameter
  let daysOfMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
  //console.log(daysOfMonth);

  //må finne startdag/ukedag for første dag i måneden
  for(let i=1; i<=daysOfMonth; i++){
  //for(let i=1; i<=7; i++){
    d.setDate(i);
    //må ha en teller som styrer hvilken rad i kalenderen vi er på
    //let div = document.getElementById("1-"+i);
    //div.innerHTML = i ;
    //  console.log(d.getDay()); må markere søndager med rødt

  }

}

function loginUser(evt) {
  evt.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  addTemplate("mainTemplate");
}

//switching templates
function addTemplate(templId){
  let container = document.getElementById("mainContainer");
  container.innerHTML = "";

  let templ = document.getElementById(templId);
  let clone = templ.content.cloneNode(true);
  container.appendChild(clone);
}



//displays inputfields for login
function showLoginForm(){

  let form = document.getElementById("loginDiv");
  form.style.display = "";
  login.style.display = "none";

}
