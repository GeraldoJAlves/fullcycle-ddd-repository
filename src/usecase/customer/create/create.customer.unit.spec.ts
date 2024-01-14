import { CustomerRepositorySpy } from "@/usecase/test";
import { CreateCustomerUseCase } from ".";

const makeSut = () => {
  const repository = new CustomerRepositorySpy();
  const sut = new CreateCustomerUseCase(repository);

  return {
    sut,
    customerRepositorySpy: repository,
  };
};

describe("CreateCustomer usecase", () => {
  it("should create a customer", async () => {
    const { sut, customerRepositorySpy } = makeSut();

    const customerModel = customerRepositorySpy.customerModel;

    const input = {
      name: customerModel.name,
      address: {
        street: customerModel.Address.street,
        number: customerModel.Address.number,
        city: customerModel.Address.city,
        zip: customerModel.Address.zip,
      },
    };

    const response = await sut.execute(input);

    const createInput = customerRepositorySpy.createInput;

    expect(createInput.name).toBe(customerModel.name);
    expect(createInput.Address).toEqual(customerModel.Address);
    expect(response).toStrictEqual({
      id: createInput.id,
      name: customerModel.name,
      address: {
        street: customerModel.Address.street,
        number: customerModel.Address.number,
        city: customerModel.Address.city,
        zip: customerModel.Address.zip,
      },
    });
  });
});
