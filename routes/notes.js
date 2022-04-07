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
    const newNote = new Note({user: req.session.user.user, title: req.body.title, font: "reg", color: "grey", text: req.body.noteContent, link:null, folder: null});
    newNote.save(function(err){
        if(err){
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
    const changes = {title: req.body.title, font: "reg", color: "grey", text: req.body.noteContent, link:null, folder: null};
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
	Note.findOne({_id: noteID}, (err, note) => {
		res.render('note.hbs', {note:note, user: req.session.user});
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
