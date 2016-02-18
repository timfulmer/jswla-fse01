/**
 * Created by timfulmer on 2/8/16.
 */
const express=require('express'),
  app=express();

app.get('/api/throw',function(req,res){
  console.log('GET /api/throw');
  return res.status(200).send('OK');
});
app.get('/api/throw/:throwId',function(req,res){
  console.log('GET /api/throw/:throwId');
  return res.status(200).send('OK');
});
app.post('/api/throw',function(req,res){
  console.log('POST /api/throw');
  return res.status(200).send('OK');
});
app.put('/api/throw',function(req,res){
  console.log('PUT /api/throw');
  return res.status(200).send('OK');
});
app.delete('/api/throw',function(req,res){
  console.log('DEL /api/throw');
  return res.status(200).send('OK');
});

app.listen(3000,function(){
  console.log('Started app on port 3000');
});