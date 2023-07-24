var express = require('express')
var app = express()
var jsonData = require('./jsonFile')
const port = 4000

app.get('/', function(req, res){
    res.send(jsonData)
})

app.listen(port, () => {
    console.log("The Server listening at ", port)
})