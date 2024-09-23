const mongoose = require('mongoose');

// Connecting to MongoDb through Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err))