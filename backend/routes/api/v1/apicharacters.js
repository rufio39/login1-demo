const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const app = require('../../../app');
const { response } = require('../../../app');

/* GET characters listing. */
router.get('/', function (req, res, next) {

  const info = {
    query: {},
    collection: req.app.locals.collectionCharacters
  }
  db.readAll(info)
    .then(characters => {
      res.json(characters)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/:charName', function (req, res, next) {

  const info = {
    query: {
      fName: req.params.charName
    },
    collection: req.app.locals.collectionCharacters
  }
  db.readOne(info)
    .then(character => {
      res.json(character)
    })
    .catch(err => {
      console.log(err)
    })

})

router.post('/', function (req, res, next) {

  const info = {
    doc: req.body,
    collection: req.app.locals.collectionCharacters
  }

  db.createOne(info)
    .then(character => {
      res.json(character)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/:charName', function (req, res, next) {

  const info = {
    query: {
      fName: req.params.charName
    },
    collection: req.app.locals.collectionCharacters
  }

  db.deleteOne(info)
    .then(response => {
      if (response.deletedAccount === 1) {
        res.json({})
      } else {
        // develop a proper error handler
        res.json(req.params.charName)
      }
    })
    .catch(err => {
      console.log(err)
    })

})

module.exports = router;

