require('dotenv').config()
const logger = require('./logger')

const config = {
	express: {
		port: parseInt(process.env.PORT) || 3000
	},
	bcrypt: {
		// TODO: what if it's not a number?
		saltRounds: parseInt(process.env.APP_BCRYPT_ROUNDS) || 5
	},
	jwt: {
		algorithm: process.env.APP_JWT_ALG || 'HS512',
		expiresIn: process.env.APP_JWT_LIFE || '1d',
		// TODO: Figure out how to load this synchronously
		privateKey: 'TODO: ..'
	},
	mongo: {
		uri: process.env.APP_MONGO_URI
	}
}

// TODO: What would happen if this one throw?
// fs.promises.readFile(process.env.APP_JWT_KEYPATH).then(key => {
// 	console.log('READING KEY???')
// 	jwtPrivateKey = key.toString()
// }).catch(err => { throw err })

// TODO: throw error when missing required ENVs
// TODO: Don't print secret
console.log(config)

module.exports = config