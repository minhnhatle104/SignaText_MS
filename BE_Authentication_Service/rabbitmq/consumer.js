import amqplib from "amqplib"
import { amqp_url_cloud } from "./rabbitmq_config.js"

export const receiveMessage = async (nameQueue)=>{
    try{
        // 1. Create connection
        const conn = await amqplib.connect(amqp_url_cloud)
        // 2. Create channel
        const channel = await conn.createChannel()
        // 3. Create queue
        await channel.assertQueue(nameQueue,{
            durable:true
        })
        // 4. receive to queue
        request = await channel.consume(nameQueue,message=>{
            console.log("Message: ",message.content.toString())
            return JSON.parse(message.content.toString())
        },{
            noAck:true
        })
        return request
    }catch(error){
        console.log("Error: ",error.message)
    }
}