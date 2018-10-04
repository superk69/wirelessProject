var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var request = require('request');
var bodyparser = require('body-parser');
var cors = require('cors');
var len = require('object-length');
var mergeJSON = require("merge-json") ;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/api";
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var _ = require("lodash");
/////////////jsonparser init//////////////
var jsonparser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({ extended: true });
app.use(urlencodedParser);
////////// cors init ////////////

app.use(cors());
///////// date init /////////////
d = new Date();

console.log("server started at port 3000")

app.get('/',cors(),(req,res)=>{
    res.send("SERVER IS RUNNING...")
})

////////// jwt init /////////////
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'smartgridbyninearch';
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    //console.log('payload received', jwt_payload);
    MongoClient.connect(url, function(err, db) {
        db.collection("user").find({email: jwt_payload.email}).toArray((err,data)=> {
            if (data) {
                next(null, data);
              } else {
                next(null, false);
              }
        });

    });
});
passport.use(strategy);
app.use(passport.initialize());

app.post("/createjwt",jsonparser,passport.authenticate('jwt', { session: false }), function(req, res) {
    var find;
    //console.log("finding to make jwt",req.body.email)
    if(req.body.email){
        find = req.body.email;
    }
    MongoClient.connect(url, function(err, db) {
        db.collection("user").find({email: find}).toArray((err,data)=> {
            if( ! data ){
                res.status(401).json({message:"no such user found"});
            }
            //console.log(data);
            var payload = {id: data.id,email : data.email, displayname : data.displayname};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});
        });
    });
});


