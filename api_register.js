const insertUserPromise = (database, userType, email, name, phone, membershipEnd, password, cardNumber, cardExpMonth, cardExpYear) => {
    return new Promise((resolve,reject) => {
      const queryValue = [email, name, phone, membershipEnd, password, cardNumber, cardExpMonth, cardExpYear];
  
      let sql = "";
      if (userType === "client") {
        sql = "CALL register_client(?, ?, ?, ?, ?, ?, ?, ?);"
      }
  
      if (userType === "tutor") {
        sql = "CALL register_tutor(?, ?, ?, ?, ?, ?, ?, ?);"
      }
  
      database.query(sql, queryValue, (error,result) => {
        if (error) {
          return reject(error);
        }
  
        resolve(result);
      })
    })
  }

  module.exports = {
    insertUserPromise
  }