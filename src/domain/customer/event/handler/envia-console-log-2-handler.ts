import { EventHandlerInterface } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "..";

export default class EnviaConsoleLog2Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
