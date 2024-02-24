const queryClientPromise = (database, inputEmail, inputPassword) => {
    return new Promise((resolve,reject) => {
      const queryValue = [inputEmail, inputPassword]
      const sql = 'SELECT APP_CLIENT.clientCode \
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
      const sql = 'SELECT APP_TUTOR.tutorCode \
                  FROM APP_TUTOR JOIN TUTOR_PASSWORD ON APP_TUTOR.tutorCode = TUTOR_PASSWORD.tutorCode \
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