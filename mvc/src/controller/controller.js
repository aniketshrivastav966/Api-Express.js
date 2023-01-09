const userModel = require("../models/models");
const UserSchema = userModel.User


exports.getAll =(req, res)=>
    {
        UserSchema.find().then(user=>
            {
        res.send(user)
    }).catch(err=>{
        res.send({
            message:err.message || "something went wrong"
        })

    })
}

exports.create = (req, res)=>{
    const user = new UserSchema({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    user.save().then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "something went wrong"
        })
    })
}


exports.update = (req, res)=>{
    
    UserSchema.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true}).then(user=>{
        if (!user){
            res.send({message:"User not found with this id " + req.params.id})
        }
        res.send(user)
    }).catch(err=>{
        res.send({
            message:err.message || "something went wrong"
        })
    })
}


exports.delete = (req, res) => 
  {
    UserSchema.findByIdAndRemove(req.params.id).then(user => 
    {
      if(!user) 
        {
          return res.status(404).send({message: "user not found with id " + req.params.id});
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => 
    {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') 
      {
          return res.status(404).send({message: "user not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Could not delete user with id " + req.params.id});
    });
  };


