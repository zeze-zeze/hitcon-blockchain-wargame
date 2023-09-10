const jwt = require('jsonwebtoken');
const secret = "secret";

const result = jwt.sign({
    "scope": "wargame wargame_premium"
}, secret, {
    issuer: "https://hitcon.org",
    subject: "bee41cf52c6c394399c6023328b812b8edf603f9a7e44788b752439375403c34",
    expiresIn: '30d',
});

console.log(result);
