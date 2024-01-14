import { Customer } from "@/domain/customer/entity";
import { CustomerFactory } from "@/domain/customer/factory";
import { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { Address } from "@/domain/customer/value-object";

const customerModel = CustomerFactory.createWithAddress(
  "john",
  new Address("street", 1, "zip", "city")
);

export class CustomerRepositorySpy implements CustomerRepositoryInterface {
  findInputId: string;
  createInput: Customer;
  updateInput: Customer;
  customerModel = customerModel;

  async create(entity: Customer): Promise<void> {
    this.createInput = entity;
  }

  async update(entity: Customer): Promise<void> {
    this.updateInput = entity;
  }

  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }

  find(id: string): Promise<Customer> {
    this.findInputId = id;
    return Promise.resolve(this.customerModel);
  }
}
