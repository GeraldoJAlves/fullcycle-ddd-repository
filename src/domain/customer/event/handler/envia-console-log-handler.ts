import { EventHandlerInterface } from "@/domain/@shared/event";
import { CustomerAddressChangedEvent } from "..";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
  }
}
