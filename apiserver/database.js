var express = require('express');
var app = express();
var server = app.listen(3000);
var request = require('request');
var len = require('object-length');
var mergeJSON = require("merge-json") ;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/api";
var _ = require("lodash");
var cron = require('node-cron');


MongoClient.connect(url, function(err, db) {

    function insert_data(id,_collection,object){

        if(_collection==null){
            return false;
        }
        if(id==null){
            return false;
        }
        if(object==null){
            return false;
        }

        db.collection(_collection).insert(object);
        return true;
    }

    function get_data(id,_collection,object){

        if(_collection==null){
            return false;
        }
        if(id==null){
            return false;
        }
        if(object==null){
            return false;
        }

        db.collection(_collection).find({'id':id}).toArray((err,data)=> {
            if(err){
                return false;
            }else{
                return data;
            }
        });

    }

    function update_data(id,_collection,object){
        if(_collection==null){
            return false;
        }
        if(id==null){
            return false;
        }
        if(object==null){
            return false;
        }
        var myquery = { device_id: id };
        var newvalues = {$set: object };
        db.collection(_collection).updateMany(myquery, newvalues, function(err, res) {
            if (err){
                return false
            }else{
                return true;
            } 
            
          });
    }

    function delete_data(id,_collection){
        if(_collection==null){
            return false;
        }
        if(id==null){
            return false;
        }
        if(object==null){
            return false;
        }
        var myquery = { device_id: id };
        db.collection(_collection).remove(myquery, function(err, obj) {
          if (err) {
              return false;
          }else{
              return true;
          }
          
  
        });
    }
});