//lets require/import the mongodb native drivers.
import mongodb from 'mongodb'
var MongoClient = mongodb.MongoClient;
var url = "mongodb+srv://duykhuong:3hoTx6csdLzK4syK@cluster0.rzo5ngl.mongodb.net/?retryWrites=true&w=majority"

const mongo = await MongoClient.connect(url);
// mongo.db("Data-Analytics").collection("KawaiiMansion_Earnings").deleteMany({})

export default mongo.db("SignaText_Document")