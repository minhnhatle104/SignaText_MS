import amqplib from "amqplib";

export const amqp_url_cloud = "amqps://qljyvauk:5U7L0D5R7Aveb5Pc3k3xOpTC7ZgSDWel@dingo.rmq.cloudamqp.com/qljyvauk"

// 1. Create connection
const conn = await amqplib.connect(amqp_url_cloud)
// 2. Create channel
export const channel = await conn.createChannel()