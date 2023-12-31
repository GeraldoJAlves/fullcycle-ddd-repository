import { EventHandlerInterface } from "@/domain/@shared/event";
import { ProductCreatedEvent } from "@/domain/product/event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`);
  }
}
