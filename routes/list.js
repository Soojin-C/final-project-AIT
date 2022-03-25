const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	List = mongoose.model('List');

const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
}

router.use(isAuthenticated)

router.get('/', (req, res) => {
	List.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
		res.render('list-all.hbs', {lists:lists});
	});
});

router.get('/create', (req, res) => {
  res.render('list-create.hbs');
});

router.post('/create', (req, res) => {
	const {name} = req.body;
	new List({
    user: req.user._id,
		name: name,
		createdAt: Date.now()
	}).save((err, list, count) => {
		res.redirect(`/list/${list.slug}`);
	});
});

router.get('/:slug', (req, res) => {
	const {slug} = req.params;
	List.findOne({slug}, (err, list, count) => {
		res.render('list-slug.hbs', {list, displayListItems:list.items.length >= 1});
	});
});

module.exports = router;
