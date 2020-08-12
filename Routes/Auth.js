var express=require('express');
var passport=require('passport');
var router=express.Router();
var Blog=require('../models/blog');
var middleware=require('../middlewares/middleware');

router.get('/',function(req,res){
	res.redirect('/blogs');
})

//Handling Sign Up 
router.get('/register',function(req,res){
	res.render('register');
})
router.post('/register',function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
			if(err){
				req.flash('error',err.message);
				return res.redirect('register');
			}
			passport.authenticate('local')(req,res,function(){
				req.flash('success','Welcome to Blog router '+user.username);
					res.redirect('/blogs');					  
			});
	});
})

//Handling Logins
router.get('/login',function(req,res){
	res.render('login');
});
router.post('/login',passport.authenticate('local',{
	successRedirect:'/blogs',
	failureRedirect:'/login'
}),function(req,res){
});
//Handling logout
router.get('/logout',function(req,res){
	req.flash('success','Logged Out Successfully');
	req.logout();
	res.redirect('/blogs');
})

module.exports=router;