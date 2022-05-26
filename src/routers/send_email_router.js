const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
require('dotenv').config()
const express = require('express');
const router = express.Router()

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
    auth: {
        api_key: process.env.mail_gun_api,
        domain: process.env.mail_gun_domain,
    }
}

console.log(auth)

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const email =





    router.post('/', async (req, res) => {
        nodemailerMailgun.sendMail({
            from: "manufacturer-website@spark.com",
            to: 'samiulbasirfahim360@gmail.com',
            subject: req.body.subject,
            text: `Hello boss, I'm ${req.body.name}, My message is ${req.body.text}`
        }, (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
                res.status(500).send(err)
            }
            else {
                console.log(info);
                res.send(info);
            }
        });
    })

module.exports = router