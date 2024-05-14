const express = require('express')
const App = express()
const ejs = require('ejs')
let PORT = 3000

App.set('view engine', 'ejs')

App.use(express.static('public'))

App.get('/signin', (req, res)=>{
    res.render('signin')
})
App.get('/signup', (req, res)=>{
    res.render('signup')
})

App.get("/index", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

App.get('/welcome', (req,res)=>{
    res.send('Welcome to node class')
})
App.get('/', (res,req)=>{
    console.log('You are in the Home page');
})



App.listen(PORT, ()=>{
    console.log('App running on port '+ PORT);
})

