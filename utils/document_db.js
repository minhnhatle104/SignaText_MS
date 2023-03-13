//lets require/import the mongodb native drivers.
import mongodb from 'mongodb'
var MongoClient = mongodb.MongoClient;
var url = "mongodb+srv://dacnpmgroup07:yDRXAJ5YlP2x5a6m@cluster0.rzo5ngl.mongodb.net/?retryWrites=true&w=majority"
const mongo = await MongoClient.connect(url);
export default mongo.db("SignaText_Document")
