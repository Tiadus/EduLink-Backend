const queryActiveRequestClientPromise = (database, userCode) => {
    return new Promise((resolve, reject) => {
      let queryValue = [userCode];
      let sql = 'SELECT * FROM REQUEST WHERE clientCode = ? AND requestStatus NOT IN (0,5)';
      database.query(sql, queryValue, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const queryActiveRequestTutorPromise = (database, userCode) => {
    let queryValue = [userCode, userCode];
  
    let sql1 = 'SELECT REQUEST.requestCode, REQUEST.requestStatus, REQUEST.requestFee, REQUEST.requestAddress \
                FROM REQUEST JOIN REQUEST_TUTOR \
                ON REQUEST.clientCode = REQUEST_TUTOR.clientCode \
                AND REQUEST.requestCode = REQUEST_TUTOR.requestCode \
                WHERE requestStatus = 2 AND REQUEST_TUTOR.tutorCode = ?'
    
    let sql2 = 'SELECT REQUEST.requestCode, REQUEST.requestStatus, REQUEST.requestFee, REQUEST.requestAddress \
                FROM REQUEST WHERE requestStatus IN (3,4) AND REQUEST_TUTOR.tutorCode = ?'
    
    const sql = sql1 + " UNION " + sql2;
  
    database.query(sql,queryValue, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    })
  }

  module.exports = {queryActiveRequestClientPromise, queryActiveRequestTutorPromise}