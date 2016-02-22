/**
 * Created by timfulmer on 2/8/16.
 */
'use strict';

const express=require('express'),
  bodyParser=require('body-parser'),
  cors=require('cors'),
  app=express(),
  db=require('./db');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

function simpleRequestHandler(message){
  return function(){
    console.log(message);
  };
}

app.get('/api/throw',function listThrows(req,res,next){
  db.list(req.body.thro,function(err,data){
    if(err){
      console.log('Could not list thros:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  });
},simpleRequestHandler('GET /api/throws'));
app.get('/api/throw/:throwId',function readThrow(req,res,next){
  db.read(req.body.throwId,function(err,data){
    if(err){
      console.log('Could not get thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  });
},simpleRequestHandler('GET /api/throw/:throwId'));
app.post('/api/throw',function createThrow(req,res,next){
  db.create(req.body,function(err,data){
    if(err){
      console.log('Could not create thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  })
},simpleRequestHandler('POST /api/throw'));
app.put('/api/throw/:throwId',function updateThrow(req,res,next){
  db.update(req.params.throwId,req.body,function(err,data){
    if(err){
      console.log('Could not update thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  })
},simpleRequestHandler('PUT /api/throw'));
app.delete('/api/throw/:throwId',function deleteThrow(req,res,next){
  db.remove(req.params.throwId,function(err,data){
    if(err){
      console.log('Could not delete thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  })
},simpleRequestHandler('DEL /api/throw'));

db.init(function(){
  app.listen(3000,function(){
    console.log('Started app on port 3000.');
  });
});
