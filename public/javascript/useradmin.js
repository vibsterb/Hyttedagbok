function userAdmin(){

  let updateForm = document.getElementById("updUser");
  updateForm.onsubmit = updateUser;

}


//oppdaterer brukers passord
async function updateUser(evt){
  evt.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("newPassword").value;

  try {
    let response = await fetch("/app/user/updatePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    let data = await response.json();
    if(response.status === 200){
      console.log(data);
    }

  } catch(err){
    console.log(err);
  }
}
