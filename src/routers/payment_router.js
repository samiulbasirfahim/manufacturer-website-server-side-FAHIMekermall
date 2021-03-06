const express = require('express');
const router = express.Router()
require('dotenv').config()

const stripe = require("stripe")(process.env.stripe_secret_key);
router.post('/intent', async (req, res) => {
    const price = req?.body?.price
    console.log(price)
    const amount = price * 100
    if (amount > 999999) {
        return res.status(500).send({ message: 'Your price is too high' })
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: [
            "card"
        ],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });

})

module.exports = router