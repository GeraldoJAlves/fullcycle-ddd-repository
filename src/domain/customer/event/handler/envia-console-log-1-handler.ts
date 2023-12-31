import { EventHandlerInterface } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "..";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}