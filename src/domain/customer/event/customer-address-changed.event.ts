import { EventInterface } from "@/domain/@shared/event";

type CustomerAddressChangedType = {
  id: string
  name: string
  address: string
}


export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedType;

  constructor(eventData: CustomerAddressChangedType) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
