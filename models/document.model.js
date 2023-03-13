import db from '../utils/document_db.js'

export  default{
    async listSelfMade(userId){
        const res = await db.find({ ownerId: userId });
        return res.length == 0 ? null : res
    },
    async listOtherMade(userId){
        const res = await db.find({ ownerId: userId });
        return res.length == 0 ? null : res
    },
}