const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET ?? "secret";

const result = jwt.sign({
    "scope": "wargame"
}, secret, {
    issuer: "https://hitcon.org",
    subject: "bee41cf52c6c394399c6023328b812b8edf603f9a7e44788b752439375403c34",
    expiresIn: '30d',
});

console.log(result);