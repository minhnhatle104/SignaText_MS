import { channel } from "./rabbitmq_config.js"

const receiveMessage = async (nameQueue)=>{
    try{
        await channel.assertQueue(nameQueue,{
            durable:true
        })
        // 4. receive to queue
        return await channel.consume(nameQueue,message=>{
            console.log("Message: ",message.content.toString())
            return message.content.toString()
        },{
            noAck:true
        })
    }catch(error){
        console.log("Error: ",error.message)
    }
}