//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/culturalDB", {
    useNewUrlParser: true
});
const app = express();

var gen = "\"The GeneticX Crew\" is a cultural club of IIIT Allahabad of passionate dance lovers who have that \"X-factor\" in their \"Genes\" for dance which makes them aloof from the crowd.";
var rang = "Dramatics Society is the most notable society of IIIT Allahabad, committed to develop acting , script writing , direction skills etc , through plethora of events and a workshop . This society provides platform for budding artists of IIIT Allahabd to showcase their enormous potential and talent . Students vie for glory in different competitions and activities organized by this society like QUARANTINE QTIYAPA, STUNNING DUO, IIIT-A BAKRA, DRAMATURGY , AD -MAD ,BOLLY QUIZ, NUKKAD NAATAK, DRAMA NIGHTS etc ";
var nir = "Fine Arts Society will seek to unlock creativity in a far wider audience. The Society is not a training institute but is committed to an alternative education through experiencing and learning.";
var sarasva = "Sarasva is the Literary Society of Indian Institute of Information Technology, Allahabad. The society has striven to promote debate, discussion and dialogue on campus through several events and initiatives including a TEDx, Model United Nations, Lit-a-thon, One on One and Group debates, Parliamentary Debates, Kavi Sammelans, creative writing, quizzing etc.";
var thu = "Thunderbolt or the Acoustics and Media Society (AMS) as it is commonly known is the student crew that overlooks the lights, audio and media related engagements of all academic and cultural events organized at Indian Institute of Information Technology, Allahabad.";
var vir = "Virtuosi, literally means an assembly of artists. We here at Virtuosi, the music club of IIIT-A are biggest preachers of passion, sound, melodies and finally salvations. Selflessness and altruism, an inherent quality and capability of all budding musicians unite here and bring out the zeal and prodigy from within them to a level which surely can be compared to the word ‘legendary’.";


app.set('view engine', 'ejs');
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    society: String,
    role: String
});
const User = mongoose.model("User", UserSchema);

const admin = new User({
    name: "admin",
    password: "adityaverma",
    society: "all",
    role: "admin"
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render("home");

});
app.get('/sarasva', (req, res) => {

    User.find({
        society: "S"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('sarasva', {
                sarasva: sarasva,
                arr: arr
            });

        }
    });


});
app.get('/gen', (req, res) => {
    User.find({
        society: "G"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('gen', {
                gen: gen,
                arr: arr
            });

        }
    });
});
app.get('/nir', (req, res) => {
    User.find({
        society: "N"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('nir', {
                nir: nir,
                arr: arr
            });

        }
    });
});
app.get('/rang', (req, res) => {
    User.find({
        society: "R"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('rang', {
                rang: rang,
                arr: arr
            });

        }
    });
});
app.get('/thu', (req, res) => {
    User.find({
        society: "T"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('thu', {
                thu: thu,
                arr: arr
            });

        }
    });
});
app.get('/vir', (req, res) => {
    User.find({
        society: "V"
    }, function (err, arr) {
        if (err) {
            console.log(err);
        } else {
            res.render('vir', {
                vir: vir,
                arr: arr
            });

        }
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        login: 0
    });
});
app.post('/login', (req, res) => {
    const p = req.body.pass;
    const usrnm = req.body.usrnm;
    User.findOne({
        name: usrnm
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (data.password == p) {
                res.render('profile', {
                    data: data
                });
            } else {
                res.render('login', {
                    incorrect: 1
                });
            }
        }

    });

});

app.post('/addC', (req, res) => {

    const usrnm = req.body.usrnm;
    const p = req.body.pass;
    const role = req.body.role;
    const newUser = new User({
        name: usrnm,
        password: p,
        society: role,
        role: "C"
    });
    newUser.save();
    res.redirect('/');


});
app.post('/addM', (req, res) => {

    const usrnm = req.body.usrnm;
    const p = req.body.pass;
    const role = req.body.role;
    const newUser = new User({
        name: usrnm,
        password: p,
        society: role,
        role: "M"
    });
    newUser.save();
    res.redirect('/');

});

app.post('/changeG', (req, res) => {

    gen = req.body.data;
    res.redirect('/');


});
app.post('/changeN', (req, res) => {

    nir = req.body.data;
    res.redirect('/');


});
app.post('/changeR', (req, res) => {

    rang = req.body.data;
    res.redirect('/rang');


});
app.post('/changeS', (req, res) => {

    savasva = req.body.data;
    res.redirect('/');


});
app.post('/changeV', (req, res) => {

    vir = req.body.data;
    res.redirect('/');


});
app.get('/forget', (req, res) => {
    res.render('forget')
});

app.post('/forget', (req, res) => {

    const usrnm = req.body.usrnm;
    const pass = req.body.pass;
    User.findOne({
        name: usrnm
    }, function (err, dat) {
        if (err) {
            console.log(err);
        } else {
            User.updateOne({
                name: dat.name
            }, {
                password: pass
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(err);
                }
            })
        }

    });
    res.redirect('/');

});
app.post("/changeEventS",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "S",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});
app.post("/changeEventG",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "G",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});
app.post("/changeEventN",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "N",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});
app.post("/changeEventT",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "T",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});
app.post("/changeEventV",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "V",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});
app.post("/changeEventR",(req,res)=>{
    const newEvent = req.body.eventName;
    const Event = new User({
        name : newEvent,
        society : "R",
        role : "E",
    });
    Event.save();
    res.redirect('/');


});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port);