import serviceAccount from "../utils/serviceAccount.js";
import moment from "moment";
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
    }
}