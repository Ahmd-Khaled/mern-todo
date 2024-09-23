const express = require("express");
require("express-async-errors")
const app = express();
const port = process.env.PORT || 5500;
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()

// Connecting to MongoDb through Mongoose
require("./db")

const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");

// Express Middleware
// app.use(express.static("public")); // used for serving static files from inside root directory (public)
app.use(express.json());          // for parsing body for incoing request with json payload (data) 
app.use(express.urlencoded());    // for parsing body for incoing request with urlencoded (from the browser) payload (data) 
app.use(morgan("combined"));      // for logging
app.use(cors());                  // to allow localhost or frontend domain

app.use("/users", userRoutes)
app.use("/todos", todosRoutes)

// Middleware
// app.use((req, res, next) => {
//   console.log("____________________________________");
//   console.log(`Request run on ${new Date()}`);
//   console.log("____________________________________");
//   next();
// });

// app.get("/", (req, res) => {
//   //   res.send({
//   //     name: "Ahmed",
//   //     age: 35
//   //   })
//   res.send("<h1>Hi, Ahmed1</h1>");
// });

// app.get("/image", (req, res) => {
//   const imgPath = path.join(__dirname, "nature.jpeg");
//   res.sendFile(imgPath);
// });


// Global error handler
app.use((err, req, res, next) => {
  console.log("Error: ", err);
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal server error",
    errors: err?.errors || []
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
