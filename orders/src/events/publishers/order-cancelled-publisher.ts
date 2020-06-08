import { Subjects, Publisher, OrderCancelledEvent } from '@rgviz/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
