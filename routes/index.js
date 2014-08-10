var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var moment = require('moment');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var Card = mongoose.model('card', {weight: Number, week: Number, imgUrl: String, time: String})

/* GET home page. */
router.get('/', function(req, res) {
  		
		var q = Card.find().sort([['_id', -1]]).limit(3);
					q.exec(function(err, posts) {
						console.log(posts);
						res.render( 'index', {cards: posts} );
				});
		

	
});

router.get('/newCard', function(req, res) {
  
		res.render( 'newCard');
	
});

router.post('/card-upload', function (req, res) {
	console.log(req.body.week);
	var tmp_path = req.files.thumbnail.path;
	var target_path = './public/images/' + req.files.thumbnail.name;
	var imgurl = '/images/' + req.files.thumbnail.name;
	// move the file from the temporary location to the intended location
	fs.rename(tmp_path, target_path, function(err) {
		if (err) throw err;
		// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		fs.unlink(tmp_path, function() {
			if (err) throw err;
			var week = req.body.week;
			var weight = req.body.weight;
			var imgUrl = imgurl;
			var card = new Card({week: week, weight: weight, imgUrl: imgUrl, time:  moment().format('DD/MM-HH:MM')})
			card.save(function (err) {
				if (err)
					console.log(err);
				
				res.redirect('/');
			});
		});
	});
});

router.get('/user/:id', function(req, res){
	id = req.params.id;
	User.findById( id, function (err, user){
		
		res.render('user', {user:user});
	});
});

router.get("/deleteUser/:id", function (req, res){
	id = req.params.id;

	User.findById( id, function ( err, user ){
		user.remove( function ( err, user ){
		  res.redirect( '/' );
		});
  });
});

router.post("/storeUser", function (req, res ) {
	
	var name = req.body.name;
	var items = [];
	var user = new User({ name: name, items: items });
	
	
	user.save(function (err) {
		if (err) // ...
		console.log(err);
	});
	
	User.find( function ( err, users, count ){
		
		res.redirect( '/' );
	});

});

module.exports = router;
