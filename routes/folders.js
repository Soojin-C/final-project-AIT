const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Folder = mongoose.model('Folder'),
    Note = mongoose.model('Note'),
    NoteFolder = mongoose.model('NoteFolder');


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
    Folder.find({user: req.session.user.user}, (err, folders) => {
        //console.log(notes);
		res.render('folders.hbs', {user: req.session.user, folders: folders});
	});
});

router.post('/newFolder', (req, res) => {
    console.log(req.body);
    const newFolder = new Folder({user: req.session.user.user, name:req.body.folderName, color:req.body.folderColor});
    newFolder.save(function(err){
        if(err){
            console.log(err);
            res.render('newFolder.hbs', {error: err, user: req.session.user});
        }
        else{
            res.redirect('/folders');
        }
    });
});

router.get('/:folderID', async (req, res) => {
	const {folderID} = req.params;
    console.log(folderID);
    let folderData = {};
    let allNotes = [];
    let notesInFolder = [];
    try{
        folderData = await Folder.findOne({_id: folderID});
    }
    catch(err){
        console.log(err);
    }
    try{
        allNotes = await Note.find({user: req.session.user.user});
    }
    catch(err){
        console.log(err);
    }
    try{
        notesInFolder = await NoteFolder.find({folderid: folderID});
    }
    catch(err){
        console.log(err);
    }
    notesInFolder = notesInFolder.map(e => e.noteid.toString());
    //console.log(allNotes);
    //console.log(notesInFolder);
    const alreadyAdded = [];
    const newNotes = [];
    allNotes.forEach((e)=>{
        //console.log(e._id);
        //console.log(notesInFolder.includes(e.id));
        if(notesInFolder.includes(e.id)){
            e.folderid = folderID;
            alreadyAdded.push(e);
        }
        else{
            newNotes.push(e);
        }
    });
    //console.log(alreadyAdded);
    //console.log(newNotes);
    res.render('folder.hbs', {folder:folderData, newNotes: newNotes, alreadyAdded: alreadyAdded, user: req.session.user});
});

router.get('/delete/:folderID/:noteID', (req, res) => {
	const {folderID, noteID} = req.params;
    console.log(req.params);
    NoteFolder.deleteOne({noteid: noteID, folderid: folderID}, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(`/folders/${folderID}`);
            res.redirect(`/folders/${folderID}`);
        }
    });
});

module.exports = router;