MongoClient.connect(url, function(err, db) {
/////////////////////////////////// IO ZONE //////
//cron.schedule('*/15 * * * *', function(){
/*    console.log('running a task every 15 minutes');
    db.collection("realtime").find().forEach(function(doc){
        var insertObj_ = {
            home_id : doc.home_id,
            device_id : doc.device_id,
            value : doc.value,
            date_added : doc.date_added
        }
        db.collection("datalog").insert(insertObj_);
     });
  });
*/
//  cron.schedule('*/5 * * * *', function(){
/*    console.log('running noti every 15 minutes');
    db.collection("realtime").find().forEach(function(doc){
        var noti = new Date(doc.date_added).getTime() > (new Date().getTime() - 120 * 1000)
        var insertObj_ = {
            home_id : doc.home_id,
            device_id : doc.device_id,
            value : doc.value,
            date_added : doc.date_added,
            read : false
        }
        if(!noti){
            db.collection("notification").find({'home_id': insertObj_.home_id,'device_id': insertObj_.device_id},{ sort : { $natural : -1 }, limit : 1 }).toArray((err,data)=> {
                console.log("len",len(data));
                if(len(data)>0){
                    if(data[0].read){
                        db.collection("notification").insert(insertObj_);
                        console.log("push noti",insertObj_);
                    }
                }else{
                    db.collection("notification").insert(insertObj_);
                    console.log("push noti",insertObj_);
                }
            })
        }
     });
  });
*/


    io.sockets.on('connection', function (socket) {
        socket.emit('startsocket','welcome to timeserver');
        socket.on('realtimedatalog', function (data) {
            startSendTime(data);
        });
        socket.on('publicrealtime', function (data) {
            startSendRealtime(data);
        });
        socket.on('ongraph', function (data) {
            startSendGraph(data);
        });
        function startSendTime(data){
            var query = { 'home_id' : data };
            db.collection("deviceinfo").find(query).toArray((err,data)=> {
                var dataoutput=[]
                var pointer=0;
                var me = this
                data.forEach(el=>{                           
                    var queryres = { 'device_id' : el.device_id };
                    var datatype  = el
                    db.collection("realtime").find(queryres,{ sort : { $natural : -1 }, limit : 1 }).toArray((err,datares)=> {
                        var noti = new Date(datares[0].data_added).getTime() > (new Date().getTime() - 120 * 1000)
                            dataoutput.push( {
                                'device_id' : datatype.device_id,
                                'device_type' : datatype.device_type,
                                'device_name' : datatype.device_name,
                                'device_unitname' : datatype.device_unitname,
                                'prediction' : datatype.prediction,
                                'device_status' : noti,
                                'value' : datares[0].value,
                                'date_added' : datares[0].date_added
                            })
                            if(dataoutput.length == data.length){
                                socket.emit('outputlog',dataoutput);
                            }
                    });
                });
            });
            setTimeout(startSendTime,5000,data)
        }

        function startSendRealtime(data){
            var query = {'device_public' : "สาธารณะ"};
            db.collection("deviceinfo").find(query).toArray((err,data)=> {
                var dataoutput=[]
                var pointer=0;
                var me = this
                var home_name;
                data.forEach(el=>{                           
                    var queryres = { 'device_id' : el.device_id };
                    var datatype  = el
                    db.collection("realtime").find(queryres,{ sort : { $natural : -1 }, limit : 1 }).toArray((err,datares)=> {
                        var noti = new Date(datares[0].data_added).getTime() > (new Date().getTime() - 10 * 1000)
                            db.collection("homeinfo").find({home_id:datares[0].home_id}).toArray((err,datahome)=>{
                                dataoutput.push( {
                                    'home_name' : datahome[0].home_name,
                                    'device_id' : datatype.device_id,
                                    'device_type': datatype.device_type,
                                    'device_name' : datatype.device_name,
                                    'device_unitname' : datatype.device_unitname,
                                    'device_status' : noti,
                                    'value' : datares[0].value
                                })
                                if(dataoutput.length==data.length){
                                    socket.emit('publiclog',dataoutput);
                                } 
                            });                   
                    }); 
                }); 
            });
            setTimeout(startSendRealtime,30000,data);
        }
    
        function startSendGraph(data){
            var query = { 'home_id' : data };
            db.collection("deviceinfo").find(query).toArray((err,data)=> {
                var dataoutput=[]
                var onresult=[]
                var pointer=0;
                var me = this
                data.forEach(el=>{                           
                    var queryres = { 'device_id' : el.device_id };
                    var datatype  = el
                    db.collection("datalog").find(queryres,{ sort : { $natural : -1 }, limit : 10 }).toArray((err,datares)=> {
                        dataoutput.push(datares)
                        if(dataoutput.length==data.length){
                            socket.emit('graph',dataoutput);
                        }
                    }); 
                }); 
            });
            setTimeout(startSendGraph,600000,data);
        }
    });
});

