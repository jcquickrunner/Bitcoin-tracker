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

    var crypto = req.body.crypto;// storing the bodys crypto value from index
    var fiat = req.body.Fiat;//storing the bodys fiat value from index
    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"; //stores part of the url in a variable
    var finalURL = baseUrl + crypto + fiat;// combines the base url with the crypto and fiat variables that hold the index files body values
    request(finalURL, function(error, response, body){//final url in the parameters is the endpoint adress
        var data = JSON.parse(body);
        var price = data.last;
        res.send("<h1>The current price of " + crypto+ " is " + price+ fiat + "</h1>")
        //console.log(body) // the body of whatever is located at the above endpoint
//JSON.stringify(wardrobe) converts a javascript object into JSON format while parse brings it back to workable javascript object
    })

});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});
