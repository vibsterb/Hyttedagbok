//oppretter ny event i databasen

async function dbEvent(text, time, user){
  console.log(text,time,user);

  try{
    let response = await fetch("app/event/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        description: text,
        eventtime: time,
        createdby: user
      })
    });

    let data = await response.json();
    if(response.status === 200){
      console.log(data);
    }
  }
  catch(error){
    console.log(error);

  }
}
