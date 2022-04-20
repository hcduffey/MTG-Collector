// The collections controller manages CRUD operations to the users collection of Magic: The Gathering cards

// SET UP ROUTER FUNCTION
const express = require('express');
const router = express.Router();

// EXTERNAL DEPENDENCIES
// https://github.com/MagicTheGathering/mtg-sdk-javascript/blob/master/README.md
const mtg = require('mtgsdk'); // Provides functions to pull Magic: The Gathering API data

// MODEL FOR COLLECTION
let collection = require('../models/collection');

// LOAD SOME INITIAL DATA FROM THE API
mtg.card.where({ supertypes: 'legendary', subtypes: 'Cat' })
.then(cards => {
    collection = cards.filter(card => typeof card.imageUrl !== 'undefined'); // I only want cards that have valid images associated with them
    console.log(`${collection.length} cards added to collection..MTG Collect is up and ready!`);
});

// ROUTES FOR COLLECTION

// index route
router.get("/", (req, res) => {
    let flash = "false";
    if(req.query.message === 'true') {
        flash = "true";
    }
    else if(req.query.message === 'error') {
        flash = "error";
    }
    else if(req.query.message === 'added') {
        flash = "added";
    }

    res.render('index.ejs', {collection: collection, flash: flash});
});

// creates a new card
router.post('/', (req, res) => {
    if(req.body.name !== "") {
        mtg.card.where({ name: req.body.name })
        .then(cards => {
            if(cards.length > 0) {
                collection.push(cards.filter(card => typeof card.imageUrl !== 'undefined')[0]);
                res.redirect("/collection?message=added");
            }
            else {
                res.redirect("/collection?message=error");
            }
        });
    } else {
        res.redirect("/collection?message=error");
    }
});

// send a form to allow the user to add a new card to their collection
router.get("/new", (req, res) => {
    res.render('new.ejs');
});

// show route to display a cards details
router.get("/:id", (req, res) => {
    const context = { 
        card: collection[req.params.id],
        index: req.params.id
    };

    if(req.query.message === 'true') {
        context.flash = "true";
    }
    else if(req.query.message === 'error') {
        context.flash = "error";
    }
    else {
        context.flash = "false";
    }

    res.render('show.ejs', context);
});

// changes and existing card to a new card
router.patch('/:id', (req, res) => {
    if(req.body.name !== "") {
        mtg.card.where({ name: req.body.name })
        .then(cards => {
            if(cards.length > 0) {
                collection[parseInt(req.params.id)] = cards.filter(card => typeof card.imageUrl !== 'undefined')[0];
                res.redirect(`/collection/${req.params.id}?message=true`);
            }
            else {
                res.redirect(`/collection/${req.params.id}?message=error`);
            }
        });
    } else {
        res.redirect(`/collection/${req.params.id}?message=error`);
    }
});

// delete route to remove a card from the collection
router.delete("/:id/", (req, res) => {
    // remove the card at provided id from the collection
    collection.splice(parseInt(req.params.id), 1);
    res.redirect('/collection?message=true');
});

module.exports = router;