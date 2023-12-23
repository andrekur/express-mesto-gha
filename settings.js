
const { PORT = 3000 } = process.env;
const { SECRET_KEY = 'dev-secret-key' } = process.env;

module.exports.PORT = PORT;
module.exports.SECRET_KEY = SECRET_KEY;
