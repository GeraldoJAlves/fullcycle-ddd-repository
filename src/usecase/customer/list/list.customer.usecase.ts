import { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { Customer } from "@/domain/customer/entity";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from ".";

export default class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(_: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDTO {
    return {
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
    };
  }
}
