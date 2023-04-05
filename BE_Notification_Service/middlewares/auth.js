import { sendMessage } from "../rabbitmq/producer.js"

export default {
    async authenticateUser(req,res,next){
        const message = {
            authorization: req.headers.authorization,
            body:req.body
        }
        console.log(JSON.stringify(message));
        await sendMessage(JSON.stringify(message),"authenticate");
        return next();
    }
}