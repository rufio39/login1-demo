const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { validateJWT } = require('../../../lib/jwt')

const bcryptSalt = 8

// this makes sure user document has a user name property
// and forces userName to be lowercase
async function formatUser(user) {

  let rtnValue = null
  // check for user name prop
  if (!user.hasOwnProperty("userName")) {

    throw new Error("No userName property")

  } else {
    // copy user object
    rtnValue = { ...user }
    // force userName to be lowe case
    rtnValue.userName = rtnValue.userName.toLowerCase()

    // encrypt password
    if (user.hasOwnProperty("password")) {

      try {
        rtnValue.password = await bcrypt.hash(user.password, bcryptSalt)
        console.log(user.password)
      }
      catch (err) {
        console.log("BCRYPT", err.message)
        throw err
      }
    }
  }

  return rtnValue
}
/* GET users listing. */
router.get('/', function (req, res, next) {

  const info = {
    query: {},
    collection: req.app.locals.collectionUsers
  }
  db.readAll(info)
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).send("Unable to get document ", err.message)
    })
});

// localhost:3000/api/v1/users/Gandalf
router.get('/:userName', function (req, res, next) {

  if (req.params.userName !== undefined) {

    const userName = req.params.userName.toLowerCase()

    const info = {
      query: {
        fName: userName
      },
      collection: req.app.locals.collectionUsers
    }
    db.readOne(info)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  } else {
    res.status(400).send("Username is not defined  ")
  }
})

router.post('/', validateJWT, function (req, res, next) {

  formatUser(req.body)
    .then(user => {

      // handle user object
      console.log("USER", user)

      const info = {
        doc: user,
        collection: req.app.locals.collectionUsers
      }
      db.readOne({
        query: { userName: user.userName },
        collection: req.app.locals.collectionUsers
      })
        .then(foundUser => {
          if (foundUser !== null) {
            throw new Error(`User ${user.userName} Already exist.`)
          }
          // should execute if user is found
          return db.createOne(info)

        })
        .then(resDoc => {

          if (resDoc.insertedCount === 1) {
            //ops is an array of all insterted docs
            res.json(resDoc.ops[0])
          }

        })
        .catch(err => {
          res.status(500).send(err.message)
        })
    })

}, error => {
  console.log(err.message)
  res.status(400).send(err.message)
})


router.put('/:userName', function (req, res, next) {

  if (req.params.userName !== undefined) {

    const userName = req.params.userName.toLowerCase()

    const info = {
      query: {
        userName: userName
      },
      doc: req.body,
      collection: req.app.locals.collectionUsers
    }

    db.replaceOne(info)
      .then(response => {

        if (response.value === null) {

          return db.createOne(info)
        }

        res.json(response)

      })

      .catch(err => {

        res.status(500).send("failed to replace", err.message)

      })
  } else {

    res.status(400).send("username is undefined")

  }
})

router.patch('/:userName', function (req, res, next) {

  if (req.params.userName !== undefined) {

    const userName = req.params.userName.toLowerCase()

    let user = req.body

    const info = {

      query: {
        userName: userName
      },
      doc: user,
      collection: req.app.locals.collectionUsers
    }

    db.changeOne(info)

      .then(response => {

        if (response.ok !== 1) {

          throw new Error(`Username ${req.params.userName} not found.`)

        }

        return db.readOneById({
          id: response.value._id,
          collection: req.app.locals.collectionUsers
        })

      })
      .then(resDoc => {
        res.json(resDoc)

      })
      .catch(err => {
        res.status(500).send("failed to update", err.message)
      })

  } else {

    res.status(400).send("Username is undefined")
  }

})

router.delete('/:userName', function (req, res, next) {

  if (req.params.userName !== undefined) {

    const userName = req.params.userName.toLowerCase()

    const info = {
      query: {
        userName: userName
      },
      collection: req.app.locals.collectionUsers
    }



    db.deleteOne(info)
      .then(response => {

        if (response.deletedAccount === 1) {
          res.json({})

        } else {
          // develop a proper error handler
          res.json(req.params.userName)
        }
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  } else {

    res.status(400).send("Username is undefined")

  }
})

module.exports = router;
