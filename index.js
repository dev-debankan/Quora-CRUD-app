const express = require("express");
const app= express();
const port= process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); 
const methodOverride= require ("method-override");
 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[

    {
        id: uuidv4(),
        username:"John Doe",
        content:"First post!"
    },
     {
         id: uuidv4(),
        username:"Richard Roe",
        content:"second post!"
    },
     {
         id: uuidv4(),
        username:"Fred Bloggs",
        content:"third post!"
    }

];

// app.get("/home",(req,res)=>{
//     res.send("Hello World");
// });


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts:posts});
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{  
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);  
    if(post){
        res.render("show.ejs",{post});
    }else{
        res.status(404).send("Post not found");
    }
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(post){
        let newcontent=req.body.content;
     
        post.content=newcontent;
        res.redirect("/posts");
    }   else{
        res.status(404).send("Post not found");
    }
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
    

})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})