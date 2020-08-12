var mongoose=require('mongoose');

var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	author:{
			id: {  type:mongoose.Schema.Types.ObjectId,
					ref:'User'
				},username:String
	},
	created:{type:Date,default: Date.now}
});
module.exports=mongoose.model('blog',blogSchema);	