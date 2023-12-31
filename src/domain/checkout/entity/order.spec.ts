import { Order, OrderItem } from ".";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should add an order item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    order.addItem(item2)

    expect(order.items).toEqual([item, item2]);
  });

  it("should throw an error if you try to add an item with qte less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const order = new Order("o1", "c1", [item]);
      const item2 = new OrderItem("i2", "Item 2", 100, "p2", 0);
      order.addItem(item2)
    }).toThrowError("Quantity must be greater than 0");

    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const order = new Order("o1", "c1", [item]);
      const item2 = new OrderItem("i2", "Item 2", 100, "p2", -1);
      order.addItem(item2)
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should remove an order item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);

    order.removeItem(item2)

    expect(order.items).toEqual([item]);
  });

  it("should throw error if you delete all items", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const item2 = new OrderItem("i2", "Item 2", 100, "p2", 1);
      const order = new Order("o1", "c1", [item, item2]);
      order.removeItem(item)
      order.removeItem(item2)
    }).toThrowError("Must have at least one order item");
  });
});
