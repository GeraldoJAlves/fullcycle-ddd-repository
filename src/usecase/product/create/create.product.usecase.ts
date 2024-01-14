import { ProductRepositoryInterface } from "@/domain/product/repository";
import { ProductFactory } from "@/domain/product/factory";
import { Product } from "@/domain/product/entity";
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from ".";

export default class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(
      "a",
      input.name,
      input.price
    ) as Product;
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
