const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");
const ejs = require("ejs");
var mongoose=require("mongoose");

const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/mini",{useNewUrlParser:true});

app.get("/",function(req,res){
res.render("index");
});

app.post("/failure",function(req,res){
res.redirect("/");
});
app.get("/about",function(req,res){
	res.render("about");
});
app.get("/blog",function(req,res){
	res.render("blog");
});
app.get("/contact",function(req,res){
	res.render("contact");
});
app.get("/gallery",function(req,res){
	res.render("about");
});
app.get("/donate",function(req,res){
	res.render("donate");
});
app.get("/register",function(req,res){
	res.render("register");
});

const memberSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    gender:String,
    country:String,
    });
    
    const Member=mongoose.model("member",memberSchema);
    app.post("/reg",function(req,res){
        const myMember =new Member({
           firtnName:req.body.firstName,
           lastName:req.body.lastName,
           email:req.body.email,
           password:req.body.password,
           gender:req.body.gender,
           country:req.body.country,
           
       });
       myMember.save();
       
       res.redirect("/");
    });
    const donateSchema= mongoose.Schema({
        Name:String,
        address:String,
        email:String,
        city:String,
        postcode:String,
        country:String,
        amount:String,
        type:String,
        method:String
        });
        
        const Donate=mongoose.model("dononation",donateSchema);
        app.post("/donate",function(req,res){
            const myDonation =new Donate({
               Name:req.body.Name,
               address:req.body.address,
               email:req.body.email,
               city:req.body.city,
               postcode:req.body.postcode,
               country:req.body.coutry,
               amount:req.body.amount,
               type:req.body.type,
               method:req.body.method
               
           });
           myDonation.save();
           
           res.redirect("/");
        });


        app.get("/post/:postName",function(req,res){
            const requestedPost= req.params.postName;
            console.log(requestedPost);
           Post.findOne({title:requestedPost},function(err,post){
               //console.log(post);
                if(_.lowerCase(post.title)==_.lowerCase(req.params.postName)){
                    console.log("match found");
                    res.render("post",
                        {singleTitle:post.title,
                        singleContent:post.content
                    })
                }
                })
             })
    

app.listen(process.env.PORT || 3000,function(){
console.log("server is running on port 3000");
});

