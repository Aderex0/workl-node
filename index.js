const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");

// Routes
const productsRoute = require("./routes/products");

mongoose.connect(
  "mongodb://127.0.0.1:27017/store",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Middleware
app.use(express.json());
app.use(helmet());

//GET
app.use("/api/products", productsRoute);

app.listen(8800, () => {
  console.log("Server is running");
});
