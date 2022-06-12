const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";

module.exports = function (req, res, next) {
    if (req.url == "/login" && req.method == "POST") {
        if (req.body != null && req.body.name == USERNAME && req.body.password == PASSWORD) {
            const token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
            res.json({ succes: true, token })
        } else {
            res.json({ succes: false });
        }
        res.end();
        return;
    } else if ((req.url.startsWith("/books") && req.method != "GET") || (req.url.startsWith("/orders") && req.method != "POST")) {
        const token = req.headers["authorization"];
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}