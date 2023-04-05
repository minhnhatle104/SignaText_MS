import amqplib from "amqplib"
import { amqp_url_cloud } from "./rabbitmq_config.js"

export const sendMessage = async (message)=>{
    try{
        // 1. Create connection
        const conn = await amqplib.connect(amqp_url_cloud)
        // 2. Create channel
        const channel = await conn.createChannel()
        // 3. Create queue
        const nameQueue = "resAuthenticate"
        // 4. Create queue
        await channel.assertQueue(nameQueue,{
            durable:true
        })
        // 5. receive to queue
        await channel.sendToQueue(nameQueue,Buffer.from(message),{
            persistent:true
        })
    }catch(error){
        console.log("Error: ",error.message)
    }
}