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

//-------------- Login user------------
async function loginUser(evt){
  evt.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let credentials = `Basic ${ btoa(username + ":" + password)}`;


  try{
    let response = await fetch("/app/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": credentials
      }
    });

    let data = await response.json();
    if(response.status === 200){
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      addTemplate("menuTemplate");
      showMenu();

    }
    else if(response.status === 401){
      console.log(data.message);
    }
    else if(response.status === 500){
      console.log(data.message);
    }
  }
  catch(error) {
    console.log(error);
  }

}

/*function loginUser(evt) {
  evt.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  addTemplate("calTemplate");
  calView();
}*/

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

function showMenu() {

let calButton = document.getElementById("calButton");
calButton.onclick = showCalendar;

//let updateForm = document.getElementById("updUser");
//updateForm.onsubmit = updateUser;

let user = JSON.parse(localStorage.getItem("user"));
  if(user.role === 'admin'){
    let adm = document.getElementById("userAdmin");
    adm.style.display = "";
    adm.onclick = showAdmin;

  }

}

function showAdmin(){
    addTemplate("admin");
    userAdmin();
}


function showCalendar(){

  addTemplate("calTemplate");
  calView();
}
