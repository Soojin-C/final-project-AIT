const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	List = mongoose.model('List'),
	Item = mongoose.model('Item');

router.post('/create', (req, res) => {
	const {listSlug, name, quantity}  = req.body;
	const listItem = {name, quantity};

	List.findOneAndUpdate({slug:listSlug}, {$push: {items: listItem}}, (err, list, count) => {
    console.log(err);
		res.redirect(`/list/${listSlug}`);
	});
});

router.post('/check', (req, res) => {
	const {listSlug, items} = req.body;

	List.findOne({slug:listSlug}, (err, list, count) => {
    console.log(`items: ${items}, list: ${list}`);
		for (let i = 0; i < list.items.length; i++) {
      console.log(list.items[i]);
			if (items?.includes(list.items[i].name)) {
				list.items[i].checked = true;
			}
		}
		list.markModified('items');
		list.save((err, savedList, count) => {
      console.log(err);
			res.redirect(`/list/${listSlug}`);
		});
	});
});

module.exports = router;
