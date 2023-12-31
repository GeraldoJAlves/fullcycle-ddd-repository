import { EventDispatcher } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "..";
import { EnviaConsoleLog1Handler } from ".";

describe("EnviaConsoleLog1Handler", () => {
  it("notify CustomerCreatedEvent", () => {
    const eventData = {
        id: '1',
        name: 'John'
      }
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const customerCreatedEvent = new CustomerCreatedEvent(eventData);

    const spyConsoleLog = jest.spyOn(console, 'log')
    const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, 'handle')
    spyConsoleLog.mockReturnValueOnce()

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled()
    expect(spyConsoleLog).toHaveBeenCalled()
    expect(spyConsoleLog).toBeCalledWith("Esse é o primeiro console.log do evento: CustomerCreated")
  });
});
