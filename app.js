/**
 * Created by timfulmer on 2/8/16.
 */
'use strict';

var express=require('express'),
  app=express(),
  MongoClient=mongodb.MongoClient,
  url='mongodb://jswla:jswla@ds035573.mongolab.com:35573/jswla',
  thro=require('./app/controllers/thro');

function simpleRequestHandler(message){
  return function(req,res){
    console.log(message);
    return res.status(200).send('OK');
  };
}

app.get('/api/throw',thro.listThrows,simpleRequestHandler('GET /api/throw'));
app.get('/api/throw/:throwId',thro.readThrow,simpleRequestHandler('GET /api/throw/:throwId'));
app.post('/api/throw',thro.createThrow,simpleRequestHandler('POST /api/throw'));
app.put('/api/throw',thro.updateThrow,simpleRequestHandler('PUT /api/throw'));
app.delete('/api/throw',thro.deleteThrow,simpleRequestHandler('DEL /api/throw'));

MongoClient.connect(url,function(err,data) {
  if(err){
    return console.log('Got error connecting to database:\n%s',err.stack);
  }
  app.listen(3000,function(){
    console.log('Started app on port 3000');
  });
});
