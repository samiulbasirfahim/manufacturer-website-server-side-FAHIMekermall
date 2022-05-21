const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const user_router = require("./routers/user_routers")
const dotenv = require("dotenv")
dotenv.config()

const corsOptions = {
	origin: ["https://manufacturer-website-server.herokuapp.com/"],
	preflightContinue: false,
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// Custom middleware
const verifyToken = (req, res, next) => {
	console.log("from verifyToken function")
	next()
}

mongoose
	.connect(process.env.mongodb_uri)
	.then(() => console.log("connected"))
	.catch((err) => console.log(err))

app.use("/user", verifyToken, user_router)

app.listen(process.env.PORT || 5000)
