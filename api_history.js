const queryHistoryClientPromise = (database, userCode) => {
    return new Promise((resolve, reject) => {
      let queryValue = [userCode];
      const sql = 'SELECT * FROM REQUEST WHERE clientCode = ?'
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
      const sql = 'SELECT * FROM REQUEST WHERE tutorCode = ?'
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }

  module.exports = {queryHistoryClientPromise, queryHistoryTutorPromise}