import { Notification } from ".";

describe("Notification", () => {
  it("should return a message from a context", () => {
    const notification = new Notification();

    notification.addError({
      context: "Customer",
      message: "invalid name"
    })

    let error = notification.messages("Customer")

    expect(error).toBe("Customer: invalid name")

    notification.addError({
      context: "Customer",
      message: "invalid address"
    })

    notification.addError({
      context: "Product",
      message: "price must be greater than zero"
    })

    error = notification.messages("Customer")

    expect(error).toBe("Customer: invalid name, Customer: invalid address")

    error = notification.messages("Product")

    expect(error).toBe("Product: price must be greater than zero")
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      context: "Customer",
      message: "error message",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      context: "Customer",
      message: "error message",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
