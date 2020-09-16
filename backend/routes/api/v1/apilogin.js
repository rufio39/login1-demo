const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../../database/mongo");
const jwt = require("../../../lib/jwt")

router.post('/', function (req, res, next) {

    const credentials = req.body
    const info = {
        query: { userName: credentials.userName.toLowerCase() },
        collection: req.app.locals.collectionUsers
    }
    db.readOne(info)
        .then(foundUser => {

            if (foundUser === null) {
                res.json({ authenticated: false })
            }
            else {
                // check to see if password matches
                bcrypt.compare(credentials.password, foundUser.password)

                    .then(match => {
                        if (match === true) {

                            // create a jwt token
                            jwt.signP({ userName: foundUser.userName, userID: foundUser._id })
                                .then(token => {
                                    console.log(token)
                                    res.json({ authenticated: true, token })
                                })
                                .catch(err => {
                                    throw err
                                })

                        }
                        else {
                            res.json({ authenticated: false })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
});

module.exports = router;