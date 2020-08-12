var express=require('express');
var router=express.Router();
var Blog=require('../models/blog');
var middleware=require('../middlewares/middleware');

router.get('/blogs',function(req,res){
	Blog.find({},function(err,blogs){
		if(err){console.log('error');}
		else{
			res.render('index',{blogs:blogs});
		}
	})
	
})
router.get('/blogs/new',middleware.IsLoggedIn,function(req,res){
	res.render('new');
})
router.post('/blogs',middleware.IsLoggedIn,function(req,res){
	var title=req.body.title;
	var image=req.body.image;
	var body=req.body.body;
	var author={id:req.user._id, username:req.user.username};
	var blog={title:title,image:image,body:body,author:author};
	Blog.create(blog,function(err,newblog){
		if(err){console.log('error');}
		else{
			req.flash('success','Blog Created Successfully');
			res.redirect('/blogs');
		}
	})
})
router.get('/blogs/:id',function(req,res){
	Blog.findById(req.params.id,function(err,foundblog){
		if(err){res.redirect('/blogs');}
		else{res.render('show',{blog:foundblog});}
	})
})
//Editing ROute
router.get('/blogs/:id/edit',middleware.checkownership,function(req,res){
	Blog.findById(req.params.id,function(err,foundblog){
		if(err){res.redirect('/blogs');}
		else{
			res.render('edit',{blog:foundblog});
		}
	})
	
})
//Updating Route
router.put('/blogs/:id',middleware.checkownership,function(req,res){
	var title=req.body.title;
	var image=req.body.image;
	var body=req.body.body;
	var blog={title:title,image:image,body:body};
	Blog.findByIdAndUpdate(req.params.id,blog,function(err,updatedblog){
		if(err){res.redirect('/blogs');}
		else{
			res.redirect('/blogs/'+req.params.id);
		}
	})
})
router.delete('/blogs/:id',middleware.checkownership,function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){console.log('err');}
		else{
			res.redirect('/blogs');
		}
	})
	
});
module.exports=router;