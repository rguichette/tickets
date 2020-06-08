import { Publisher, Subjects, TicketUpdatedEvent } from '@rgviz/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
