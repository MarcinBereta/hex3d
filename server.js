var express = require("express")
var app = express()
const fs = require('fs')
const PORT = 3000;
var bodyParser = require("body-parser")
var qs = require("querystring")
var path = require("path")
var Datastore = require('nedb');
var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.get("/Game", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/gameL.html"))
})
app.get("/ally", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/AllyMovement.html"))
})
app.get("/player", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/SimpleM.html"))
})
app.get("/particles", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/particles.html"))
})
app.get("/ognisko", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/bonefire.html"))
})
app.get("/Hex", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/Shex.html"))
})
app.get("/GameFireplace", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/gameF.html"))
})



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.post("/", function(req, res){
    coll1.remove({}, { multi: true }, function (err, numRemoved) {
    });
        coll1.insert(req.body, function (err, newDoc) {

    });
    res.send("TEKST WIADOMOŚCI")
})
app.post("/receive", function(req, res){
    coll1.find({ }, function (err, docs) {
        res.send(docs)

    });
})
app.post("/getData", function (req, res) {
    coll1.find({}, function (err, docs) {
        console.log("----- tablica obiektów pobrana z bazy: \n")
        console.log(docs)
        console.log("----- sformatowany z wcięciami obiekt JSON: \n")
        console.log(JSON.stringify({ "docsy": docs }, null, 5))
        res.send(docs)
    });
    console.log("DZIALA")
})