import { Customer } from "@/domain/customer/entity";
import { CustomerFactory } from "@/domain/customer/factory";
import { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { Address } from "@/domain/customer/value-object";

const customerModelJohn = CustomerFactory.createWithAddress(
  "john",
  new Address("street", 1, "zip", "city")
);
const customerModelAnn = CustomerFactory.createWithAddress(
  "Ann",
  new Address("street 2", 2, "zip 2", "city 2")
);
const customerModelMary = CustomerFactory.createWithAddress(
  "Mary",
  new Address("street 3", 3, "zip 3", "city 3")
);

export class CustomerRepositorySpy implements CustomerRepositoryInterface {
  findInputId: string;
  createInput: Customer;
  updateInput: Customer;
  customerModel = customerModelJohn;
  customers = [
    customerModelJohn,
    customerModelAnn,
    customerModelMary
  ]

  async create(entity: Customer): Promise<void> {
    this.createInput = entity;
  }

  async update(entity: Customer): Promise<void> {
    this.updateInput = entity;
  }

  findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers)
  }

  find(id: string): Promise<Customer> {
    this.findInputId = id;
    return Promise.resolve(this.customerModel);
  }
}
