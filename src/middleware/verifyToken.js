const verifyToken = (req, res, next) => {
	const authorization = req.headers.authorization
	if (!authorization) {
		return res
			.status(403)
			.send({ message: "authorization header required" })
	}
	const token = authorization.split(" ")[1]
	if (!token) {
		return res.status(403).send({ message: "token required" })
	}
	next()
}

module.exports = verifyToken
