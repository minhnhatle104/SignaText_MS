import firebase from "../utils/firebase/firebase_init.js";
export default {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization;
    try {
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorize',
          result: {}
        });
      }
      const decodeValue = await firebase.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({
        success: false,
        message: 'Unauthorize',
        result: {}
      });
    } catch (e) {
      res.status(401).json({
        success: false,
        message: e.message || 'Unauthorize',
        result: {}
      });
    }
  }
}