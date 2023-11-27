const express = require("express");
const connectDb = require("./db/db");
const bookRoutes = require("./routes/bookRoutes");
require("dotenv").config();
const app = express();

//middleware
app.use(express.json());

//Db connection
connectDb();

//routes
app.use("/api/book", bookRoutes);

app.listen(3000, () => {
  console.log("Server in running on port : 3000");
});
