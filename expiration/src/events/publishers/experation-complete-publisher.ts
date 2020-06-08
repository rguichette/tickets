import {Subjects, Publisher, ExperationCompleteEvent} from '@rgviz/common'
import {Message} from 'node-nats-streaming'
export class ExpirationCompletePublisher extends Publisher<ExperationCompleteEvent>{

    subject: Subjects.ExperationComplete = Subjects.ExperationComplete
}