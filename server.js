const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req,res) => {
    res.send("Welcome To EduLink Backend");
})

/*The API first check whether there is a userType. Then it checks whether 
the user with the email address and password exist in the database. 
If they exist, the api sends back a json which include the userCode and userType*/
app.post('/api/login/?:userType', (req,res) => {
    
})

/*The API first check whether there is a userType. Then it insert the new 
user into the database. If succeeded, send a message, if not send an error.*/
app.post('/api/register/?:userType', (req,res) => {

})


/*The API first check whether there is a userType and userCode. Then it get 
the accounts from either the APP_CLIENT or APP_TUTOR in the database based on the information.*/
app.get('/api/account/?:userType/?:userCode', (req,res) => {

})

/*The API first check whether there is a userType and userCode. Then it get
the active requests from the REQUEST table for clients or the active requests
from both the REQUEST and REQUEST_TUTOR table for tutors*/
app.get('/api/active/?:userType/?:userCode', (req,res) => {

})

/*The API first check whether there is a userType and userCode. Then it get
the archived requests from the REQUEST table*/
app.get('/api/history/?:userType/?:userCode', (req,res) => {

})

/*The API first check whether there is a userType and userCode. Then it get
the current awaiting tutor requests from the REQUEST table*/
app.get('/api/request/?:userType/?:userCode', (req,res) => {

})

/*The API first check whether there is a userCode.
Then it create a booking code along with geocoding the address 
and insert it along with the information from the booking into 
the database.*/
app.post('/api/booking/?:userCode', (req,res) => {

})

/*The API first check whether there is a userType and userCode.
Then it get the query 'oid' and return the information of the order.*/
app.get('/api/order/?:userType/?:userCode', (req,res) => {

})

/*The API first check whether there is a userType, userCode and actionType.
Then it change the status of the request to match the action and userType.*/
app.post('/api/order/?:userType/?:userCode/?:actionType', (req,res) => {

})

app.listen(4000, () => {
    console.log("Listening On Port 4000");
})