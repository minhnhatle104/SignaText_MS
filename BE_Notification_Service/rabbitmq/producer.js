import amqplib from "amqplib"
import { channel } from "./rabbitmq_config.js"

export const sendMessage = async (message,nameQueue)=>{
    try{
        // 3. Create queue
        await channel.assertQueue(nameQueue,{
            durable:true
        })
        // 4. receive to queue
        await channel.sendToQueue(nameQueue,Buffer.from(message),{
            persistent:true
        })
    }catch(error){
        console.log("Error: ",error.message)
    }
}