const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  user: {type: String, required: true}, 
  token: {type: String, required: true},
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  folders:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  notes:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

const Item = new mongoose.Schema({
	name: {type: String, required: true},
	text: {type: String, required: true},
	checked: {type: Boolean, default: false, required: true},
	linked: {type: Boolean, default: false, required: true},
	link: {type: mongoose.Schema.Types.ObjectId, ref:'Note'}
}, {
	_id: true
});


const List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  font: {type: String, required: true},
  color: {type: String, required: true},
  items: [Item]
});

const Note = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	title: {type: String, required: true},
	font: {type: String, required: true},
	color: {type: String, required: true},
	text: {type: String, required: true},
	link: {type: mongoose.Schema.Types.ObjectId, ref:'List'},
	folder: {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
});

const Folder = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},
	color: {type: String, required: true},
	notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});


User.plugin(passportLocalMongoose);
List.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('List', List);
mongoose.model('Item', Item);
mongoose.model('Folder', Folder);
mongoose.model('Note', Note);
mongoose.connect(process.env.DB, () => {
	console.log("DB connection state: " + mongoose.connection.readyState);
  });
