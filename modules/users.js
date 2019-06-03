const express = require('express')
const router = express.Router();
const db = require("./dbconnect.js");
const auth = require('./authenticate.js');

router.post('/app/user/updatePassword', auth.verifyToken, auth.crypt, async function(req, res, next){

  let username = req.body.username;
  let password = req.hashed;

  try {

    let sql =  `update public."Users" set password = '${password}'
    where username = '${username}' returning fullname;`;

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
