//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var _= require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/BlogDB");

const blogSchema= new mongoose.Schema({
  title:String,
  content:String
});


const blog=mongoose.model("blog",blogSchema);

const blog1=new blog({
  title:"Day 1",
  content:homeStartingContent
});

const blog2=new blog({
  title:"Day 2",
  content: contactContent
});

// blog2.save();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let s="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus";

app.get("/",function(req,res){
  

  blog.find({},function(err,result){
    if(!err){
      console.log(result);
      res.render("home",{
        blog:result
      });
    }
  })

 
  
});

let title_array=["Day 1","Day 2"];
let blog_array=[s,s];

app.get("/about-us",function(req,res){
  res.render("about");
});

app.get("/contact-us",function(req,res){
  res.render("contact");
});

app.get("/compose",function(req,res){
  res.render('compose');
  
})

app.get("/post/:day",function(req,res){
  let a=req.params.day;
  a=_.lowerCase(a);
  let b=-1;
  for(var i=0;i<title_array.length;i++){
    if(_.lowerCase(title_array[i])==a) {
      b=i;
      
    }
  }
  if(b===-1){
    res.redirect("/");
  }
  else{
    res.render("post",{
      title:title_array[b],
      blog:blog_array[b]
      
    })
  }
});


app.post("/",function(req,res){
  let title=req.body.title;
  let bod=req.body.blog;
  title_array.push(title);
  blog_array.push(bod);

  const blog_temp=new blog({
    title:title,
    content:bod
  })
  blog_temp.save();

  blog.find({},function(err,result){
    if(!err){
      console.log(result);
      res.render("home",{
        blog:result
      });
    }
  });

  

});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
