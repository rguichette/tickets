import {Subjects, Publisher, PaymentCreatedEvent} from '@rgviz/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}