const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


require("./db/conn");
const Register = require("./models/register");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
// const templates_path = path.join(__dirname,"../templates/views");
// const partials_path = path.join(__dirname,"../templates/partials");
// app.use('/favicon.ico', express.static('images/favicon.ico'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
// app.set("views", templates_path);
// hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/register", async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password===cpassword){
            const registerData = new Register({
                fullname:req.body.fullname,
                username:req.body.username,
                email:req.body.email,
                phnumber:req.body.phnumber,
                password:password,
                gender:req.body.gender
            })
            

            const registered = await registerData.save();
            res.status(201).render("index");
        }else{
            res.send("Password and Confirm Password are not same!")
        }

    } catch(err){
        res.status(400).send(err);
    }
})
app.post("/login", async(req,res)=>{
    try{
        const user = req.body.uname;
        const password = req.body.psw;

        const useremail = await Register.findOne({username:user});
        if(useremail.password===password){
            // res.status(201).render("index");
            res.send(`Hello ${user}`);
        }else{
            res.send("Invalid password!");
        }
    } catch(err){
        res.status(400).send("Invalid user credentials!");
    }
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})