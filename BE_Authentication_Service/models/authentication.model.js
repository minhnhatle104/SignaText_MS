import mongoDB from "../utils/mongoDB.js"
export default {
    async isEmailExist(email){
        const ans = await mongoDB.collection("USERS").find({email:  email}).toArray()
        if (ans.length === 0)
            return false
        return true
    },
    async addNewAccount(newUser) {
        // Vy có thể thêm attribute liên quan tới newUser để thêm vào mongo nha.
        return mongoDB.collection("USERS").insertOne(newUser)
    },
}