
var express = require('express');
var app = express();
var path = require('path');
var port = 80;
var mysql = require('mysql');
var bodyparser = require('body-parser');
var jsonparser = bodyparser.json();
var request = require('request');
var validator = require('json-input-validator');
var uniqid = require('uniqid');
var cors = require('cors');
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
  });
var fields = [
	{
		name:		'logID',
		type:		'number',
	}, {
		name:		' logEMAIL',
		type:		'string',
	}, {
		name:		'logNAME',
		type:		'string',
	}, {
		name:		'logUNITNAME',
		type:		'string',
	}, {
		name:		'logTYPE',
		type:		'string',
	}, {

		name:		' logDATEADD',
		type:		'string'
	}
];

d = new Date();
console.log(d.toLocaleTimeString());
var urlencodedParser = bodyparser.urlencoded({ extended: true });
app.use(urlencodedParser);
/////////////////////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/api";

app.post('/add',jsonparser,function (req,res) {
	var date = new Date();
	var current_hour = date.toLocaleString();
	console.log(current_hour);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		var myobj = req.body;
		myobj.date = current_hour;
		console.log(myobj);
	  db.collection("datalog").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});
	res.sendStatus(200);
});
/////////////////////////////////////////////
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/get',bodyparser.json(),function (req,res) {
	res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			//////////////////condb////////////////
				MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("datalog").find().toArray(function(err, result) {
					if (err) throw err;
					res.send(result);
					db.close();
				});
			});
		});

app.get('/',bodyparser.json(),function (req,res) {
	var eresult;
	var info;

				//////////////////condb////////////////
				MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("datalog").find().toArray(function(err, result) {
					if (err) throw err;
					eresult = result;
					db.close();
				});
				////////////////// api /////////////////////
				var apioptions = {
					url:  'http://data.tmd.go.th/api/Weather3Hours/V1/?type=json&province=%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%A5%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5',
					timeout: 3000
				}
				
				request(apioptions, function (error, response, body) {
				
				if (myObj) {
					var myObj = JSON.parse(body);
					if(myObj.Stations[0].StationNameTh !=''){
						info = {
							"ความชื้น" : myObj.Stations[0].Observe.RelativeHumidity.Value ,
							"สถานี" : myObj.Stations[0].StationNameTh ,
							"อุณหภูมิ" : myObj.Stations[0].Observe.Temperature.Value ,
							"ฝน" : myObj.Stations[0].Observe.Rainfall.Value ,
							
						};

					}
					
				}else{
					info = {
						"ความชื้น" : 'N/A' ,
							"สถานี" : 'N/A' ,
							"อุณหภูมิ" : 'N/A' ,
							"ฝน" : 'N/A' ,
					};
				}
				res.render('display',{ eresult: eresult,info : info});
					
			});
			});


			});


			app.get('/create',jsonparser,function (req,res) {
				
				
					MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					db.collection("loginfo").find().sort({logID:-1}).toArray(function(err, result) {
						if (err) throw err;
						var logid;
						logid = parseInt( result[0].logID);
						logid++;
						db.close();
						res.render('create',{elogid : logid,status : status});
					});

						
					});
				});
app.get('/login',function (req,res) {
		
					res.render('login');
	});
app.post('/submitcreate',jsonparser,function(req,res){
	var objInsert;
	var date = new Date();
	var current_hour = date.toLocaleString();
 var into_db_logid = parseInt(req.body.db_LOGID_in);
 var into_db_email = req.body.db_EMAIL;
 var into_db_name = req.body.db_NAME;
 var into_db_unitname = req.body.db_UNITNAME;
 var into_db_type = req.body.db_TYPE;
 MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	objInsert = {
		"logID" : into_db_logid,
		"logEMAIL" : into_db_email,
		"logNAME" : into_db_name,
		"logUNITNAME" : into_db_unitname,
		"logTYPE" : into_db_type,
		"logDATEADD" : current_hour
	};
	console.log(objInsert);
	var output = validator.checkInput(objInsert, fields);
	console.log(output);
	db.collection("loginfo").insertOne(objInsert, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		
		db.close();

	});
	
});
//res.render('create',{elogid : objInsert.logID,status : true ,result : "บันทึกข้อมูลสำเร็จ" , eobjInsert : objInsert });
res.redirect('/create');
});		
app.get('/addnewLocation',function (req,res) {
		
		////////////////// api /////////////////////
		request('http://data.tmd.go.th/api/Weather3Hours/V1/?type=json', function (error, response, body) {
			var myObj = JSON.parse(body);
			var uid = uniqid();
			var province= Array();
			var count = Object.keys(myObj.Stations).length;
			console.log(count);
			for(var i=0;i<count;i++){
				if(myObj){
				if(!checkexit(province,myObj.Stations[i].Province)){
				var obj = myObj.Stations[i].Province;
				province.push(obj);
				}
				}
			}
			
	
			res.render('addnewLocation',{id: uid,province : province});
				
		});
	
});
function checkexit(o,value){
	for( prop in o){
		if(prop == value){
			return true;
		}
		return false;
	}
}
app.get('/weatherlocation',cors(),function (req,res) {
	console.log("getting");
	request('http://data.tmd.go.th/api/Weather3Hours/V1/?type=json', function (error, response, body) {
				var myObj = JSON.parse(body);
				var	weatherdata = {
						"ความชื้น" : myObj.Stations[0].Observe.RelativeHumidity.Value ,
						"สถานี" : myObj.Stations[0].StationNameTh ,
						"อุณหภูมิ" : myObj.Stations[0].Observe.Temperature.Value ,
						"ฝน" : myObj.Stations[0].Observe.Rainfall.Value ,
						
					};
				response.send("GET");
					console.log(myObj);

		});
	});

app.get('/dashbroad/:email',function (req,res) {
		
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		db.collection("homeinfo").find({"member": {"email" : req.param.email } }).count(function(err, result) {
			if (err) throw err;
			if(result){
				console.log(result);
				res.render('dashbroad',{result : result});
			}else{
				res.render('dashbroad',{status: "noData"});
			}
			
		});
		db.close();
			
		});

});

app.get('/hello/:user',function(req,res){
		res.send('hello '+req.param.user+' from other side');
});

app.listen(port);




app.get('/',(req,res)=>{
	res.send(200);
});

app.post('/',(req,res)=>{
	res.send(200);
});

app.put('/',(req,res)=>{
	res.send(200);
});

app.delete('/',(req,res)=>{
	res.send(200);
});

