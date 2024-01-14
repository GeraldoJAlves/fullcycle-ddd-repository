import { CustomerRepositorySpy } from "@/usecase/test";
import { ListCustomerUseCase } from ".";

const makeSut = () => {
  const repository = new CustomerRepositorySpy();
  const sut = new ListCustomerUseCase(repository);

  return {
    sut,
    customerRepositorySpy: repository,
  };
};

describe("ListCustomer usecase", () => {
  it("should list customers", async () => {
    const { sut, customerRepositorySpy } = makeSut();
    const customers = customerRepositorySpy.customers;

    const response = await sut.execute({});

    expect(response).toStrictEqual({
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          city: customer.Address.city,
          zip: customer.Address.zip,
        },
      })),
    });
  });

  it("should throw an error when CustomerRepository throws", () => {
    const { sut, customerRepositorySpy } = makeSut();

    jest
      .spyOn(customerRepositorySpy, "findAll")
      .mockRejectedValueOnce(new Error("error to get data"));

    expect(async () => {
      await sut.execute({});
    }).rejects.toThrowError("error to get data");
  });
});
