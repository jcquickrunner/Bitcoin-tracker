const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendfile(__dirname+ "/index.html");

});
// the following makes a request to an extrenal server (api) by using the request module from npm
app.post("/", function(req,res){
    request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body){
        console.log(body)

    })

});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});
