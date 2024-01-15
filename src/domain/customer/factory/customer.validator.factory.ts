import { CustomerYupValidator } from "@/infrastructure/customer/validator";
import ValidatorInterface from "@/domain/@shared/validator/validator.interface";
import { Customer } from "../entity";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}