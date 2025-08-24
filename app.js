const express = require("express");
const userRoute = require("./routes/userRoute.js");
const customerRoute = require("./routes/customerRoute.js")
const passwordRoute = require("./routes/passwordResetRoutes.js")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(304).json("Hello Express!");
});

app.use('/api/v1/user',userRoute);
app.use('/api/v1/password',passwordRoute);
app.use('/api/v1/customer',customerRoute);
module.exports = app;
