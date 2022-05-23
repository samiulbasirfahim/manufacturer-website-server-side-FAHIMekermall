const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req, res, next) => {
	const authorization = req.headers.authorization_token
	if (!authorization) {
		return res
			.status(403)
			.send({ message: "authorization header required" })
	}
	const token = authorization.split(" ")[1]
	const email = req.headers.authorization_email
	if (!token) {
		return res.status(403).send({ message: "token required" })
	} else {
		jwt.verify(token, process.env.secret_key, (err, decoded) => {
			if (err) {
				console.error(err)
				return res.status(401).send({ message: "unauthorized" })
			} else {
				if (decoded.email === email) {
					next()
				} else {
					console.log('error' + email + decoded.email)
					return res.status(401).send({ message: "unauthorized" })
				}
			}
		})
	}

}

module.exports = verifyToken
