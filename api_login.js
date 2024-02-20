const queryClientPromise = (database, inputEmail, inputPassword) => {
    return new Promise((resolve,reject) => {
      const queryValue = [inputEmail, inputPassword]
      const sql = 'SELECT APP_CLIENT.clientCode, clientEmail, clientName, clientPhone, membershipEnd \
                  FROM APP_CLIENT JOIN CLIENT_PASSWORD ON APP_CLIENT.clientCode = CLIENT_PASSWORD.clientCode \
                  WHERE clientEmail LIKE ? AND clientPassword LIKE ?';
    
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const queryTutorPromise = (database, inputEmail, inputPassword) => {
    return new Promise((resolve,reject) => {
      const queryValue = [inputEmail, inputPassword]
      const sql = 'SELECT APP_Tutor.tutorCode, tutorEmail, tutorName, tutorPhone, membershipEnd \
                  FROM APP_Tutor JOIN Tutor_PASSWORD ON APP_Tutor.tutorCode = Tutor_PASSWORD.tutorCode \
                  WHERE tutorEmail LIKE ? AND tutorPassword LIKE ?';
    
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }

  module.exports = {
    queryClientPromise,
    queryTutorPromise
  }