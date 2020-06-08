import {Listener, OrderCreatedEvent, Subjects} from '@rgviz/common'
import {queueGroupName} from './queue-group-name'
import {Message} from 'node-nats-streaming'
import {experationQueue} from '../../queues/experation-queue'

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
subject:Subjects.OrderCreated = Subjects.OrderCreated;
queueGroupName = queueGroupName;

async onMessage(data:OrderCreatedEvent['data'], msg: Message){
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many mill to process the job', delay);
    
await experationQueue.add({
    orderId: data.id
},
 {
    delay
}

);

msg.ack()
}
}