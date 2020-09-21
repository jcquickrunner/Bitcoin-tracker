const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    

    // another test
    res.sendfile(__dirname + "/index.html");
});// this is a test comment


app.get('/style.css',function(req,res){
    res.sendfile(__dirname+'style.css');
})
app.get("/test", function(req,res){
    res.send("test success");
})
// the following makes a request to an extrenal server (api) by using the request module from npm
app.post("/", function (req, res) {
    var crypto = req.body.crypto; // storing the bodys crypto value from index
    var fiat = req.body.Fiat; //storing the bodys fiat value from index
    var amount = req.body.amount;
    //var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"; //stores part of the url in a variable
    //var finalURL = baseUrl + crypto + fiat; // combines the base url with the crypto and fiat variables that hold the index files body values


    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        // options variable is equal to the url with the qs being the parameters being passed through in this case  https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
            // names gotten from html
            // names not values used in servers atleast in this exmaple

        }
    }

    request(options, function (error, response, body) {
        //final url in the parameters is the endpoint adress
        var data = JSON.parse(body);
        var price = data.price;
        var date = data.time;
        console.log(price);
        res.write("<h1>the current date is: " + date + "<hr>");
        res.write(

            "<h1>" + amount + " " + crypto + " is currently worth " + price + " " + fiat + "</h1>"

        );
        res.send();
        // res.send();
        //console.log(body) // the body of whatever is located at the above endpoint
        //JSON.stringify(wardrobe) converts a javascript object into JSON format while parse brings it back to workable javascript object
    });
});

app.listen(3000, function () {
    console.log("server is running on port 3000");
});