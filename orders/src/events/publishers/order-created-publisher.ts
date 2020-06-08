import { Publisher, OrderCreatedEvent, Subjects } from '@rgviz/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
