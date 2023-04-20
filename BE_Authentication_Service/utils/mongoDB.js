import mongodb from 'mongodb'
var MongoClient = mongodb.MongoClient;
var url = "mongodb+srv://duykhuong:3hoTx6csdLzK4syK@cluster0.rzo5ngl.mongodb.net/?retryWrites=true&w=majority"
const mongo = await MongoClient.connect(url);
export default mongo.db("SignaText_Authentication")
