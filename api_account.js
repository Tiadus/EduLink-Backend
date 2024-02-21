const queryClientInformationPromise = (database, userCode) => {
    return new Promise((resolve,reject) => {
      let queryValue = [userCode];
      const sql = 'SELECT * FROM APP_CLIENT WHERE clientCode = ?';
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const queryTutorInformationPromise = (database, userCode) => {
    return new Promise((resolve, reject) => {
      let queryValue = [userCode];
      const sql = 'SELECT * FROM APP_TUTOR WHERE tutorCode = ?';
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };

  module.exports = {queryClientInformationPromise, queryTutorInformationPromise}