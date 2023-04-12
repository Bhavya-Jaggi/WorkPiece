const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const bodyparcer = require("body-parser");
const port = 80;

// Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);                 //inso exact issi point par lagana hai
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/FarziForm');
}


// assinging mongoose schema
const eduSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String 
  });

// making  mongoose model
const edu = mongoose.model('edu', eduSchema);


// mongoose.set('strictQuery', false);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//making post request for sumbitting form
app.post('/contact', (req,res)=>{                                                     //POST req hamesha urlencoded() vale function ke baad lagegi
    var myData= new edu(req.body);
    myData.save().then(()=>{
        res.status(200).send("The Data has been sent to Database")
    }).catch(()=>{
        res.status(400).send("Sorry! Data wasn't send to Databse. Try again later")
    });
})

//ENDPOINTS
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    res.status(200).render('index.pug');
})


app.get('/form', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    res.status(200).render('form.pug');
})





app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
  })