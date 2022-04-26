const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	List = mongoose.model('List'),
    Item = mongoose.model('Item'),
    Note = mongoose.model('Note');

const isAuthenticated = (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
};

router.use(isAuthenticated);

router.get('/',(req, res) => {
    List.find({user: req.session.user.user}, (err, lists)=>{
        if(err){
            console.log(err);
        }
        else{
            const ret = async() =>{
                for(const list of lists){
                    const items = await Item.find({list: list._id});
                    //console.log(items);
                    list.items = items;
                }
                res.render('lists.hbs', {user: req.session.user, lists: lists});
            };
            ret();
        }
    });
});

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
    const ret = async() =>{
        for(const item of items){
            const newItem = new Item(item);
            try{
                await newItem.save();
            }
            catch(err){
                console.log(err);
            }
        }
        res.redirect('/lists');
    };
    ret();
});

router.post('/save/:listID', async (req, res) => {
    const {listID} = req.params;
    console.log(req.body);
    const changes = {title: req.body.title, font: req.body.fontlist, color: req.body.colorlist};
    try {
        await List.findByIdAndUpdate(listID, changes);
    }
    catch(error){
        console.log(error);
    }
    try{
        const items = await Item.find({list: listID});
        const ret = async() =>{
            for(const item of items){
                const id = item.id;
                const itemids= req.body.linkIDSaved.includes(id);
                console.log(itemids);
                //update the already saved 
                if (itemids){
                    const i = req.body.linkIDSaved.indexOf(id);
                    const linked = req.body.linker[i];
                    if (linked !== ""){
                        item.linked = true;
                        item.link = linked;
                    }
                    else{
                        item.linked = false;
                        item.link = null;
                    }
                    await item.save();
                }
                //deleted, remove it.
                else{
                    await Item.deleteOne({_id: id});
                }
            }
        };
        await ret();
        const newItemI = req.body.linkIDSaved.indexOf("");
        const itemsNames = req.body.items.slice(newItemI);
        const linker = req.body.linker.slice(newItemI);
        const newItems = linker.map((e, i)=>{
            const retVal = {};
            if (e !== ""){
                retVal.linked = true;
                retVal.link = e;
            }
            else{
                retVal.linked = false;
            }
            retVal.list = listID;
            retVal.text = itemsNames[i];
            return retVal;
        });
        const addNew = async () =>{
            for(const item of newItems){
                const newItem = new Item(item);
                try{
                    await newItem.save();
                }
                catch(err){
                    console.log(err);
                }
            }
        };
        await addNew();
        res.redirect("/lists");
    }
    catch(err){
        console.log(err);
    }
    
});

router.get('/:listID', (req, res) => {
	const {listID} = req.params;
    let colors = ["c-grey", "c-red", "c-orange", "c-yellow", "c-green", "c-mint", "c-blue", "c-purple", "c-pink"];
    let fonts = ["f-helvetica", "f-arial", "f-squarepeg"];
	List.findOne({_id: listID}, (err, list) => {
        colors = colors.map((each)=>{
            return each === list.color;
        });
        fonts = fonts.map((each)=>{
            return each === list.font;
        });
        Item.find({list: listID}, (err, items)=>{
            if(err){
                console.log(err);
            }
            else{
                Note.find({user: req.session.user.user}, (err, notes) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        //console.log(list);
                        const ret = async() =>{
                            for(const item of items){
                                if (item.linked){
                                    const note = await Note.findOne({_id: item.link});
                                    //console.log(note);
                                    item.note = note;
                                }
                            }
                            list.items = items;
                            res.render('list.hbs', {list:list, color:colors, font: fonts, user: req.session.user, notes: notes});
                        };
                        ret();
                    }
                });
            }
        });
	});
});

router.get('/delete/:listID', async (req, res) => {
	const {listID} = req.params;
    try{
        await List.findByIdAndRemove(listID);
    }
    catch(err){
        console.log(err);
    }

    try{
        const items = await Item.find({list: listID});
        const ret = async() =>{
            for(const item of items){
                await Item.deleteOne({_id: item.id});
            }
        };
        await ret();
        res.redirect("/lists");
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;
