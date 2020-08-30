//Initialisation 
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var methodoverride=require('method-override');
var sanitizer=require('express-sanitizer');
var flash=require('connect-flash');
var middleware=require('./middlewares/middleware');
//Passport Config
var passport=require('passport');
var LocalStrategy=require('passport-local');
var passportlocalmongoose=require('passport-local-mongoose');
//modules
var User=require('./models/user');
var Blog=require('./models/blog');

//routes
var Blogroutes=require('./Routes/Blog');
var Authroutes=require('./Routes/Auth');


//APP config
mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true,useUnifiedTopology: true });
//local db :  ('mongodb://localhost/blog_app',{ useNewUrlParser: true,useUnifiedTopology: true })

app.set('view engine' ,'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodoverride('_method'));
app.use(sanitizer());		//ALways use it after bodyParser
app.use(flash());


//Passport Config
	app.use(require('express-session')({
		secret:'Rusty is cat ',
		resave:false,
		saveUninitialized:false
	}));
	//Intializeing the passport and session
	app.use(passport.initialize());	
	app.use(passport.session());
	//authenticate from mongoose
	passport.use(new LocalStrategy(User.authenticate()));
	//reading the data from sessiona and keeping it on in login and remove in logout
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

//middleware
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash('error');
	res.locals.success=req.flash('success');
	next();
});

//Routes
app.use(Blogroutes);
app.use(Authroutes);

//Server
app.listen(process.env.PORT || 2000,function(req,res){
	console.log('Server has been Started');
});
