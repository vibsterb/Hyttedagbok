"use strict"

//----- Start header elements -----
let menu = document.getElementById("menu");

let menuBtn = document.getElementById("menuBtn");
menuBtn.onclick = showMenuContent;

let menuBack = document.getElementById("menuBack");
menuBack.onclick = showMainMenu;

let logout = document.getElementById("logout");
logout.onclick = logOut;

//----- End header elements -----

templateController();

function templateController(){
  let activeUser = localStorage.getItem("user");

  //Check that user is a valid user
  if(activeUser){
    checkUser(activeUser);
  }
  else {
    addTemplate("startTemplate");
    showStartUp();
  }
}

//Displays loginbutton and loginform
function showStartUp(){
  menu.style.display = "none";

  let login = document.getElementById("loginStart");
  login.onclick = showLoginForm;
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
  let login = document.getElementById("loginStart");
  let form = document.getElementById("loginDiv");
  form.style.display = "";
  login.style.display = "none";

  let loginForm = document.getElementById("loginForm");
  loginForm.onsubmit = loginUser;
}

//log out of application
function logOut(){
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  templateController();
}

//show content of headermenu
function showMenuContent(){
  let content = document.getElementById("menu-content");
  content.style.display = "block";
}

//hide menu when clicking outside of headermenu
window.onclick = function(event) {
  if (!event.target.matches('#menuImg')) {
    document.getElementById("menu-content").style.display = "none";
  }
}

//Shows content of main menu
function showMenu() {
  menu.style.display = "block";
  let calButton = document.getElementById("calButton");
  calButton.onclick = showCalendar;

  let user = JSON.parse(localStorage.getItem("user"));
  if(user.role === 'admin'){
    let adm = document.getElementById("userAdmin");
    adm.style.display = "";
    adm.onclick = showAdmin;
  }
}

//Shows main menu template
function showMainMenu(){
  addTemplate("menuTemplate");
  showMenu();
}

//Shows admin page template
function showAdmin(){
  addTemplate("admin");
  userAdmin();
}

//Shows calendar template
function showCalendar(){
  addTemplate("calTemplate");
  calView();
}
