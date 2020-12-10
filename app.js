

const express = require('express')
var app = express();
app.use(express.json());
const usersRouter = require('./routes/users');
const cors = require('cors');
app.use("/api/users",cors(),usersRouter);
const db = require("./models");
db.sequelize.sync();

app.get("/api", (req,res)=>{
  res.json({
    success:1,
    message:"This Rest API is Working"
  })
})

app.listen(4000,()=>{
  console.log("Server is running")
})

module.exports = app;
