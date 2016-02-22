/**
 * Created by timfulmer on 2/2/16.
 */
'use strict';

const EventEmitter=require('events');
class SimpleEmitter extends EventEmitter {}
const simpleEmitter=new SimpleEmitter();
simpleEmitter.on('event', function() {
  console.log('Event callback has fired!');
});
simpleEmitter.emit('event');

const fs=require('fs');
console.log('Queuing up a callback on the event queue.');
fs.readdir('./',function readdirCallback(err,data){
  console.log('The readdir callback has popped off the queue.');
  console.log('Read directory "./":\n%s',JSON.stringify(data,null,2));
});
console.log('Program continues to the end, then control passes to the next callback.');