app.get('/notification/:email?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.email){
        let arr= [];
        let homelist = []
        MongoClient.connect(url, function(err, db) {
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'member.email' : req.params.email };
                db.collection("homeinfo").find(query).count().then((count)=>{
                    let i=1
                    db.collection("homeinfo").find(query).forEach(function(doc){
                        homelist.push(doc.homeid)
                        db.collection("notification").find({'home_id':doc.home_id,'read':false}).count().then((cnt)=>{
                            if(cnt>0){
                                let j=1
                                db.collection("notification").find({'home_id':doc.home_id,'read':false}).forEach(function(docs){
                                    arr.push(docs)
                                    j++
                                    if(j==cnt){
                                        i++
                                    }
                                    if(i==count&&j==cnt){
                                        res.send(arr)
                                    }
                                    db.close();
                                })
                            }//else{
                        })
                    })
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.get('/history/:id',cors(),jsonparser,(req,res)=>{
    if(req.params.id){
        let arr= [];
        //console.log('Connecting Query... @ '+req.params.id);
        MongoClient.connect(url, function(err, db) {
               // console.log('Connected Query... @ '+req.params.id);
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'device_id' : req.params.id };
               // console.log('Query',query);
                db.collection("datalog").find(query).toArray().then((count)=>{
                    res.send(count)
                    db.close();
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.post('/notification/:email?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.email){
        let arr= [];
        //console.log('Connecting Query... @ '+req.params.email);
        MongoClient.connect(url, function(err, db) {
                //console.log('Connected Query... @ '+req.params.email);
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'member.email' : req.params.email };
                //console.log('Query',query);
                db.collection("homeinfo").find(query).count().then((count)=>{
                    let i=0
                    db.collection("homeinfo").find(query).forEach(function(doc){
                        //console.log("getnoti home",doc.home_id);
                        let j=0
                        db.collection("notification").find({'home_id':doc.home_id}).forEach(function(docs){
                            //console.log("getnoti data",docs.length,'doc_',count);
                            var myquery = { device_id: docs.device_id };
                            db.collection("notification").remove(myquery, function(err, obj) {
                                if (err) throw err;
                                //console.log(obj.result.n + " document(s) deleted");
                                db.close()
                            });
                            //console.log(i,count,j,len(docs));
                            j++
                            if(i==count&&j==len(docs)){
                                res.sendStatus(200)
                            }
                        })
                        i++
                    })
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

/////////////////////////////////// DASHBOARD ZONE //////
app.get('/home/:email?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.email){
        //console.log('Connecting Query... @ '+req.params.email);
        MongoClient.connect(url, function(err, db) {
               // console.log('Connected Query... @ '+req.params.email);
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'member.email' : req.params.email };
                //console.log('Query',query);
                db.collection("homeinfo").find(query).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                        //console.log(JSON.stringify(data));
                         res.send(data);
                    }
                    db.close()
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.put('/home',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    var vm = res;
    var insertobj = {
        home_id: (req.body.home_id) ? req.body.home_id : null,
        home_name: (req.body.home_name) ? req.body.home_name : null,
        home_location: {
            lat: (req.body.home_location.lat) ? req.body.home_location.lat : null,
            lng: (req.body.home_location.lng) ? req.body.home_location.lng : null
        },
        home_detail: (req.body.home_detail) ? req.body.home_detail : null,
        member: (req.body.member) ? req.body.member : [],
        weather: {
            province: (req.body.weather.province) ? req.body.weather.province : null,
            station: (req.body.weather.station) ? req.body.weather.station : null
        },
        device_list : (req.body.device_list)?req.body.device_list : []
    }
    //console.log('connecting...');
    MongoClient.connect(url, function(err, db) {
        //console.log('connected!!!... Sending...');
        if (err){ vm.sendStatus(400); }
        db.collection("homeinfo").insertOne(insertobj, function(err, res) {
            if (err){ 
                //console.log('cannot insert...');
                vm.writeHead(400, {'Content-Type': 'text/plain'});
                vm.end();
            }else{
                    //console.log("1 document inserted");
                vm.writeHead(200, {'Content-Type': 'text/plain'});
                vm.end();
            }
            db.close();
            //console.log('connection closed!!!...');
        });
    });
});

app.post('/home',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    var vm = res;
    var insertobj = {
        home_id: (req.body.home_id) ? req.body.home_id : null,
        home_name: (req.body.home_name) ? req.body.home_name : null,
        home_location: {
            lat: (req.body.home_location.lat) ? req.body.home_location.lat : null,
            lng: (req.body.home_location.lng) ? req.body.home_location.lng : null
        },
        home_detail: (req.body.home_detail) ? req.body.home_detail : null,
        member: (req.body.member) ? req.body.member : [],
        weather: {
            province: (req.body.weather.province) ? req.body.weather.province : null,
            station: (req.body.weather.station) ? req.body.weather.station : null
        },
        device_list : (req.body.device_list)?req.body.device_list : []
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myquery = { home_id: req.body.home_id };
        var newvalues = {$set: insertobj };
        //console.log("myquery",insertobj);
        //console.log("newvalues",newvalues);
        db.collection("homeinfo").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            //console.log(res.result.nModified + " document(s) updated");
            vm.sendStatus(200);
            db.close();
        });
    });  
});

app.delete('/home',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myquery = { home_id: req.body.home_id };
        db.collection("homeinfo").remove(myquery, function(err, obj) {
            if (err) throw err;
          //console.log(obj.result.n + " document(s) deleted");
            res.sendStatus(200);
            db.close();
        });
    });
});

app.get('/edithome/:home_id?',cors(),jsonparser,passport.authenticate('jwt', { session: false }),(req,res)=>{
    if(req.params.home_id){
        //console.log('Connecting Query... @ '+req.params.home_id);
        MongoClient.connect(url, function(err, db) {
               // console.log('Connected Query... @ '+req.params.home_id);
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'home_id' : req.params.home_id };
               // console.log('Query',query);
                db.collection("homeinfo").find(query).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                        //console.log(JSON.stringify(data));
                         res.send(data);
                         db.close()
                    }
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.get('/publichome/:home_id?',cors(),jsonparser,passport.authenticate('jwt', { session: false }),(req,res)=>{
    if(req.params.home_id){
        //console.log('Connecting Query... @ '+req.params.home_id);
        MongoClient.connect(url, function(err, db) {
                //console.log('Connected Query... @ '+req.params.home_id);
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'home_id' : req.params.home_id };
                //console.log('Query',query);
                db.collection("homeinfo").find(query).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                        //console.log(JSON.stringify(data));
                         res.send(data);
                         db.close()
                    }
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

/////////////////////////////////// CONSOLE ZONE //////
app.get('/console/:home_id?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.home_id){
        MongoClient.connect(url, function(err, db) {
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'home_id' : req.params.home_id };
                db.collection("deviceinfo").find(query).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                         res.send(data);
                    }
                    db.close()
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.put('/console',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    var vm = res;
    var date = new Date();
    var current_hour = date.toLocaleString();
    //console.log("home_id",req.body.home_id);
    var insertobj = {
        home_id : (req.body.home_id) ? req.body.home_id : null,
        device_id: (req.body.device_id) ? req.body.device_id : null,
        device_name: (req.body.device_name) ? req.body.device_name : null,
        device_type: (req.body.device_type) ? req.body.device_type : null,
        device_unitname: (req.body.device_unitname) ? req.body.device_unitname : null,
        device_added: (req.body.device_added) ? req.body.device_added : null,
        device_public: (req.body.device_public) ? req.body.device_public : null,
    }
    var insertobj2 = {
        home_id : insertobj.home_id,
        device_id: insertobj.device_id,
        value: (insertobj.device_type=="สวิตซ์")? false: 0,
        date_added : current_hour
    }
    //console.log('connecting... console',req);
    MongoClient.connect(url, function(err, db) {
        //console.log('connected!!!... Sending...');
        if (err){ vm.sendStatus(400); }        
        db.collection("deviceinfo").insertOne(req.body, function(err, res) {
            var me = vm
            if (err){ 
                //console.log('cannot insert...');
                vm.writeHead(400, {'Content-Type': 'text/plain'});
                vm.end();
            }else{
                db.collection("realtime").insertOne(insertobj2, function(err, res) {
                    //console.log("1 document inserted");
                    me.writeHead(200, {'Content-Type': 'text/plain'});
                    me.end();
                    db.close()
                });
            }
            //console.log('connection closed!!!...');
        });
    });
});

app.get('/getdevice/:device_id?',cors(),jsonparser,(req,res)=>{
    if(req.params.device_id){
        MongoClient.connect(url, function(err, db) {
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'device_id' : req.params.device_id };
                db.collection("deviceinfo").find(query).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                         res.send(200,data);
                    } 
                    db.close()
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

app.post('/console',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    var vm = res;
    var date = new Date();
    var current_hour = date.toLocaleString();
    var insertobj = {
        home_id : (req.body.home_id) ? req.body.home_id : null,
        device_id: (req.body.device_id) ? req.body.device_id : null,
        device_name: (req.body.device_name) ? req.body.device_name : null,
        device_type: (req.body.device_type) ? req.body.device_type : null,
        device_unitname: (req.body.device_unitname) ? req.body.device_unitname : null,
        device_added: (req.body.device_added) ? req.body.device_added : null,
        device_public: (req.body.device_public) ? req.body.device_public : null,
    }
    //console.log(insertobj);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myquery = { device_id: req.body.device_id };
        var newvalues = {$set: insertobj };
        //console.log("myquery",insertobj);
        //console.log("newvalues",newvalues);
        db.collection("deviceinfo").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            //console.log(res.result.nModified + " document(s) updated");
            vm.sendStatus(200);
            db.close();
        });
    });  
});

app.delete('/console',jsonparser,cors(),(req,res)=>{
    var vm = res
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myquery = { device_id: req.body.device_id };
        db.collection("deviceinfo").remove(myquery, function(err, obj) {
            if (err) throw err;
          //console.log(obj.result.n + " document(s) deleted");
            db.collection("realtime").remove(myquery, function(err, obj) {
                if (err) throw err;
                //console.log(obj.result.n + " document(s) deleted");
                vm.sendStatus(200);
                db.close();
            });
          //db.close();
        });
    });
});

/////////////////////////////////// DATALOG ZONE //////

////////////////////////// update data to realtime /////////////////

app.post('/datalog',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
        //console.log("in put");    
    var vm = res;
    var date = new Date();
    var current_hour = date.toLocaleString();
    var insertobj = {
        home_id : (req.body.home_id) ? req.body.home_id : null,
        device_id: (req.body.device_id) ? req.body.device_id : null,
        value: req.body.value,
        date_added : current_hour
    }    
    var myquery = { device_id: req.body.device_id };
    var newvalues = {$set: insertobj };
    MongoClient.connect(url, function(err, db) {
        if (err){ 
            console.log(err);
        }
        db.collection("realtime").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
                //console.log(res.result.nModified + " updated realtime id"+insertobj.device_id+" value "+insertobj.value);
            vm.sendStatus(200);
            db.close()
        });
    });
});

////////////////////////// get realtime value //////////////////
app.get('/datalog/:device_id?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.device_id){
        MongoClient.connect(url, function(err, db) {
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'device_id' : req.params.device_id };
                db.collection("realtime").find(query,{ sort : { $natural : -1 }, limit : 1 }).toArray((err,data)=> {
                    if(err){
                        res.send(500, "something went wrong");
                    }else{
                        res.send(200,data);
                    }
                    db.close();  
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

////////////////////////// get switch state value //////////////////
app.get('/state/:device_id?',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=>{
    if(req.params.device_id){
        MongoClient.connect(url, function(err, db) {
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'device_id' : req.params.device_id };
                //console.log(query);
                db.collection("realtime").find(query,{ sort : { $natural : -1 }, limit : 1 }).toArray((err,data)=> {
                    if(err){
                         res.send(500, "something went wrong");
                    }else{
                        res.send(data);    
                    }
                    db.close();
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});
////////////////////////// put switch state value //////////////////
app.post('/state',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    var vm = res;
    var date = new Date();
    var current_hour = date.toLocaleString();
    
    var insertobj = {
        home_id : (req.body.home_id) ? req.body.home_id : null,
        device_id: (req.body.device_id) ? req.body.device_id : null,
        value: req.body.value,
        date_added : current_hour
    }
    //console.log("updateStateServer",req.body);
    
    MongoClient.connect(url, function(err, db) {
        if (err){ vm.sendStatus(400); }
        var myquery = { device_id: req.body.device_id };
        var newvalues = {$set: insertobj };
        db.collection("realtime").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            //console.log(res.result.nModified + " updated realtime id"+insertobj.device_id+" value "+insertobj.value);
            vm.sendStatus(200);
            db.close();
          });
    });
});


/////////////////////////////////// USER ZONE //////

////////////////////////// get all user email //////////////////
app.get('/user',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        db.collection("user").find().toArray((err,data)=> {
            var send = Array();
            for(var i =0;i< len(data);i++){
                send.push(data[i].email);
            }
            res.send(send);
            db.close()
        });
    });
});

////////////////////////// put user to auth jwt //////////////////
app.post('/user',jsonparser,cors(),passport.authenticate('jwt', { session: false }),(req,res)=>{
    //console.log("USER IN");
    var vm = res; 
    var insertobj = {
        displayname: (req.body.displayname) ? req.body.displayname : null,
        email: (req.body.email) ? req.body.email : null,
    }
    //console.log("USER",insertobj);
    if(req.body.email){  
        MongoClient.connect(url, function(err, db) {        
            if(err){
                res.send(500, "something went wrong");
            }else{
                var query = { 'email' : req.body.email };
                db.collection("user").find(query).toArray((err,data)=> {
                    //console.log(len(data));
                    if(len(data)==0){
                        if (err){ vm.sendStatus(400); }
                        db.collection("user").insertOne(insertobj, function(err, res) {
                            if (err){ 
                                vm.writeHead(400, {'Content-Type': 'text/plain'});
                                vm.end();
                            }else{        
                                vm.writeHead(200, {'Content-Type': 'text/plain'});
                                vm.end();
                            }
                            db.close();    
                        });
                    }else{
                        res.sendStatus(200);
                    }
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

/////////////////////////////////// PROVIDER ZONE //////
app.get('/weatherlocation',cors(),jsonparser,passport.authenticate('jwt', { session: false }),(req,res)=> {
	//console.log("getting");
	request('http://data.tmd.go.th/api/Weather3Hours/V1/?type=json', function (error, response, body) {
		var myObj = JSON.parse(body);
		var weatherdata= Array();
		for(var i=0;i< len(myObj.Stations);i++){
            if(!checkexit(weatherdata,myObj.Stations[i].Province)){
                var obj = myObj.Stations[i].Province;
                weatherdata.push(obj);
            }
        }
        res.send(weatherdata);
	});
});

app.get('/getStations/:province',cors(),jsonparser,passport.authenticate('jwt', { session: false }),(req,res)=> {    
    var url = "http://data.tmd.go.th/api/Weather3Hours/V1/?type=json&province="+req.params.province;
    //console.log("getting",encodeURI(url));
	request(encodeURI(url), function (error, response, body) {          
        var myObj = JSON.parse(body);
        //console.log(myObj);
        if(myObj!=null){
		    var weatherdata= Array();
		    for(var i=0;i< len(myObj.Stations);i++){                    
                var obj = myObj.Stations[i].StationNameTh;
                weatherdata.push(obj);
            }
            //console.log(weatherdata);
            res.send(weatherdata);
        }
	});
});

app.get('/gettempdata/:province/:station',cors(),passport.authenticate('jwt', { session: false }),jsonparser,(req,res)=> {
    var url = "http://data.tmd.go.th/api/Weather3Hours/V1/?type=json&province="+req.params.province;
    //console.log("getting",encodeURI(url));
	request(encodeURI(url), function (error, response, body) {
        var myObj = JSON.parse(body);
        //console.log(myObj);
        if(myObj!=null){
			var weatherdata= Array();
			for(var i=0;i< len(myObj.Stations);i++){
                if(myObj.Stations[i].StationNameTh==req.params.station){
                    var obj = myObj.Stations[i];
                    weatherdata.push(obj);
                }
            }
            //console.log(weatherdata);
            res.send(weatherdata);
        }
	});
});

/////////////////////////////////// INNER FUNCTION ZONE //////
function checkexit(o,value){
	for( var i=0;i<len(o);i++){
		if(o[i] == value){
			return true;
        }
    }
    return false;
}
