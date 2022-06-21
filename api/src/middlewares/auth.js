
const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports = (req, res, next) => {
    console.log(req.headers)
    if (req.headers.autorization) {
        res.status(401).json({ msg: "Denied access" })
    } else {

        let token = req.headers.autorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                res.status(500).json({ msg: "invalid token", error })
            } else {
                console.log(req.user)
                req.user = decoded;
                next()
            }
        })
    }

}