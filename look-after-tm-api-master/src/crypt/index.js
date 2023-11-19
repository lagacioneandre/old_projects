const crypto = require('crypto');
const CRYPT_DATA = {
    algorithm: 'aes256',
    secret: 'keys',
    type: "hex"
};

exports.crypt = (pass) => {
    const cipher = crypto.createCipher(CRYPT_DATA.algorithm, CRYPT_DATA.secret);
    cipher.update(pass);
    return cipher.final(CRYPT_DATA.type);
}