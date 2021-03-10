require('dotenv').config()
const logger = require('./logger')
const fs = require('fs')

const config = {
	express: {
		port: parseInt(process.env.PORT) || 3000
	},
	bcrypt: {
		saltRounds: parseInt(process.env.APP_BCRYPT_ROUNDS) || 5
	},
	jwt: {
		algorithm: process.env.APP_JWT_ALG || 'HS512',
		expiresIn: process.env.APP_JWT_LIFE || '1d',
		// TODO: Handle error
		privateKey: fs.readFileSync(process.env.APP_JWT_KEYPATH)
	},
}

// TODO: throw error when missing required ENVs
// TODO: Don't print secret
console.log(config)

module.exports = config
