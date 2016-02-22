/**
 * Created by timfulmer on 2/9/16.
 */
'use strict';

const EventEmitter=require('events');
class SimpleEmitter extends EventEmitter {}
const counterEmitter=new SimpleEmitter(),
  fs=require('fs');
var counter=0;
counterEmitter.on('count',function(){
  console.log('Counter event emitted %s times',counter++);
});
function readdir(dir){
  counterEmitter.emit('count');
  fs.readdir(dir,function(err,data){
    // node.js callback style is an error as the first argument
    //  and a json object containing the results as the second
    if(err){
      // this allows for easy error handling
      // always return from an error, to stop processing a function
      // this is a nice, quick error handling technique
      return console.log('Caught error reading directory "%s":\n%s',name,err.stack);
    }
    data.forEach(function(name){
      fs.stat(dir+'/'+name,function(err,data){
        if(err){
          return console.log('Caught error stat "%s":\n%s',name,err.stack);
        }
        if(data.isDirectory()){
          readdir(dir+'/'+name);
        }
      });
    });
  });
}
readdir('.');