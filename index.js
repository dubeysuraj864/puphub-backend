// import express and morgan
const express = require("express");
const morgan = require("morgan");
require("./db/config");
const users = require("./db/users");
const products = require("./db/products");
const admins = require("./db/admin");
// Bring in environmental variables
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 6000;  

// ALL YOUR MIDDLEWARE AND ROUTES GO HERE
app.use(cors());
app.use(morgan("tiny")); // middleware for logging
app.use(express.urlencoded({ extended: true })); //middleware for parsing urlencoded data
app.use(express.json()); // middleware for parsing incoming json
app.use("/static", express.static("static")); // to set a folder for static file serving

app.get("/", (req, res) => {
  res.send("Hello from node");
});

app.post("/register", async (req, res) => {
  let user = await new users(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/admin-sign-up", async (req, res) => {
  let admin = await new admins(req.body);
  let result = await admin.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await users.findOne(req.body).select("-password");
    if (user) {
      res.send({ user });
    } else {
      res.send({ result: "No user found" });
    }
  }
});

app.post("/admin-login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let admin = await admins.findOne(req.body).select("-password");

    if (admin) {
      res.send({ admin });
    } else {
      res.send({ result: "No admin found" });
    }
  }
});

app.post("/add-products", async (req, res) => {
  let product = await products(req.body);
  let result = await product.save();
  res.send({ result });
});

app.get("/products", async (req, res) => {
  const product = await products.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No record found." });
  }
});

app.get("/products/:id", async (req, res) => {
  const product = await products.findOne({_id: req.params.id});
  if (product) {
    res.send(product);
  } else {
    res.send({ result: "No record found." });
  }
});

app.delete("/products/:id", async (req, res) => {
  let product = await products.deleteOne({ _id: req.params.id });
  res.send(product);
});

app.put("/products/:id", async (req, res) => {
  let product = await products.updateOne(
    { _id: req.params.id },   
    { $set: req.body }
  );
  res.send(product);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
