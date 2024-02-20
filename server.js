const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const database = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ngaymai123',
  database: 'EduLink',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const {queryClientPromise, queryTutorPromise} = require('./api_login.js');

/*The API first check whether there is a userType. Then it checks whether 
the user with the email address and password exist in the database. 
If they exist, the api sends back a json which include the userCode and userType*/
app.post('/api/login/?:userType', (req,res) => {
    let userType = req.params.userType;
  
    if (userType === undefined) {
      return;
    }

    let body = req.body;

    if (!("email" in body) || !("password" in body)) {
      return;
    }

    let inputEmail = body.email;
    let inputPassword = body.password;

    if (userType === "client") {
      queryClientPromise(database, inputEmail, inputPassword)
      .then(result => {
        if (result.length === 0) {
          const error = new Error("No User Found");
          error.status = 404;
          return res.status(error.status).json({error : error.message});
        }

        res.json({
          userCode: result[0].clientCode,
          userEmail: result[0].clientEmail,
          userName: result[0].clientName,
          userPhone: result[0].clientPhone,
          membershipEnd: result[0].membershipEnd
        })
      })
      .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error");
        error.status = 500;
        return res.status(error.status).json({error : error.message});
      })
    }

    if (userType === "tutor") {
      queryTutorPromise(database, inputEmail, inputPassword)
      .then(result => {
        if (result.length === 0) {
          const error = new Error("No User Found");
          error.status = 404;
          return res.status(error.status).json({error : error.message});
        }

        res.json({
          userCode: result[0].tutorCode,
          userEmail: result[0].tutorEmail,
          userName: result[0].tutorName,
          userPhone: result[0].tutorPhone,
          membershipEnd: result[0].membershipEnd
        })
      })
      .catch(dbError => {
        console.log(dbError);
        const error = new Error("Internal Server Error");
        error.status = 500;
        return res.status(error.status).json({error : error.message});
      })
    }
})

const {insertUserPromise} = require('./api_register.js');

/*The API first check whether there is a userType. Then it insert the new 
user into the database. If succeeded, send a message, if not send an error.*/
app.post('/api/register/?:userType', (req,res) => {
  if (userType === undefined) {
    return;
  }

  let body = req.body;

  let requiredValue = ["email", "name", "phone", "membershipEnd", "password", "cardNumber", "cardExpMonth", "cardExpYear"]
  for (let i = 0; i < requiredValue.length; i++) {
    if (!(requiredValue[i] in body)) {
      return res.send("Unavailable");
    } 
  }

  insertUserPromise(
    database,
    userType,
    body.email,
    body.name,
    body.phone,
    body.membershipEnd,
    body.password,
    body.cardNumber,
    body.cardExpMonth,
    body.cardExpYear,
  )
  .then(result => {
    console.log(result);
    res.json({message: "Operation Register Complete"})
  })
  .catch(dbError => {
    console.log(dbError);
    const error = new Error("User Already Existed");
    error.status = 409;
    res.status(error.status).json({error: error.message});
  })
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