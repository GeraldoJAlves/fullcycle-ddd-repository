import { CustomerRepositorySpy } from "@/usecase/test";
import { UpdateCustomerUseCase } from ".";
import { Address } from "@/domain/customer/value-object";

const makeSut = () => {
  const repository = new CustomerRepositorySpy();
  return {
    sut: new UpdateCustomerUseCase(repository),
    customerRepositorySpy: repository,
  };
};

describe("UpdateCustomer usecase", () => {
  it("should update a customer", async () => {
    const { sut, customerRepositorySpy } = makeSut();

    const customerModel = customerRepositorySpy.customerModel;
    const input = {
      id: customerModel.id,
      name: "john silva",
      address: {
        street: "street 2",
        number: 1234,
        city: "city b",
        zip: "zip b",
      },
    };

    const response = await sut.execute(input);

    const updateInput = customerRepositorySpy.updateInput;

    expect(updateInput.id).toBe(customerModel.id);
    expect(updateInput.name).toBe("john silva");
    expect(updateInput.Address).toEqual(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    expect(response).toStrictEqual({
      id: customerModel.id,
      name: "john silva",
      address: {
        street: "street 2",
        number: 1234,
        city: "city b",
        zip: "zip b",
      },
    });
  });

  it("should throw an error when CustomerRepository throws", () => {
    const { sut, customerRepositorySpy } = makeSut();

    jest
      .spyOn(customerRepositorySpy, "update")
      .mockRejectedValueOnce(new Error("error to update"));

    const customerModel = customerRepositorySpy.customerModel;
    const input = {
      id: customerModel.id,
      name: "john silva",
      address: {
        street: "street 2",
        number: 1234,
        city: "city b",
        zip: "zip b",
      },
    };
    expect(async () => {
      await sut.execute(input);
    }).rejects.toThrowError("error to update");
  });
});
