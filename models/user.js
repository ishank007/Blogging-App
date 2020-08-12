var mongoose=require('mongoose');
var passportlocalmongoose=require('passport-local-mongoose');

var UserSchema=new mongoose.Schema({
	username:String,
	password:String
});
UserSchema.plugin(passportlocalmongoose);///will add bunch of methods in passportlocalmongoose package into our Schema

module.exports=mongoose.model('User',UserSchema);