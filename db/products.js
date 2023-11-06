const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    desc: String,

})

module.exports = mongoose.model("products", productSchema);