const queryClientOrderPromise = (database, userCode, requestCode) => {
    return new Promise((resolve, reject) => {
      const queryValue = [userCode, requestCode];
      const sql = 'SELECT * FROM REQUEST WHERE clientCode = ? AND requestCode = ?'
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }

  const queryRequestAcceptTuTorPromise = (database, requestCode) => {
    return new Promise((resolve,reject) => {
      let queryValue = [requestCode]
      const sql = "SELECT * FROM APP_TUTOR JOIN REQUEST_TUTOR ON APP_TUTOR.tutorCode = REQUEST_TUTOR.tutorCode WHERE requestCode = ?"
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result);
      })
    })
  }
  
  const queryTutorOrderPromise = (database, userCode, requestCode) => {
    return new Promise((resolve, reject) => {
      const queryValue = [requestCode, requestCode, userCode]
      const sql1 = 'SELECT * FROM REQUEST WHERE requestCode = ? AND requestStatus IN (1)'
      const sql2 = 'SELECT * FROM REQUEST WHERE requestCode = ? AND requestStatus IN (2,3,4) AND tutorCode = ?'
      const sql = sql1 + ' UNION ' + sql2;
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  module.exports = {queryClientOrderPromise, queryTutorOrderPromise, queryRequestAcceptTuTorPromise}