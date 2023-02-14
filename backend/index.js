const express= require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require('express-session')
var bodyParser = require('body-parser')
const cors = require('cors')
const fs = require("fs");


const url = 'mongodb://127.0.0.1:27017/ionic';
mongoose.connect(url)
const db = mongoose.connection;
db.on('open',()=>console.log('database is connected'))
db.on('error',()=>console.log('db connection failed'))
const app=express();
app.use(cors());
app.use(function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
})
app.use(session({
  secret: 'fajdflalsdfjoifnkenkbdfkasdofmcbisygweo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))




// app.set('view engine','ejs');
// app.use(express.static('public'));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json({ limit: "5mb" }));



app.get( '/',(req,res)=>{
  app.locals.message=req.session.message
  res.render('login');
})



app.post('/login', async(req,res)=>{
  data = req.body
  console.log(data)
  let founduser = await(await db.collection('user').find({'email':data.email})).toArray() 
  console.log(founduser)
  if(founduser.length>0){
     if( bcrypt.compareSync(data.password,founduser[0]?.password)){
      // req.session.message ="Successfully logged In"
      // req.session.user = founduser
      res.send({'message':'successfully log in','status':100})
      
     }
     else{
      // req.session.message ="Incorrect Password"
      res.send({'message':'password incorrect','status':404})
     }
  }
  else{
      // req.session.message ="Invalid User Credentials"
      res.send({'message':'User not found','status':403})
  }
})
// app.get('/register',(req,res)=>{
//   app.locals.message =  req.session.message
//   console.log(app.locals.message);
//   res.render('register')
// });
app.post("/register",async(req,res)=>{
  let data = req.body
  let founduser = await(await db.collection('user').find({'email':data.email})).toArray()
  console.log(founduser)
  if(founduser.length>0){
      return res.send({'message':'user already exists','status':403})
      
  }
  
      
      
  let user = {
      'email': data.email,
      'username':data.username,
      'password':bcrypt.hashSync(data.password,10),
      'gender':data.gender,
      'mobilenumber':data.mobilenumber,
  }
  db.collection('user').insertOne(user) 
  return res.send({'message':'user Registered successfully','status':100})
  });

  app.get('/usersList',async(req,res)=>{
    db.collection('user').find({}).toArray(function(result,err){
      if(err) return res.send(err);
      return res.send(result);
    })


  })
  
  app.get('/getstudentdetails',async(req,res)=>{
    db.collection('students_details').find({}).toArray(function(err,result){
      if(err) return
      res.send(result);
    })


  })

  app.get('/student-details',async(req,res)=>{
    db.collection('user').find({}).toArray(function(err,result){
      if(err) return;
      res.send(result);
      // db.close();
    })


  })

  app.post('/savestudent',async(req,res)=>{
    let data = req.body
    if(data.name){
      let founduser = await(await db.collection('students_details').aggregate(
          [
             {'$match':
                      {'$and':
                              [
                                  {'roll_no':data.roll_no},
                                  {'section':data.section},
                                  {'class':data.Class}
                                ]}}])).toArray()
      if(founduser.length>0){
        return res.send({'message':'Student already exists with this Roll No','status':403})
          
      }
      var profile_pic_name = await formatDate(new Date(Date.now())).toString()+`_${data.name}_profile_pic.jpg`
        var imageBuffer = await decodeBase64Image(data.selectedImage);
          
        await fs.writeFile(`../frontend/camera/src/assets/${profile_pic_name}`, imageBuffer.data, function(err) {
          if (err)
          {
            console.log(err);
            res.send({'message':`profile pic was not saved ${err}`,'status':403})
          }
           });
      let user = {
          'name':data.name,
          'email': data.email,
          'age':data.age,
          'class':data.Class,
          'section':data.section,
          'roll_no':data.rollno,
          'phone':data.phone,
          'gender':data.gender,
          'profile_pic_name':profile_pic_name
      }
      await db.collection('students_details').insertOne(user)
      return res.send({'message':'Student Details saved successfully','status':100})
    }
  

  })



  

  




  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    
    return response;
    }
    
      
function formatDate(date) {
var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [year, month, day].join('');
}


app.listen(5000,()=>console.log('server is running on port 5000...'))