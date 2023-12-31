import { EventDispatcher } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "..";
import { EnviaConsoleLog2Handler } from ".";

describe("EnviaConsoleLog2Handler", () => {
  it("notify CustomerCreatedEvent", () => {
    const eventData = {
        id: '1',
        name: 'John'
      }
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
    const customerCreatedEvent = new CustomerCreatedEvent(eventData);

    const spyConsoleLog = jest.spyOn(console, 'log')
    const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, 'handle')
    spyConsoleLog.mockReturnValueOnce()

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled()
    expect(spyConsoleLog).toHaveBeenCalled()
    expect(spyConsoleLog).toBeCalledWith("Esse é o segundo console.log do evento: CustomerCreated")
  });
});
