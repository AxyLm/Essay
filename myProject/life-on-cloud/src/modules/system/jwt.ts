import { UnauthorizedException } from "@nestjs/common";

const jwt = require('jsonwebtoken')
const scrict = process.env.TOKEN_KEY
function creatToken(data = {}, ) {
    let palyload = {
        data:data
    }
	let token = jwt.sign(palyload, scrict, {
		expiresIn: 1000 * 60
	})
	return token;
}

async function checkToken(token):Promise<boolean> {
	return await new Promise((resovle, reject) => {
		if (!token) {
			return reject(new UnauthorizedException())
		}
		jwt.verify(token, scrict, (err, data) => {
			if(err) {
				return reject(new UnauthorizedException())
			} else {
				return resovle(data)
			}
		})
	})

}
export {
	creatToken,
	checkToken
}