const mongoose = require('mongoose');
//passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  user: {type: String, unique: true, required: true}, 
  token: {type: String, required: true},
  hash: {type: String, required: true}
});

const Item = new mongoose.Schema({
	list: {type: mongoose.Schema.Types.ObjectId, ref:'List'},
	text: {type: String, required: true},
	linked: {type: Boolean, default: false, required: true},
	link: {type: mongoose.Schema.Types.ObjectId, ref:'Note'}
});


const List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: {type: String, required: true},
  font: {type: String, required: true},
  color: {type: String, required: true}
});

const Note = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	title: {type: String, required: true},
	font: {type: String, required: true},
	color: {type: String, required: true},
	text: {type: String},
	folder: {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
});

const Folder = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},
	color: {type: String, required: true}
});

const NoteFolder = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	noteid: {type: mongoose.Schema.Types.ObjectId, ref:'Note'},
	folderid: {type: mongoose.Schema.Types.ObjectId, ref:'Folder'}
});


mongoose.model('User', User);
mongoose.model('List', List);
mongoose.model('Item', Item);
mongoose.model('Folder', Folder);
mongoose.model('Note', Note);
mongoose.model('NoteFolder', NoteFolder);
mongoose.connect(process.env.DB, () => {
	console.log("DB connection state: " + mongoose.connection.readyState);
  });
