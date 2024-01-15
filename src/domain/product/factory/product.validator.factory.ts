
import ValidatorInterface from "@/domain/@shared/validator/validator.interface";
import { ProductYupValidator } from "@/infrastructure/product/validator";
import { Product } from "../entity";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}