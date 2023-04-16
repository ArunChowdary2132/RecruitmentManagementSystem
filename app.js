


const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true}));


mongoose.connect("mongodb+srv://Placement:PlacementCell123@cluster0.rlcihoq.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const studentSchema = {
    reg: String,
    txt: String,
    phno: Number,
    email: String,
    pswd: String
}

const student = mongoose.model('student', studentSchema);



app.post('/student', function(req, res){
    let newStudent = new student({
        reg: req.body.reg,
        txt: req.body.txt,
        phno: req.body.phno,
        email: req.body.email,
        pswd: req.body.pswd,
        
    });
    newStudent.save();
    res.redirect("/student");
});

app.post('/studentlogin', async(req,res) => {
    try {
        const email = req.body.email;
        const pswd = req.body.pswd;
      const useremail =   await  student.findOne({ email: email});
      if(useremail.pswd === pswd){
        res.redirect('studentdash');
      }else{
        res.send('Password incorrect');
      }
    }catch(error){
        res.status(400).send('Invalid Credintials');
    }
});

const alumniSchema = {
    reg: String,
    txt: String,
    phno: Number,
    email: String,
    pswd: String
}

const alumni = mongoose.model('alumni', alumniSchema);



app.post('/alumni', function(req, res){
    let newAlumni = new alumni({
        reg: req.body.reg,
        txt: req.body.txt,
        phno: req.body.phno,
        email: req.body.email,
        pswd: req.body.pswd,
        
    });
    newAlumni.save();
    res.redirect("/alumni");
});

app.post('/alumnilogin', async(req,res) => {
    try {
        const email = req.body.email;
        const pswd = req.body.pswd;
      const useremail =   await  alumni.findOne({ email: email});
      if(useremail.pswd === pswd){
        res.render('alumnidash');
      }else{
        res.send('Password incorrect');
      }
    }catch(error){
        res.status(400).send('Invalid Credintials');
    }
});



const adminloginSchema = {
    reg: String,
    txt: String,
    phno: Number,
    email: String,
    pswd: String
}

const adminlogin = mongoose.model('adminlogin', alumniSchema);



app.post('/adminsignup', function(req, res){
    let newAdminlogin = new adminlogin({
        reg: req.body.reg,
        txt: req.body.txt,
        phno: req.body.phno,
        email: req.body.email,
        pswd: req.body.pswd,
        
    });
    newAdminlogin.save();
    res.redirect("/admin");
});

app.post('/admin', async(req,res) => {
    try {
        const email = req.body.email;
        const pswd = req.body.pswd;
      const useremail =   await  adminlogin.findOne({ email: email});
      if(useremail.pswd === pswd){
        res.render('admindash');
      }else{
        res.send('Password incorrect');
      }
    }catch(error){
        res.status(400).send('Invalid Credintials');
    }
});

app.get('/studentinfo', (req,res) =>{
    student.find({}) .then(students =>{
      res.render('studentinfo', {
        StudentsList: students,
      });
    });
  });

  app.get('/alumniinfo', (req,res) =>{
    alumni.find({}) .then(alumnis =>{
      res.render('alumniinfo', {
        AlumnisList: alumnis,
      });
    });
  });

  app.get('/delongoing', (req,res) =>{
    ongoing.find({}) .then(ongoings =>{
      res.render('delongoing', {
        OngoingsList: ongoings,
      });
    });
  });

app.post('/delongoing', function(req, res){
    const checkID = req.body.checkbox;
    ongoing.findByIdAndRemove(checkID).then(ongoings => {
        res.redirect('/admindash');
    });
});
  
app.post('/studentinfo', function(req, res){
    const checkID = req.body.checkbox;
    student.findByIdAndRemove(checkID).then(students => {
        res.redirect('/admindash#link1');
    });
});

app.post('/alumniinfo', function(req, res){
    const checkID = req.body.checkbox;
    alumni.findByIdAndRemove(checkID).then(alumnis => {
        res.redirect('/admindash');
    });
});

app.get('/delresults', (req,res) =>{
    result.find({}) .then(results =>{
      res.render('delresults', {
        ResultsList: results,
      });
    });
  });

app.post('/delresults', function(req, res){
    const checkID = req.body.checkbox;
    result.findByIdAndRemove(checkID).then(results => {
        res.redirect('/admindash');
    });
});
  


  const ongoingSchema = {
    companyname: String,
    salary: String,
    role: String,
    date: String,
    link: String
}

const ongoing = mongoose.model('ongoing', ongoingSchema);



app.post('/ongoing', function(req, res){
    let newOngoing = new ongoing({
        companyname: req.body.companyname,
        salary: req.body.salary,
        role: req.body.role,
        date: req.body.date,
        link: req.body.link  
    });
    newOngoing.save();
    res.redirect("/admindash");
});


const alumniformSchema = {
  name: String,
  companyname: String,
  salary: String,
  role: String,
}

const alumnidata = mongoose.model('alumnidata', alumniformSchema);



app.post('/alumniform', function(req, res){
  let newAlumnidata = new alumnidata({
    name: req.body.name,      
      companyname: req.body.companyname,
      salary: req.body.salary,
      role: req.body.role,
  
      
  });
  newAlumnidata.save();
  res.redirect("/alumniform");
});



const resultSchema = {
    companyname: String,
    salary: String,
    role: String,
    date: String,
    link: String
}

const result = mongoose.model('result', resultSchema);



app.post('/result', function(req, res){
    let newResult = new result({
        companyname: req.body.companyname,
        salary: req.body.salary,
        role: req.body.role,
        date: req.body.date,
        link: req.body.link
    
        
    });
    newResult.save();
    res.redirect("/admindash");
});


app.get('/studentdash', (req,res) =>{
    ongoing.find({}) .then(ongoings =>{
      res.render('studentdash', {
        OngoingsList: ongoings,
      });
    });
  });

  
app.get('/companyresults', (req,res) =>{
    result.find({}) .then(results =>{
      res.render('companyresults', {
        ResultsList: results,
      });
    });
  });


app.get("/", function(req,res){
    res.render("index");
});
app.get("/statistics", function(req,res){
    res.render("statistics");
});
app.get("/companies", function(req,res){
    res.render("company");
});
app.get("/about", function(req,res){
    res.render("about");
});
app.get("/contact", function(req,res){
    res.render("contact");
});
app.get("/student", function(req,res){
    res.render("student");
});
app.get("/alumni", function(req,res){
    res.render("alumni");
});
app.get("/admin", function(req,res){
    res.render("admin");
});
app.get("/studentlogin", function(req,res){
    res.render("studentlogin");
});
app.get("/alumnilogin", function(req,res){
    res.render("alumnilogin");
});
app.get("/admindash", function(req,res){
    res.render("admindash");
});
app.get("/studentinfo", function(req,res){
    res.render("studentinfo");
});
app.get("/alumniinfo", function(req,res){
    res.render("alumniinfo");
});
app.get("/studentdash", function(req,res){
    res.render("studentdash");
});
app.get("/myapplications", function(req,res){
    res.render("myapplications");
});
app.get("/ongoing", function(req,res){
    res.render("ongoing");
});
app.get("/delongoing", function(req,res){
    res.render("delongoing");
});
app.get("/results", function(req,res){
    res.render("results");
});
app.get("/companyresults", function(req,res){
    res.render("companyresults");
});
app.get("/delresults", function(req,res){
    res.render("delresults");
});
app.get("/adminsignup", function(req,res){
    res.render("adminsignup");
});
app.get("/alumnidash", function(req,res){
  res.render("alumnidash");
});
app.get("/alumniform", function(req,res){
  res.render("alumniform");
});
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


