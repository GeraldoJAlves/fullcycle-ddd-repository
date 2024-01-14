import { ProductRepositoryInterface } from "@/domain/product/repository";
import { InputListProductDTO, OutputListProductDTO } from ".";
import { Product } from "@/domain/product/entity";

export default class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(_: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(proudcts: Product[]): OutputListProductDTO {
    return {
      products: proudcts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
