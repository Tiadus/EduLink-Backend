const queryRequestTuTorPromise = (database) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM REQUEST WHERE requestStatus = 1"
      database.query(sql, [], (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
    })
  }
  
  const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
  }
  
  const haversine = (lat1, lon1, lat2, lon2) => {
    // Radius of the Earth in kilometers
    const R = 6371.0;
    
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    
    // Haversine formula
    const dLon = lon2Rad - lon1Rad;
    const dLat = lat2Rad - lat1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }
  
  const getRequestNearTutor = (tutorLat, tutorLon, dbRequest) => {
    let requestNearTutor = []
    for (let i = 0; i < dbRequest.length; i++) {
      let dbLat = dbRequest[i].requestLatitude;
      let dbLon = dbRequest[i].requestLongitude;
      let distance = haversine(tutorLat, tutorLon, dbLat, dbLon);
      if (distance < 50) {
        requestNearTutor.push(dbRequest[i]);
      }
    }
  
    return requestNearTutor;
  }

module.exports = {queryRequestTuTorPromise, toRadians, haversine, getRequestNearTutor}