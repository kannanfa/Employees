
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');


var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Employee'); 
//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 


var emp = mongoose.model('formda',
{   _id : Number,
	firstname :String ,
	lastname : String,
	Gender:String,
	dob:String,
	 UG:String,
	 PG:String,
	 designation:String,
	 experience:String,
	 salary:String,
	 address:String});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
 
app.get('/', routes.index);
app.get('/users', user.list);



// Create content formda
app.post('/api/formda', function(req, res) {


	console.log
		emp.create({
					 _id : req.body._id,
                  firstname  : req.body.firstname,
                  lastname : req.body.lastname,
                  Gender : req.body.Gender,
                  dob : req.body.dob ,
                  UG : req.body.UG,
                  PG : req.body.PG,
                  designation : req.body.designation,
                  experience : req.body.experience,
                  salary : req.body.salary,
                  address : req.body.address	
                
		}, 
		function(err, emp) {
			if (err)
				res.send(err);}

		);

	});

app.get('/api/formdas', function(req, res) {

		// use mongoose to get all formdas in the database
		emp.find(function(err, formdas) {


			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(formdas); // return all todos in JSON format
		});
	});



	app.delete('/api/formdas/:emp_id', function(req, res) {
		emp.remove({
			_id : req.params.emp_id
		}, function(err, emp) {
			if (err)
				res.send(err);

			// get and return all the formdas after you create another
			emp.find(function(err, formdas) {
				if (err)
					res.send(err)
				res.json(formdas);
			});
		});
	});







app.get('/api/formdas/:em_id',function(req, res) {

	console.log("uuuuuuuuuuu")
emp.find({
			_id : req.params.em_id
	},function(err, formdas) {
			if (err)
				res.send(err)

			res.json(formdas);
		});

	});









app.post('/api/update', function(req, res) {
	//console.log(req.body);

//   emp.where('_id',req.body._id).update({$set: {firstname  : 'good'}}, function (err, count) {});
	emp.update({_id: req.body._id},{$set:{
                  firstname  : req.body.firstname,
                  lastname : req.body.lastname,
                  Gender : req.body.Gender,
                  dob : req.body.dob ,
                  UG : req.body.UG,
                  PG : req.body.PG,
                  designation : req.body.designation,
                  experience : req.body.experience,
                  salary : req.body.salary,
                  address : req.body.address	
                
}},function(err, emp) {
			if (err)
				console.log("ERRRRRRRROR")
				//res.send(err);
			});



});




app.get('/form2', function(req, res) {
		res.sendfile('./public/angsta1.html'); // load the single view file (angular will handle the page changes on the front-end)
	});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
