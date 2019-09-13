/*----- authenticate.js -----*/

// loginUser
METHOD: GET
ENDPOINT: /app/authenticate
HEADERS (json): {"username": string, "password": string}
RESPONSE (json): {user{"id": int, "fullname": string, "username": string,
"email": string, "role": string}, token{"token": string}}


/*----- users.js -----*/

// updateUser
METHOD: POST
ENDPOINT: /app/user/updatePassword
BODY (json):  {"username": string, "password": string}
RESPONSE (json):

//getUser
METHOD: POST
ENDPOINT: /app/user/getUser
BODY (json):  {"userid": int, "username": string, "role": string}
RESPONSE (json): {"fullname": string}

/*----- events.js -----*/

// createEvent
METHOD: POST
ENDPOINT: /app/event/createEvent
BODY (json):  {"description": string, "eventtime": string, "createdby": string}
RESPONSE (json): {"eventid": int}
