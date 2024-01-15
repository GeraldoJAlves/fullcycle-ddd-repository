import { Product, ProductB } from ".";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("Product: Id is required");

    expect(() => {
      new ProductB("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("Product: Name is required");

    expect(() => {
      new ProductB("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError("Product: Price must be greater or equal than zero");

    expect(() => {
      new ProductB("123", "Name", -1);
    }).toThrowError("Price must be greater or equal than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");

    const productB = new ProductB("123", "Product 1", 100);
    productB.changeName("Product 2");
    expect(productB.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);

    const productB = new ProductB("123", "Product 1", 100);
    productB.changePrice(150);
    expect(productB.price).toBe(300);
  });

  it("should throw NotificationError when invalid information is provided", () => {
      expect(() => {
        new Product("", "", -1);
      }).toThrowError("Product: Id is required, Product: Name is required, Product: Price must be greater or equal than zero");
  })
});
