import { Address } from ".";

describe("Address value object", () => {
  it("should create address if valid data is provided", () => {
    const address = new Address("street 1", 1, "zip 1", "city 1");

    expect(address.street).toBe("street 1");
    expect(address.number).toBe(1);
    expect(address.zip).toBe("zip 1");
    expect(address.city).toBe("city 1");
    expect(address.toString()).toBe("street 1, 1, zip 1 city 1")
  });

  it("should throw if street is not provided", () => {
    expect(() => {
      new Address("", 1, "zip 1", "city 1");
    }).toThrow("Street is required");
  });

  it("should throw if number is invalid", () => {
    expect(() => {
      new Address("street", 0, "zip 1", "city 1");
    }).toThrow("Number is required");
  });

  it("should throw if number is invalid", () => {
    expect(() => {
      new Address("street", 1, "", "city 1");
    }).toThrow("Zip is required");
  });

  it("should throw if number is invalid", () => {
    expect(() => {
      new Address("street", 1, "zip 1", "");
    }).toThrow("City is required");
  });
});
