import { ProductRepositoryInterface } from "@/domain/product/repository";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from ".";

export default class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);
    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
