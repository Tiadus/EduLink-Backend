const queryHistoryClientPromise = (database, userCode) => {
    return new Promise((resolve, reject) => {
      let queryValue = [userCode];
      const sql = 'SELECT * FROM REQUEST WHERE clientCode = ? AND requestStatus = 5'
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const queryHistoryTutorPromise = (database, userCode) => {
    return new Promise((resolve, reject) => {
      let queryValue = [userCode];
      const sql = 'SELECT * FROM REQUEST WHERE tutorCode = ? AND requestStatus = 5'
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }

  module.exports = {queryHistoryClientPromise, queryHistoryTutorPromise}