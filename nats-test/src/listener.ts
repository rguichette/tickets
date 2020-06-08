import nats from "node-nats-streaming";
import {TicketCreatedListener} from './events/ticket-created-listener'
import {randomBytes} from "crypto";
console.clear()


const stan = nats.connect("ticketing",randomBytes(4).toString('hex'), {
    url:"http://localhost:4222"
})

stan.on("connect", ()=>{
    console.log("listenner connected to Nats");
  /*  
    // const options = stan.subscriptionOptions().setManualAckMode(true)
    // .setDeliverAllAvailable().setDurableName('some_service_name')

    // const subscription = stan.subscribe("ticket:created", 
    // "orders-service-queue-group", 
    // options)
//     subscription.on("message", (msg:Message)=>{
//     const data = msg.getData();

//     if(typeof data === "string"){
// console.log(`Received event # ${msg.getSequence()}, with data ${data}`);

//     }

//     msg.ack()

//     }) */

new TicketCreatedListener(stan).listen();

})





