//This function create an order code based on the current server time
const createRquestCode = (userCode) => {
    // Get the current date and time
    const currentDate = new Date();
  
    // Extract date and time components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
    const second = String(currentDate.getSeconds()).padStart(2, '0');
  
    // Create the formatted string
    let formattedDateTime = `${year}${month}${day}${hour}${minute}${second}`;
  
    let requestCode = userCode.toString() + formattedDateTime;
  
    return requestCode;
  }
  
  const insertRequestPromise = 
  (database, clientCode, requestCode, tutorCode, subjectName, subjectPrice, requestDate, requestAddress, requestLatitude,
  requestLongitude, requestStatus, requestComment, requestCommissionFeePercent, requestFee, requestRating, requestReview) => {
    return new Promise((resolve, reject) => {
        const queryValues = [
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
        ];
        
        const sql = 
                `INSERT INTO REQUEST (
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        database.query(sql, queryValues, (error, result) => {
            if (error) {
                return reject(error);
            } 
            resolve(result);
        });
    });
  };

  module.exports = {createRquestCode, insertRequestPromise}