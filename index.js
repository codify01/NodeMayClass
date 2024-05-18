const express = require('express')
const App = express()
const ejs = require('ejs')
let PORT = 3000
const mongoose = require('mongoose')
let URI = "mongodb+srv://amoleuthman:Jhmaarsof@cluster0.xkg3cvj.mongodb.net/mayClass_db?retryWrites=true&w=majority&appName=Cluster0"
App.set('view engine', 'ejs')

App.use(express.urlencoded({extended: true}))

App.use(express.static('public'))

userSchema = mongoose.Schema(
    {
        fullName: {type:String, required:true, },
        email: {type:String, required:true, unique:true },
        password: {type:String, required:true, }
    }
)
const userModel = mongoose.model('user', userSchema)
mongoose.connect(URI).then(
    ()=>{
        console.log('Connected');
    }
).catch(
    (err)=>{ 
        console.log('not connected');
        console.log(err);
    }
)
App.get('/signin', (req, res)=>{
    res.render('signin')

})
App.post('/register', (req,res)=>{
    console.log('I am working');
    // console.log(req.body);
    let user = new userModel(req.body)
    user.save().then(
        (response)=>{
            console.log(response);
            console.log('success');
        }
    ).catch(
        (err)=>{
            console.log(err);
        }
    )
}) 

App.post('/login', (req,res)=>{
    console.log('working');
    console.log(req.body.email);
    userModel.findOne({email:req.body.email})
    .then((result)=>{
        console.log('Result:',result  );
        if(result.password === req.body.password){
        res.render('index', {name:result.fullName})
        
        }else {
            res.send(
                {
                    message:'Invalid Password'
                }
            )
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})
App.get('/signup', (req, res)=>{
    res.render('signup')
})

App.get("/index", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
App.get('/welcome', (req,res)=>{
    res.render('index')
    // res.send('Welcome to node class')
})
App.get('/', (res,req)=>{
    console.log('You are in the Home page');
})



App.listen(PORT, ()=>{
    console.log('App running on port '+ PORT);
})

