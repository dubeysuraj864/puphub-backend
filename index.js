// import express and morgan
const express = require("express");
const morgan = require("morgan");
require("./db/config")
const users = require("./db/users")
const products = require("./db/products")
// Bring in environmental variables
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();


const app = express();

const PORT = process.env.PORT || 4000;

// ALL YOUR MIDDLEWARE AND ROUTES GO HERE
app.use(cors())
app.use(morgan("tiny")); // middleware for logging
app.use(express.urlencoded({ extended: true })); //middleware for parsing urlencoded data
app.use(express.json()); // middleware for parsing incoming json
app.use("/static", express.static("static")); // to set a folder for static file serving

app.get("/", (req, res) => {
  res.send("Hello from node");
});

app.post("/register", async (req, res)=> {
    let user = await new  users(req.body)
    let result = await user.save()
    res.send(result);
})

app.post("/login", async (req, res)=> {
  console.log(req.body)
  if(req.body.email && req.body.password){
    let user = await users.findOne(req.body).select("-password")
    if(user){
      res.send({user })
    }
    else{
      res.send({result: "No user found"})
    }
  }
})

app.get("/products", async (req, res)=> {
  const product = await products.find();
  if(product.length > 0){
    res.send(product)
  }
  else{
    res.send({result : "No record found."})
  }
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
