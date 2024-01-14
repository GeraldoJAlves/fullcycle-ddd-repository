import { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { Address } from "@/domain/customer/value-object";
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO,
} from ".";

export default class UpdateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(
    input: InputUpdateCustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip,
      },
    };
  }
}
