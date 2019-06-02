const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require("./modules/dbconnect.js");
const auth = require("./modules/authenticate.js");
const users = require("./modules/users.js");

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(auth);
app.use(users);

app.listen(app.get('port'), function(){
	console.log('hyttedagbok running on', app.get('port'));
});
