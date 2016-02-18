/**
 * Created by timfulmer on 2/11/16.
 */
const thro=require('../models/thro');

function listThrows(req,res,next){
  thro.list(req.body.thro,function(err,data){
    if(err){
      console.log('Could not list thros:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  });
}
function readThrow(req,res,next){
  thro.read(req.body.throwId,function(err,data){
    if(err){
      console.log('Could not get thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  });
}
function createThrow(req,res,next){
  thro.create(req.body,function(err,data){
    if(err){
      console.log('Could not create thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  })
}
function updateThrow(req,res,next){
  thro.update(req.body,function(err,data){
    if(err){
      console.log('Could not update thro:\n%s',err.stack);
      return next(err);
    }
    res.json(data);
    return next();
  })
}
function deleteThrow(req,res,next){
  thro.remove(req.body.throwId,function(err){
    if(err){
      console.log('Could not delete thro:\n%s',err.stack);
      return next(err);
    }
    return next();
  })
}

module.exports={
  listThrows:listThrows,
  readThrow:readThrow,
  createThrow:createThrow,
  updateThrow:updateThrow,
  deleteThrow:deleteThrow
};