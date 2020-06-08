import {TicketCreatedListener} from '../ticket-created-listener'
import {natsWrapper} from '../../../nats-wrapper'
import {TicketCreatedEvent} from "@rgviz/common"
import mongoose from "mongoose"
import {Message} from 'node-nats-streaming'

import {Ticket} from "../../../models/ticket"
const setup =  async () => {
//create an instance of the listener
const listener = new TicketCreatedListener(natsWrapper.client)
//create a fake data event 
const data: TicketCreatedEvent['data'] = {
    version: 0, //version
    id: new mongoose.Types.ObjectId().toHexString(),
    title:"test",
    price: 23,
    userId: new mongoose.Types.ObjectId().toHexString()
}

//create a fake message obj   
//@ts-ignore
const msg :Message ={
ack: jest.fn()
}

return {listener, data, msg}
}

it("creates and saves a ticket", async()=>{
const {listener, data, msg} = await setup()


//call the onMessage func with the data object + message object
await listener.onMessage(data, msg)
//write assertions to make sure a ticket was created
const ticket = await Ticket.findById(data.id);
expect(ticket).toBeDefined()
expect(ticket!.title).toEqual(data.title);
expect(ticket!.price).toEqual(data.price)
})

it("ack the message", async ()=>{
    const {data, listener, msg} = await setup()

//call the onMessage function with the data obj + message obj 
await listener.onMessage(data, msg)
//write assertions to make sure ack function is called 
expect(msg.ack).toHaveBeenCalled()
})