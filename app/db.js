/**
 * Created by timfulmer on 2/17/16.
 */
const mongodb=require('mongodb'),
  MongoClient=mongodb.MongoClient,
  ObjectId=mongodb.ObjectId,
  url='mongodb://jswla:jswla@ds035573.mongolab.com:35573/jswla';
var db=void 0;

function create(thro,callback){
  db.collection('throws').insertOne(thro,function(err,data){
    if(err){
      console.log('Got error inserting to throws:\n%s',err.stack);
      return callback(err);
    }
    if(data.insertedCount!==1 || !data.insertedId){
      return callback(new Error('Throw not inserted.'));
    }
    read(data.insertedId,function(err,thro){
      if(err){
        console.log('Could not read inserted thro:\n%s',err.stack);
        return callback(err);
      }
      console.log('Inserted thro:\n%s',JSON.stringify(data,null,2));
      callback(null,thro);
    });
  });
}
function read(throwId,callback){
  db.collection('throws').find({_id:ObjectId(throwId)}).limit(1).next(function(err,data){
    if(err){
      console.log('Got error finding thro:\n%s',err.stack);
      return callback(err);
    }
    console.log('Found thro with id %s:\n%s',throwId,JSON.stringify(data,null,2));
    callback(null,data);
  });
}
function update(throwId,thro,callback){
  db.collection('throws').findOneAndUpdate({_id:ObjectId(throwId)},thro,function(err,data){
    if(err){
      console.log('Got error updating thro:\n%s',err.stack);
      return callback(err);
    }
    console.log('Updated thro:\n%s',JSON.stringify(data,null,2));
    return callback(null,data.value);
  });
}
function remove(throwId,callback){
  db.collection('throws').deleteOne({_id:ObjectId(throwId)},function(err,data){
    if(err){
      console.log('Got error deleting from throws:\n%s',err.stack);
      return callback(err);
    }
    console.log('Deleted thro:\n%s',JSON.stringify(data,null,2));
    return callback(null,data);
  });
}
function list(thro,callback){
  const cursor=db.collection('throws').find(thro);
  cursor.toArray(function(err,data){
    if(err){
      console.log('Got error listing throws:\n%s',err.stack);
      return callback(err);
    }
    console.log('Listed throws:\n%s',JSON.stringify(data,null,2));
    return callback(null,data);
  });
}
function init(callback){
  MongoClient.connect(url,function(err,data) {
    if(err){
      console.log('Got error connecting to database:\n%s',err.stack);
      return callback(err);
    }
    console.log("Connected to MongoDB server.");
    db=data;
    callback(null,data);
  });
}

module.exports={
  create:create,
  read:read,
  update:update,
  remove:remove,
  list:list,
  init:init
};