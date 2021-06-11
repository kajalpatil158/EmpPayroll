const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            console.log(token);
            jwt.verify(token, "abc123", (err, decoded) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: "Token Expire"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Access Denied!, Unauthorised User "
            });
        }
    }
};