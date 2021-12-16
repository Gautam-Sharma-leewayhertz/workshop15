const apmqp=require('amqplib');

connect();
 async function connect(){
    try{
        const connection=await apmqp.connect("amqp://localhost")
        const channel=await connection.createChannel();
        const result=await channel.assertQueue("jobs");
       
        console.log("waiting for messages  ") 
        
        channel.consume("jobs",message=>{
         const i= JSON.parse(message.content.toString());
        console.log(`recevied job with input ${i}`)
        //acknowldge the queue the msg is received channel.ack(message);
    },{
        noAck:true //implicit acknowledge
    })
    }
            catch(err){
        console.error(err);
    }
}