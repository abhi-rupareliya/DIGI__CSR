require("./Database/Connection");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "*",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

require("./Routes/AuthRoutes")(app);
require("./Routes/ProfileRoutes")(app);
app.listen(PORT, () => {
  console.log("Server listening...");
});
