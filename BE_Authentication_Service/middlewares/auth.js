import { sendMessage } from "../rabbitmq/producer.js";
import admin from "../utils/firebase-config.js";

export default {
    // async decodeToken(req, res, next) {
	// 	const token = req.headers.authorization;
	// 	if(!token){
	// 		return res.status(401).json({ message: 'Unauthorize' });
	// 	}
	// 	try {
	// 		const decodeValue = await admin.auth().verifyIdToken(token);
	// 		if (decodeValue) {
	// 			req.user = decodeValue;
	// 			console.log(decodeValue)
	// 			console.log(decodeValue.firebase.identities)
	// 			return next();
	// 		}
	// 		return res.status(401).json({ message: 'Unauthorize' });
	// 		return
	// 	} catch (e) {
	// 		return res.status(500).json({ message: 'Internal Error' });
	// 	}
	// },

	async authenticateUser(req){
		const token = req.headers.authorization;
		if(!token){
			sendMessage({statusCode:401,message:"Unauthorize"})
			return
		}
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				console.log(decodeValue)
				console.log(decodeValue.firebase.identities)
				sendMessage({statusCode:200,message:"Authenticate success"})
				return 
			}
			sendMessage({statusCode:401,message:"Unauthorize"})
			return 
		} catch (e) {
			sendMessage({statusCode:500,message:"Internal Error"})
			return 
		}
	}
}