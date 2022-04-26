const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	//List = mongoose.model('List'),
    Item = mongoose.model('Item'),
    Note = mongoose.model('Note'),
    NoteFolder = mongoose.model('NoteFolder');

router.post('/saveNoteTo/:folderID', (req, res) => {
    const {folderID} = req.params;
    const noteid = req.body.noteid;
    const newLinker = new NoteFolder({user:req.session.user.user, noteid: noteid, folderid: folderID});
    newLinker.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            //res.redirect(`/folders/${folderID}`);
            res.status(200).send();
        }
    });
}); 

router.get('/:noteID', (req, res) => {
	const {noteID} = req.params;
	Note.findOne({_id: noteID}, (err, note) => {
        if (err){
            res.status(401).send(err);
        }
        console.log(note);
        res.status(200).send(note);
	});
});

router.post('/delete/:itemID', (req, res) => {
	const {itemID} = req.params;
    Item.findByIdAndRemove(itemID, (err) => {
        if(err){
            console.log(err);
            res.status(401).send(err);
        }
        else{
            res.status(200).send();
        }
    });
});

module.exports = router;
