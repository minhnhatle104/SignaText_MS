import serviceAccount from "../utils/serviceAccount.js";
import moment from "moment";
import mongoDb from "../utils/mongo.db.js";
export default {
    async getNameUser(userId){
        const collectionUser = await serviceAccount.firestore().collection("users");
        const findUser = collectionUser.where('userId','==',userId).get()
            .then((snapshot)=>{
                if (snapshot.size > 0){
                    const nameArray = [];
                    snapshot.forEach((doc)=>{
                        const docData = doc.data();
                        return docData.full_name;
                    })
                }
                else{
                    return '';
                }
            })
        return findUser;
    },
    convertTimeStampToDate(timestamp){
        const formattedDate = moment(timestamp*1000).format('DD/MM/YYYY');
        return formattedDate;
    },
    convertTimeStampToTime(timestamp){
        const formattedTime = moment(timestamp*1000).format('HH:mm:ss');
        return formattedTime;
    },

    //get docslist owned in mongo
    async getOwnedMongo(uid) {
        const ans = await mongoDb.db("SignaText_Document").collection("DOCSLIST").find({ userCreateID: uid }).toArray()
        for (const c of ans) {
            c.isSignKey = true
            c.formatDate = new Date(c.date).toISOString().slice(0, 10)
            c.formatHour = new Date(c.date).toISOString().slice(11, 19)
            c.infoReceive = [];
            for (let i = 0; i < c.receiverName.length; i++) {
              const str = c.receiverName[i] + ' - ' + c.permission[i];
              c.infoReceive.push(str);
            }
        }
        ans.sort((a, b) => b.date - a.date);
        return ans
    },
    async getOtherMongo(uid) {
        const ans = await mongoDb.db("SignaText_Document").collection("DOCSLIST").find({ userReceiveID: { $in: [uid]}}).toArray()
        for (const c of ans) {
            c.isSignKey = true
            c.formatDate = new Date(c.date).toISOString().slice(0, 10)
            c.formatHour = new Date(c.date).toISOString().slice(11, 19)
            c.infoReceive = [];
            for (let i = 0; i < c.receiverName.length; i++) {
              const str = c.receiverName[i] + ' - ' + c.permission[i];
              c.infoReceive.push(str);
            }
            c.createrName = c.senderName
        }
        ans.sort((a, b) => b.date - a.date);
        return ans
    }
}