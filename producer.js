const apmqp=require('amqplib');

connect();
 async function connect(){

    const msg={user:'gautam'}
    try{
        const connection=await apmqp.connect("amqp://localhost")
        const channel=await connection.createChannel();
        const result=await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg.user)))
        console.log(`job sent successfully ${msg}`);
    }
    catch(err){
        console.error(err);
    }
}