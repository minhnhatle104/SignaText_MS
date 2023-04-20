import mongoDB from "../utils/mongoDB_Noti.js"
export default {
    async addNewDoc(newDoc) {
        return mongoDB.collection("DOCSLIST").insertOne(newDoc)
    }
}