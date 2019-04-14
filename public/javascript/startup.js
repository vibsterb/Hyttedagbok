"use strict"
let menu = document.getElementById("menu");

templateController();

let login = document.getElementById("loginStart");
login.onclick = showLoginForm;

let loginForm = document.getElementById("loginForm");
loginForm.onsubmit = loginUser;

function templateController(){
  addTemplate("startTemplate");
  menu.style.display = "none";
}

function loginUser(evt) {
  evt.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  addTemplate("calTemplate");
  calView();
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
