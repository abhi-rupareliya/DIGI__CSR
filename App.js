require("./Database/Connection");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./Routes/AuthRoutes')(app)
require('./Routes/ProfileRoutes')(app)
app.listen(PORT, () => {
  console.log("Server listening...",);
});