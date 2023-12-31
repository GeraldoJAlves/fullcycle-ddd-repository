import { EventDispatcher } from "@/domain/@shared/event";
import { CustomerAddressChangedEvent } from "..";
import { EnviaConsoleLogHandler } from ".";

describe("EnviaConsoleLogHandler", () => {
  it("notify CustomerAddressChanged", () => {
    const eventData = {
        id: '1',
        name: 'John',
        address: 'street 1, 1, 99999-999 city 1',
      }
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
    const customerAddressChanged = new CustomerAddressChangedEvent(eventData);

    const spyConsoleLog = jest.spyOn(console, 'log')
    const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, 'handle')
    spyConsoleLog.mockReturnValueOnce()

    eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLogHandler);

    eventDispatcher.notify(customerAddressChanged)

    expect(spyEnviaConsoleLogHandler).toHaveBeenCalled()
    expect(spyConsoleLog).toHaveBeenCalled()
    expect(spyConsoleLog).toBeCalledWith(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`)
  });
});
