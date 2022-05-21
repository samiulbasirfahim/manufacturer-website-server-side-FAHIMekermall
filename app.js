import express from "express"
import cors from "cors"
const app = express()

const corsOptions = {
	origin: ["https://playlist-manager-admin.herokuapp.com/"],
	preflightContinue: false,
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.listen(3000, () => console.log("listening on port 3000 "))
