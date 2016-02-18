/**
 * Created by timfulmer on 2/8/16.
 */
'use strict';

const express=require('express'),
  app=express();

function simpleRequestHandler(message){
  return function(req,res){
    console.log(message);
    return res.status(200).send('OK');
  };
}

app.get('/api/throw',simpleRequestHandler('GET /api/throws'));
app.get('/api/throw/:throwId',simpleRequestHandler('GET /api/throw/:throwId'));
app.post('/api/throw',simpleRequestHandler('POST /api/throw'));
app.put('/api/throw',simpleRequestHandler('PUT /api/throw'));
app.delete('/api/throw',simpleRequestHandler('DEL /api/throw'));

app.listen(3000,function(){
  console.log('Started app on port 3000');
});