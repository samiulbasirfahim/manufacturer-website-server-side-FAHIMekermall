// import
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const user_router = require("./routers/user_routers")
const dotenv = require("dotenv")
const part_router = require("./routers/part_routers")
dotenv.config()

// use middleware
const corsOptions = {
	origin: ["https://manufacturer-website-server.herokuapp.com/"],
	preflightContinue: false,
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// connect mongoose
mongoose
	.connect(process.env.mongodb_uri)
	.then(() => console.log("connected"))
	.catch((err) => console.log(err))

// routes
app.use("/user", user_router)
app.use('/part', part_router)
 
// app listen
app.listen(process.env.PORT || 4000)
