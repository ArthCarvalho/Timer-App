const { db } = require('../firebase/admin');

// Get single timer entry
// Params:
// /:id - entry document ID
exports.getTimerSingleEntry = (request, response) => {
  let entryId = request.params.id;
  let entryData = {};
  db.doc(`/timer-entries/${entryId}`).get()
  .then(doc => {
    if(!doc.exists) {
      return response.status(404).json({ message: "Timer entry not found."});
    }
    entryData = doc.data();
    if(entryData.userId != request.user.uid){
      // Authenticated user is not creator of this entry
      // return 404 not found.
      return response.status(403).json({ message: "Timer entry does not belong to this user." });
    }
    entryData.entryId = entryId;
    return response.json(entryData);
  })
  .catch(error => {
    console.error(error);
    response.status(500).json(error);
  })
};

// Get a list of timer entries
// Query:
// ?limit - Maximum number of entries to return (default: 10)
// ?workspace - Filter by workspace id
// ?project - Filter by project id
// ?before - Get entries only from after specified date
// ?after - Get entries only from before specified date
exports.getTimerEntries = (request, response) => {
  let limit = request.query.limit;
  let beforeDate = request.query.before;
  let afterDate = request.query.after;
  if(!limit) {
    // No parameter defaults to 10
    limit = 10;
  } else {
    // Parse string into numerical value
    limit = parseInt(limit,10);
    // Limit "limit" to a safe range
    if(limit > 100) limit = 100;
    if(limit <= 0) return response.status(500).json({message: "Invalid parameter: limit can not be zero or below"})
  }
  console.log('getTimerEntries: limit=',limit);
  // Other options: todo

  let query = db.collection('timer-entries').where('userId', '==', request.user.uid);
  // Filter by workspace
  if(request.query.workspace) {
    console.log('getTimerEntries: filter by workspace ID', request.query.workspace);
    query = query.where('workspaceId', '==', request.query.workspace);
  }
  // Filter by project
  if(request.query.project) {
    console.log('getTimerEntries: filter by project ID', request.query.project);
    query = query.where('projectId', '==', request.query.project);
  }
  // Filter by starting date
  if(beforeDate) {
    console.log('getTimerEntries: filter by dates before', beforeDate);
    query = query.where('createdAt', '<=', beforeDate);
  }
  // Filter by ending date
  if(afterDate) {
    console.log('getTimerEntries: filter by dates after', afterDate);
    query = query.where('createdAt', '>=', afterDate);
  }
  query.orderBy('createdAt', 'desc')
  .limit(limit)
  .get()
  .then(data => {
    entryData = [];
    data.forEach(doc => {
      let data = doc.data();
      data.entryId = doc.id;
      entryData.push(data);
    })
    return response.json(entryData);
  })
  .catch(error => {
    console.error(error);
    return response.status(500).json(error);
  });
};
