var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var moment = require('moment');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var Card = mongoose.model('card', {weight: Number, week: Number, imgUrl: String, time: Date, name: String})

/* GET home page. */
router.get('/', function(req, res) {
	
	Card.findOne({name: 'alex'}, {}, { sort: { 'time' : -1 } }, function (err, NewestAlex) {
  		
		Card.findOne({name: 'alex'}, {}, { sort: { 'time' : 1 } }, function (err, OldestAlex) {

			Card.findOne({name: 'lukas'}, {}, { sort: { 'time' : -1 } }, function (err, NewestLukas) {

				Card.findOne({name: 'lukas'}, {}, { sort: { 'time' : 1 } }, function (err, OldestLukas) {

					res.render('index', {newestAlex: NewestAlex, oldestAlex: OldestAlex, newestLukas: NewestLukas, oldestLukas: OldestLukas});

					});

			});

		});

	});

});

router.get('/newCardAlex', function(req, res) {
  
		res.render( 'newCard', {name: "alex" });
	
});

router.get('/newCardLukas', function(req, res) {
  		
		res.render( 'newCard', {name: "lukas"});
	
});

router.post('/card-upload', function (req, res) {
	
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
			var name = req.body.name;
			var imgUrl = imgurl;
			var card = new Card({week: week, weight: weight, name: name, imgUrl: imgUrl, time:  Date.now()})
			card.save(function (err) {
				if (err)
					console.log(err);
				
				res.redirect('/');
			});
		});
	});
});



module.exports = router;
