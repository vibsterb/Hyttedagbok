const express = require('express')
const router = express.Router();
const db = require("./dbconnect.js");
const auth = require('./authenticate.js');

router.post('/app/event/createEvent', auth.verifyToken, async function(req, res, next){

  let description = req.body.description;
  let eventtime = req.body.eventtime;
  let createdby = req.body.createdby;

  try{

    let sql = `insert into public."Events" ("description", "eventtime", "createdby")
    values('${description}', '${eventtime}', '${createdby}')
    returning "eventid";`;

    let data = await db.runQuery(sql);
    if(data){
      res.status(200).json(data[0]);
    }
    else {
      res.status(500).json({message: "something went wrong"});
    }
  }

  catch(err) {
    res.status(500).json({error: err});
  }

});

module.exports = router;
