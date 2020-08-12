var middlewareObj={}; 
var Blog=require('../models/blog');

middlewareObj.IsLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','You need to be LoggedIn');
	res.redirect('/login');
}
middlewareObj.checkownership=function(req,res,next){
	if(req.isAuthenticated()){
		Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			req.flash('error','Something went Wrong')
			res.redirect('back');
		}
		else{
			if(foundBlog.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flash('error','Permission Denied');
				res.redirect('back');
			}
		}
		
		});
	}
	else{
		req.flash('error','You need to be LoggedIn');
		res.redirect('/login');
	}	
}
 module.exports=middlewareObj;
