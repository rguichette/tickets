import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from "./events/ticket-created-publisher"

console.clear()
const stan = nats.connect("ticketing", "abd",{
    url:"http://localhost:4222"
});



stan.on("connect", async ()=>{
    console.log('publisher connected to NATS');
    
stan.on("close", ()=>{
    console.log("NATS connection closed");
    process.exit()
    
})

const publisher = new TicketCreatedPublisher(stan);
try {
    await publisher.publish({
id:"123", title:"title", price:20
})
} catch (error) {
   console.log(error);
    
}

//     const data =JSON.stringify( {
// id:"123", 
// title:"concert", 
// price: 123
//     })
// stan.publish("ticket:created", data, ()=>{
// console.log("event published");

// })

    
})



process.on('SIGNINT', ()=>{
    return stan.close()
})

process.on('SIGTERM', ()=>{
    return stan.close()
})
