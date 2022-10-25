const express = require('express');
const path = require("path"); 
const sessions = require('express-session');
const cookieParser = require('cookie-parser');  
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.listen(8000);
app.use(express.static("public"));
app.use("/image", express.static(path.join(__dirname + "public/image")));
app.set(cookieParser());
app.use(sessions({
    secret:"123",
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge:30000},
}));



let session;
const loginDetails = {
    username:"akshay",
    password:"123",
};

app.get('/',(req,res)=>{
    session=req.session;
    if(session.username){
        res.render('index_home');
    }else{
        res.render('index');
    }
});
app.post('/login',(req,res)=>{
    if(req.body.username===loginDetails.username&&req.body.password===loginDetails.password){
        session = req.session;
        session.username = req.body.username;
        console.log(req.session);
        res.redirect('home');
    }else{
        res.render('index',{err_message:"username or password incorrect"});
    }
});
app.get('/home',(req,res)=>{
    session=req.session;
    if(session.username){
        res.render('index_home');
    }else{
        res.render('index');
    }
});
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})


