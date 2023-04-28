import mongoDB from "../utils/mongo.db.js"
import forge from "node-forge";
export default {
     async getKeyCertById(userId){
        const user =  await mongoDB.db("SignaText_Authentication").collection("USERS").find({_id:  userId}).toArray()
            // console.log(user,user[0])
            const privateKey = forge.pki.privateKeyFromPem(user[0].privateKey)
            const certificate = forge.pki.certificateFromPem(user[0].certificate)
            return {privateKey, certificate}
        

    },
    async addNewAccount(newUser) {
        // Vy có thể thêm attribute liên quan tới newUser để thêm vào mongo nha.
        return mongoDB.db("SignaText_Document").collection("USERS").insertOne(newUser)
    },
}