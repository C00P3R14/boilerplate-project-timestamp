// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  res.json({unix:Date.parse(new Date()),utc:new Date().toUTCString()});
});

app.route('/api/:date?').get(
  (req,res,next) => {
    req.unixTime = Date.parse(new Date(req.params.date)) || Date.parse(new Date(Number(req.params.date)))
    if(req.unixTime) next()
    res.json({error: "Invalid Date"})
  },(req,res,next) => {
    const date = new Date(req.unixTime);

    res.json({unix:req.unixTime,utc:date.toUTCString()})
    next()
  }
)




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
