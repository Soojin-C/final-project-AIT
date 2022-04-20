const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	List = mongoose.model('List');

const isAuthenticated = (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
};

router.use(isAuthenticated);

router.get('/', (req, res) => {
	List.find({user: req.session.user.user}, (err, lists) => {
		//console.log(lists);
		res.render('lists.hbs', {user: req.session.user, lists: lists});
	});
});

router.get('/newList', (req, res) => {
  res.render('newList.hbs', {user: req.session.user});
});

router.post('/save', (req, res) => {
    const newList = new List({user: req.session.user.user, title: req.body.title, font: "reg", color: "grey", items: req.body.items});
    newList.save(function(err){
        if(err){
            res.render('newList.hbs', {error: err, user: req.session.user});
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
    res.redirect('/lists');
});

router.post('/save/:listID', (req, res) => {
    const {listID} = req.params;
    const changes = {title: req.body.title, font: "reg", color: "grey", items: req.body.items};
    List.findByIdAndUpdate(listID, changes, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/lists");
        }
    });
});

router.get('/:listID', (req, res) => {
	const {listID} = req.params;
	List.findOne({_id: listID}, (err, list) => {
		//console.log(list);
		res.render('list.hbs', {list:list, user: req.session.user});
	});
});

router.get('/delete/:listID', (req, res) => {
	const {listID} = req.params;
    List.findByIdAndRemove(listID, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/lists");
        }
    });
});

module.exports = router;
