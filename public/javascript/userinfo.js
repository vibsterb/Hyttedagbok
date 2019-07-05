//----- Login user -----
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
      showMainMenu();
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

//----- Check userinfo -----
async function checkUser(user){
  let userObj = JSON.parse(user);

 try {
    let response = await fetch("/app/user/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        userid: userObj.id,
        username: userObj.username,
        role: userObj.role
      })
    });

    let data = await response.json();

    if(response.status === 200){
      //bruker finnes med riktige opplysninger
      //console.log(data.fullname);
      showMainMenu();
    }
    else if(response.status === 500){
      //console.log(data.message);
      logOut();

    }
  } catch(err){
    console.log(err);
  }
}
