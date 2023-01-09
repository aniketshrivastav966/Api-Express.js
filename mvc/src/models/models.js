const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String
})
const User= mongoose.model("User", UserSchema)

module.exports = {User};

exports.delete = (req, res) => 
  {
    User.findByIdAndRemove(req.params.id).then(user => 
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