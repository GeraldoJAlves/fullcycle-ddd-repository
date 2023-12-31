import { EventInterface } from "@/domain/@shared/event";

type CustomerCreatedType = {
  id: string,
  name: string
}

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: CustomerCreatedType) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
