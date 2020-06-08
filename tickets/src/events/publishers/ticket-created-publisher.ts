import { Publisher, Subjects, TicketCreatedEvent } from '@rgviz/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
