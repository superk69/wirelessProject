
var express = require('express');
var app = express();
var port = 85;
var bodyparser = require('body-parser');
var cors = require('cors');

var randomInt = require('random-int');
app.use(cors());
d = new Date();
var jsonparser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({ extended: true });
app.use(urlencodedParser);
var axios = require('axios');
var id = ["jgp1eui5","jgp1fq8g","jgp1hrdt","jgp1inec","jgp1k5wl","jgp1l7p1","jgp1lm7g","jgp1m2sd","jhj82h43","jiu920pz","jiubh2bh"];

this.interval = setInterval(() => {
    var _11={
        "home_id" : "jgjhiq3x",
        "device_id" : id[10],
        "value" : true
    }
    var _10={
        "home_id" : "jgjhiq3x", 
        "device_id" : id[9],
        "value" : randomInt(90,91)
    }
    var _3={
        "home_id" : "jgjhiq3x",//แผงโซล่าเซลล์หลังคา
        "device_id" : id[2],
        "value" : randomInt(115,117)
    }
    var _2={
        "home_id" : "jgjhiq3x", //แผงโซล่าเซลล์หน้าบ้าน
        "device_id" : id[1],
        "value" : randomInt(115,116)
    }
    var _1={
        "home_id" : "jgjhiq3x",// พัดลมชานบ้าน
        "device_id" : id[0],
        "value" : 0
    }
    var _4={
        "home_id" : "jgjhiq3x",//อุณภูมิในบ้าน
        "device_id" : id[3],
        "value" : 27
    }
    var _5={
        "home_id" : "jgjhiq3x",//พัดลมครัว sw
        "device_id" : id[4],
        "value" : false
    }
    var _6={
        "home_id" : "jgjhiq3x",//พัดลมชานบ้าน
        "device_id" : id[5],
        "value" : false
    }
    var _7={
        "home_id" : "jgjhiq3x",//หลอดไฟห้องทำงาน
        "device_id" : id[6],
        "value" : randomInt(27,28)
    }
    var _8={
        "home_id" : "jgjhiq3x",//พัดลมครัว
        "device_id" : id[7],
        "value" : 0
    }
    var _9={
        "home_id" : "jgjhiq3x",//แบต
        "device_id" : id[8],
        "value" : 170
    }
    //console.log("puting",putdata1);
    
    axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _1, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
    axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _2, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
    axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _3, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _4, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _5, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _6, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _7, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _8, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _9, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _10, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });
        axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": _11, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        }, error => {
                    console.log(error);
        });


        // axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": putdata2, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        // }, error => {
        //             console.log("error2");
        // });

        // axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": putdata3, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        // }, error => {
        //             console.log("error3");
        // });

        // axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": putdata4, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        // }, error => {
        //             console.log("error4");
        // });

        // axios({ method: "POST", "url": "http://localhost:3000/datalog", "data": putdata5, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        // }, error => {
        //             console.log("error5");
        // });
        // axios({ method: "GET", "url": "http://localhost:3000/state/jdkmrlxf", "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        //     console.log(result);
            
                                      
                                    //   });

        // axios({ method: "get", "url": "http://localhost:3000/realtime/jdcekavg", "data": putdata1, "headers": { "content-type": "application/json", "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU" } }).then(result => {
        // }, error => {
        //             console.log(error);
        // });
   }, 100000);
