const express = require("express")
const cors = require("cors")
const router = require("./routers/routers")
const { MongoClient, ServerApiVersion } = require("mongodb")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const corsOptions = {
	origin: ["https://manufacturer-website-server.herokuapp.com/"],
	preflightContinue: false,
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

const uri = `mongodb+srv://${process.env.mongodb_user_name}:${process.env.mongodb_password}@cluster0.ajlcv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

const run = async () => {
	try {
		await client.connect()
		const userCollections = client.db("manufacturer").collections("user")

		app.use(router)
	} finally {
		console.log("Succes")
	}
}

run().catch(() => console.dir())

app.listen(process.env.PORT || 5000)
