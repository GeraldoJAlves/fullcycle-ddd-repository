import { ProductRepositoryInterface } from "@/domain/product/repository";
import { InputFindProductDTO } from ".";
import { OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
