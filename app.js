const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

// --Connect from cloud atlas with own uri e.g: "mongodb+srv://name:password@cluster.jjcyq.mongodb.net/blogDB?retryWrites=true&w=majority"
const uri =
  "INSERT URI";


const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your data entry, no title given."],
  },
  content: {
    type: String,
    required: [true, "Please check your data entry, no content written."],
  },
});

const Post = mongoose.model("Post", postSchema);

const defaultPost = new Post({
  title: "Welcome to the blog!",
  content: "Click compose to write a new blog.",
});

app.get("/", function (req, res) {
  Post.find(function (err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { homeContent: defaultPost, posts: foundPosts });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/subscription", function (req, res) {
  res.render("subscription");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save();

  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;

  Post.findOne({ _id: postId }, function (err, foundPost) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("Post", { foundPost: foundPost });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
