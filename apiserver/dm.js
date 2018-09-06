var weka = require('./lib/weka-lib.js');
var arff = require('arff');
//var _ = require('underscore');
 
//var data = 'datamining.arff' //ARFF json format (see [node-arff](https://github.com/chesles/node-arff)) 
 
//See Weka Documentation 
var options = {
  'classifier': 'weka.classifiers.trees.J48', 
  //'classifier': 'weka.classifiers.functions.SMO',
  'params'    : ''
};
 
var testData = {
    powerusage    : 30,
    active      : 'yes',
    batterry: 150,
    temp   : 29,
    humidity       : 'High',
    poweroff : '?' // last is class attribute 
};

console.log("Reading ARFF ...");

// arff.load('datamining.arff', function (err, data) {
//   console.log("data",data);
//   if(err){
//     console.log(err);
    
//   }

var readFile = require('fs').readFile;
 
readFile('datamining2.arff', 'utf8', function (error, content) {
  if (error) {
    return console.error(error);
  }
  var options = {
    'classifier': 'weka.classifiers.trees.J48', 
    //'classifier': 'weka.classifiers.functions.SMO',
    'params'    : ''
  };
   console.log(arff.parse(content).data);
   
  var testData = {
      powerusage    : 0,
      //active      : 'yes',
      batterry: 170,
      temp   : 29,
      humidity       : 'High',
      poweroff : '?' // last is class attribute 
  };
  var data = {
    name: 'smartgrid',
    attributes: [ 'powerusage'/*, 'active'*/, 'batterry', 'temp', 'humidity' ,'poweroff' ],
    types: {
      powerusage: { type: 'numeric' },
      //active: { type: 'nominal', oneof: ["yes", "no"] },
      batterry: { type: 'numeric' },
      temp: { type: 'numeric' },
      humidity: { type: 'nominal', oneof: ["High", "Medium","Low"] },
      poweroff: { type: 'nominal', oneof: ["yes", "no"] }
    },
    data: arff.parse(content).data
  };
  weka.classify(data, testData, options, function (err, result) {
  
  console.log({'result': result.predicted/*,'device_id':req.body.device_id*/});
 
    
  });
});
  

  


//})