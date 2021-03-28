const mongoose = require("mongoose");
const post = new mongoose.Schema({
    name: String,
    title: String,
    msg: String,
    tags: String,
    img: String,
    likes_count: Number,

});

module.exports = mongoose.model("Post", post);
