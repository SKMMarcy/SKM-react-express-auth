const getSignedUpEvents = async (req, res) => {
    const { 
      db: { Event }, // this req.db.User property is put here by the addModelsToRequest middleware
      params : {userId}
    } = req; 
    console.log("ok", userId)
  
    const events = await Event.signedUpEvents(userId);
    res.send(events);
  };
  
  module.exports = getSignedUpEvents;