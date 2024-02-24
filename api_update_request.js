const updateRequestClientPromise = (database, userCode, requestCode, actionType, tutorCode, reviewRating, reviewComment) => {
    return new Promise((resolve, reject) => {
      let queryValue = [];
      let sql = "UPDATE REQUEST "
      switch(actionType) {
        case 0:
          sql += "SET requestStatus = 0 WHERE clientCode = ? AND requestCode = ? AND requestStatus NOT IN (0,3,4)";
          queryValue = [userCode, requestCode]
          break;
        case 2:
          sql += "SET requestStatus = 2, tutorCode = ? WHERE clientCode = ? AND requestCode = ? AND requestStatus IN (1)";
          queryValue = [tutorCode, userCode, requestCode];
          break;
        case 4:
          sql += "SET requestStatus = 4, requestRating = ?, requestReview = ? WHERE clientCode = ? AND requestCode = ? AND requestStatus = 3";
          queryValue = [reviewRating, reviewComment, userCode, requestCode];
        default:
          break;
      }
  
      database.query(sql, queryValue, (error,result) => {
        if (error) {
          return reject(error);
        }
        if (result.affectedRows === 0) {
          const error = new Error("No Row Updated");
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const updateRequestTutorPromise = (database, userCode, requestCode, actionType) => {
    return new Promise((resolve, reject) => {
      let queryValue = [];
      let sql = ""
      switch(actionType) {
        case 2:
          sql += "INSERT INTO REQUEST_TUTOR VALUES(?, ?)";
          queryValue = [requestCode, userCode]
          break;
        case 3:
          sql += "SET requestStatus = 3 WHERE requestCode = ? AND requestStatus IN (2)";
          queryValue = [requestCode];
          break;
        default: 
          break;
      }
  
      database.query(sql, queryValue, (error,result) => {
        if (error) {
          return reject(error);
        }
        if (result.affectedRows === 0) {
          const error = new Error("No Row Updated");
          return reject(error);
        }
        resolve(result);
      })
    })
  }

  module.exports = {updateRequestClientPromise, updateRequestTutorPromise}