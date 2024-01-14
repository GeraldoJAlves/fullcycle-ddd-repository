import { CustomerRepositorySpy } from "@/usecase/test";
import { FindCustomerUseCase } from ".";

const makeSut = () => {
  const repository = new CustomerRepositorySpy();
  return {
    sut: new FindCustomerUseCase(repository),
    customerRepositorySpy: repository,
  };
};

describe("FindCustomer usecase", () => {
  it("should find a customer", async () => {
    const { sut, customerRepositorySpy } = makeSut();

    const response = await sut.execute({ id: "123" });

    const { findInputId, customerModel } = customerRepositorySpy;

    expect(findInputId).toBe("123");
    expect(response).toStrictEqual({
      id: customerModel.id,
      name: customerModel.name,
      address: {
        street: customerModel.Address.street,
        number: customerModel.Address.number,
        city: customerModel.Address.city,
        zip: customerModel.Address.zip,
      },
    });
  });

  it("should throw an error when CustomerRepository throws", () => {
    const { sut, customerRepositorySpy } = makeSut();

    jest
      .spyOn(customerRepositorySpy, "find")
      .mockRejectedValueOnce(new Error("customer not found"));

    expect(async () => {
      await sut.execute({ id: "123" });
    }).rejects.toThrowError("customer not found");
  });
});
