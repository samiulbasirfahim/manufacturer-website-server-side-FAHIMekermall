const verifyAdmin = (req, res, next) => {
    console.log('from verifyAdmin');
    next();
}

module.exports = verifyAdmin