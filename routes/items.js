const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	List = mongoose.model('List'),
    Item = mongoose.model('Item'),
    Note = mongoose.model('Note'),
    NoteFolder = mongoose.model('NoteFolder');

router.get('/newList', (req, res) => {
    Note.find({user: req.session.user.user}, (err, notes) => {
        console.log(notes);
		res.render('newList.hbs', {user: req.session.user, notes: notes});
	});
});

router.post('/save', (req, res) => {
    console.log(req.body);
    const newList = new List({user: req.session.user.user, title: req.body.title, font: req.body.fontlist, color: req.body.colorlist});
    const _id = newList._id;
    newList.save(function(err){
        if(err){
            res.render('newList.hbs', {error: err, user: req.session.user});
        }
    });
    const items = req.body.linker.map((e, i)=>{
        const retVal = {};
        if (e !== ""){
            retVal.linked = true;
            retVal.link = e;
        }
        else{
            retVal.linked = false;
        }
        retVal.list = _id;
        retVal.text = req.body.items[i];
        return retVal;
    });
    items.forEach(element => {
        const newItem = new Item(element);
        newItem.save(function(err){
            if(err){
                res.render('newList.hbs', {error: err, user: req.session.user});
            }
        });
    });
    res.redirect('/lists');
});

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
            res.send({status: 200});
        }
    });
});

router.get('/:noteID', (req, res) => {
	const {noteID} = req.params;
	Note.findOne({_id: noteID}, (err, note) => {
        console.log(note);
        res.send(note);
	});
});

router.post('/delete/:itemID', (req) => {
	const {itemID} = req.params;
    Item.findByIdAndRemove(itemID, (err) => {
        if(err){
            console.log(err);
        }
    });
});

module.exports = router;
