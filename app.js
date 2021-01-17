//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();
var post_list=[];
var new_post={
  new_title:"No Entry so far!",  new_content:"Why the wait? What are you waiting for? Put those grey cells to the test!"};
post_list.push(new_post);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
  res.render("home",{  post_list_markup:post_list,});
})

app.get("/compose",function(req, res){
  res.render("compose");
})

app.get("/posts/:p_name", function(req, res){


  post_list.forEach(function(i){

  if(_.lowerCase(i.new_title)===_.lowerCase(req.params.p_name))
  res.render("post",{post_content_markup : i});
else{
  console.log("Match Not Found!");
}}
)

})

app.get("/about",function(req, res){
  res.render("about");
})


app.get("/contact",function(req, res){
  res.render("contact");
})

var count=0;

app.post("/compose",function(req,res){
  if(count==0){
    post_list.pop();
    count=1;
  }
var new_post={
  new_title:req.body.ptitle,  new_content:req.body.pcontent
};
post_list.push(new_post);
res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
