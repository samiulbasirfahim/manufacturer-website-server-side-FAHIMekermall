// import
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const user_router = require("./routers/user_routers")
const dotenv = require("dotenv")
const part_router = require("./routers/part_routers")
const booking_router = require("./routers/booking_router")
const review_router = require("./routers/review_router")
const payment_router = require("./routers/payment_router")
dotenv.config()

// use middleware
const corsOptions = {
	origin: ["https://manufacturer-website-server.herokuapp.com/", "http://localhost:4000/"],
	preflightContinue: false,
	credentials: true,
}

app.use(cors())
app.use(express.json())

// connect mongoose
mongoose
	.connect(process.env.mongodb_uri)
	.then(() => console.log("connected"))
	.catch((err) => console.log(err))

// routers
app.use("/user", user_router)
app.use('/part', part_router)
app.use('/booking', booking_router)
app.use('/review', review_router)
app.use('/payment', payment_router)

// app listen
app.listen(process.env.PORT || 4000)
