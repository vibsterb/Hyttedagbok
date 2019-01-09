const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(app.get('port'), function(){
	console.log('hyttedagbok running on', app.get('port'));
});
