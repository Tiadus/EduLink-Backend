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

const {queryClientInformationPromise, queryTutorInformationPromise} = require('./api_account.js')

/*The API first check whether there is a userType and userCode. Then it get 
the accounts from either the APP_CLIENT or APP_TUTOR in the database based on the information.*/
app.get('/api/account/?:userType/?:userCode', (req,res) => {
  if (userType === undefined || userCode === undefined) {
    return;
  }

  if (userType === "client") {
    queryClientInformationPromise(database, userCode)
    .then(result => {
      res.json(result[0]);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }

  if (userType === "tutor") {
    queryTutorInformationPromise(database, userCode)
    .then(result => {
      res.json(result[0]);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }
})

const {queryActiveRequestClientPromise, queryActiveRequestTutorPromise} = require('./api_active.js');

/*The API first check whether there is a userType and userCode. Then it get
the active requests from the REQUEST table for clients or the active requests
from both the REQUEST and REQUEST_TUTOR table for tutors*/
app.get('/api/active/?:userType/?:userCode', (req,res) => {
  if (userType === undefined || userCode === undefined) {
    return;
  }

  if (userType === "client") {
    queryActiveRequestClientPromise(database, userCode)
    .then(result => {
      res.json(result);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }

  if (userType === "tutor") {
    queryActiveRequestTutorPromise(database, userCode)
    .then(result => {
      res.json(result);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }
})

const {queryHistoryClientPromise, queryHistoryTutorPromise} = require('./api_history.js')

/*The API first check whether there is a userType and userCode. Then it get
the archived requests from the REQUEST table*/
app.get('/api/history/?:userType/?:userCode', (req,res) => {
  if (userType === undefined || userCode === undefined) {
    return;
  }

  if (userType === "client") {
    queryHistoryClientPromise(database, userCode)
    .then(result => {
      res.json(result);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }

  if (userType === "tutor") {
    queryHistoryTutorPromise(database, userCode)
    .then(result => {
      res.json(result);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }
})

const {queryRequestTuTorPromise, toRadians, haversine, getRequestNearTutor} = require('./api_request_tutor.js');

/*The API first check whether there is a userType and userCode. Then it get
the current awaiting tutor requests from the REQUEST table*/
app.get('/api/request/?:userType/?:userCode', (req,res) => {
  if (userType === undefined || userCode === undefined) {
    return;
  }

  if (req.query.lat === undefined || req.query.lon === undefined) {
    return;
  }

  if (userType === "tutor") {
    let tutorLat = req.query.lat;
    let tutorLon = req.query.lon;
    queryRequestTuTorPromise(database)
    .then(dbResult => {
      let requestNearTutor = getRequestNearTutor(tutorLat, tutorLon, dbResult);
      res.json(requestNearTutor);
    })
    .catch(dbError => {
      console.log(dbError);
      const error = new Error("Internal Server Error");
      error.status = 500;
      res.status(error.status).json({error: error.message});
    })
  }
})

const {createRquestCode, insertRequestPromise} = require('./api_booking.js');

/*The API first check whether there is a userCode.
Then it create a booking code insert it along with 
the information from the booking into the database.*/
app.post('/api/booking/?:userCode', (req,res) => {
  if (userCode === undefined) {
    return;
  }

  let body = req.body;

  let requiredValue = 
  ["subjectName",
  "subjectPrice",
  "requestDate",
  "requestAddress",
  "requestLatitude",
  "requestLongtitude",
  "requestStatus",
  "requestComment",
  "requestCommissionFeePercent",
  "requestFee",
  "requestRating",
  "requestReview"];

  for (let i = 0; i < requiredValue.length; i++) {
    if (!(requiredValue[i] in body)) {
      return res.send("Unavailable");
    } 
  }

  const clientCode = userCode;
  let requestCode = createRquestCode(userCode);
  const tutorCode = 0;
  const subjectName = body.subjectName;
  const subjectPrice = body.subjectPrice;
  const requestDate = body.requestDate;
  const requestAddress = body.requestAddress;
  const requestLatitude = body.requestLatitude;
  const requestLongitude = body.requestLongitude;
  const requestStatus = body.requestStatus;
  const requestComment = body.requestComment;
  const requestCommissionFeePercent = body.requestCommissionFeePercent;
  const requestFee = body.requestFee;
  const requestRating = body.requestRating;
  const requestReview = body.requestReview;

  insertRequestPromise(
    database,
    clientCode,
    requestCode,
    tutorCode,
    subjectName,
    subjectPrice,
    requestDate,
    requestAddress,
    requestLatitude,
    requestLongitude,
    requestStatus,
    requestComment,
    requestCommissionFeePercent,
    requestFee,
    requestRating,
    requestReview
  )
  .then(result => {
    console.log(result)
    res.json({message: "Operation Insert Complete"})
  })
  .catch(dbError => {
    console.log(dbError);
    const error = new Error("Internal Server Error");
    error.status = 500;
    res.status(error.status).json({error: error.message});
  })
  
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