var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	var kittySchema = mongoose.Schema({
		name: String
	})

	var Kitten = mongoose.model('Kitten', kittySchema)
	Kitten.findOne({name: 'guiness'}, function (err, guiness){
		if (err) return console.error(err);
		console.log(guiness.name);
		guiness.name = "guiness bug"
	});
});

