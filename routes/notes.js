const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Note = mongoose.model('Note');


const isAuthenticated = (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/login'); 
    console.log('redirecting');
  } else {
    next();
  }
};

router.use(isAuthenticated);


router.get('/', (req, res) => {
    Note.find({user: req.session.user.user}, (err, notes) => {
        //console.log(notes);
		res.render('notes.hbs', {user: req.session.user, notes: notes});
	});
});

router.get('/newNote', (req, res) => {
    //console.log(req.session.token);
    res.render('newNote.hbs', {user: req.session.user});
});

router.post('/save', (req, res) => {
    console.log(req.body);
    const newNote = new Note({user: req.session.user.user, title: req.body.title, font: req.body.fontlist, color: req.body.colorlist, text: req.body.noteContent, link:null, folder: null});
    newNote.save(function(err){
        if(err){
            console.log(err);
            res.render('newNote.hbs', {error: err, user: req.session.user});
        }
        //req.session.user.user.notes.push(newNote).save((err)=>{
        //    if(err){
        //        console.log(err);
        //    }
        //    else{
        //        res.redirect('/notes');
        //    }
        //});
    });
    res.redirect('/notes');
});

router.post('/save/:noteID', (req, res) => {
    const {noteID} = req.params;
    console.log(req.body);
    const changes = {title: req.body.title, font: req.body.fontlist, color: req.body.colorlist, text: req.body.noteContent, link:null, folder: null};
    Note.findByIdAndUpdate(noteID, changes, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/notes");
        }
    });
});

router.get('/:noteID', (req, res) => {
	const {noteID} = req.params;
    let colors = ["c-grey", "c-red", "c-orange", "c-yellow", "c-green", "c-mint", "c-blue", "c-purple", "c-pink"];
    let fonts = ["f-helvetica", "f-arial", "f-squarepeg"];

	Note.findOne({_id: noteID}, (err, note) => {
        colors = colors.map((each)=>{
            return each === note.color;
        });
        fonts = fonts.map((each)=>{
            return each === note.font;
        });
        console.log(fonts);
        console.log(colors);
		res.render('note.hbs', {note:note, color:colors, font: fonts, user: req.session.user});
	});
});

router.get('/delete/:noteID', (req, res) => {
	const {noteID} = req.params;
    Note.findByIdAndRemove(noteID, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/notes");
        }
    });
});

module.exports = router;
