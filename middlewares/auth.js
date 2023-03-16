import admin from "../utils/firebase-config.js";

export default {
    async decodeToken(req, res, next) {
		const token = req.headers.authorization;
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				console.log(decodeValue)
				console.log(decodeValue.firebase.identities)
				return next();
			}
			return res.status(401).json({ message: 'Unauthorize' });
		} catch (e) {
			return res.status(500).json({ message: 'Internal Error' });
		}
	}
}