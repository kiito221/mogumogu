const red = 16711712;
const mido = 0x06ed25;
const ao = 0x1c34e5;

const Keyv = require('keyv');
const role_get = new Keyv('sqlite://db.roles.sqlite' ,{ table: 'roles' });

module.exports = {red, mido, role_get};
