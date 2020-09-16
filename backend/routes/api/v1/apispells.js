const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const app = require('../../../app');
const { response } = require('../../../app');

/* GET spellbooks listing. */
router.get('/', function (req, res, next) {

  const info = {
    query: {},
    collection: req.app.locals.collectionSpells
  }
  db.readAll(info)
    .then(spellbooks => {
      res.json(spellbooks)
    })
    .catch(err => {
      console.log(err)
    })
});

// localhost:3000/api/v1/spellbooks/Gandalf
router.get('/:spellbookName', function (req, res, next) {

  const info = {
    query: {
      fName: req.params.spellbookName
    },
    collection: req.app.locals.collectionSpells
  }
  db.readOne(info)
    .then(spellbook => {
      res.json(spellbook)
    })
    .catch(err => {
      console.log(err)
    })

})

router.post('/', function (req, res, next) {

  const info = {
    doc: req.body,
    collection: req.app.locals.collectionSpells
  }

  db.createOne(info)
    .then(spellbook => {
      res.json(spellbook)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/:spellbookName', function (req, res, next) {

  const info = {
    query: {
      fName: req.params.spellbookName
    },
    collection: req.app.locals.collectionSpells
  }

  db.deleteOne(info)
    .then(response => {

      if (response.deletedAccount === 1) {
        res.json({})

      } else {
        // develop a proper error handler
        res.json(req.params.spellbookName)
      }
    })
    .catch(err => {
      console.log(err)
    })

})

module.exports = router;
