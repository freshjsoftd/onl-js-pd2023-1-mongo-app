require('dotenv').config();

module.exports = {
	development: {
		host: '127.0.0.1',
		port: process.env.MONGO_PORT,
		dbName: process.env.MONGO_DB_NAME,
	},
};