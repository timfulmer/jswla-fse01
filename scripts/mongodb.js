/**
 * Created by timfulmer on 2/9/16.
 */
'use strict';

const mongodb=require('mongodb'),
  MongoClient=mongodb.MongoClient,
  ObjectId=mongodb.ObjectId,
  url='mongodb://jswla:jswla@ds035573.mongolab.com:35573/jswla';

function create(db,thro,callback){
  db.collection('throws').insertOne(thro,function(err,data){
    read(db,data.insertedId,function(err,thro){
      console.log('Inserted thro:\n%s',JSON.stringify(data,null,2));
      callback(null,thro);
    });
  });
}
function read(db,throwId,callback){
  db.collection('throws').find({_id:ObjectId(throwId)}).limit(1).next(function(err,data){
    console.log('Found thro with id %s:\n%s',throwId,JSON.stringify(data,null,2));
    callback(null,data);
  });
}
function update(db,thro,callback){
  db.collection('throws').findOneAndUpdate({_id:thro._id},thro,function(err,data){
    console.log('Updated thro:\n%s',JSON.stringify(data,null,2));
    return callback(null,data.value);
  });
}
function remove(db,throwId,callback){
  db.collection('throws').deleteOne({_id:ObjectId(throwId)},function(err,data){
    console.log('Deleted thro:\n%s',JSON.stringify(data,null,2));
    return callback(null,data);
  });
}
function list(db,thro,callback){
  const cursor=db.collection('throws').find(thro);
  cursor.toArray(function(err,data){
    console.log('Listed throws:\n%s',JSON.stringify(data,null,2));
    return callback(null,data);
  });
}

MongoClient.connect(url,function(err,data) {
  console.log("Connected to MongoDB server.");
  var db=data;
  create(db,{playerThrow:'rock',opponentThrow:'paper'},
    function(err,data){
      read(db,data._id.valueOf(),function(err,data){
        data.playerThrow='scissors';
        update(db,data,function(err,data){
          remove(db,data._id.valueOf(),function(err,data){
            list(db,{},function(err,data){
              //db.close();
              //process.exit(0);
            })
          })
        });
      });
    });
});
