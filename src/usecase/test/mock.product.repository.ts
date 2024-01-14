import { Product } from "@/domain/product/entity";
import { ProductFactory } from "@/domain/product/factory";
import { ProductRepositoryInterface } from "@/domain/product/repository";

const productModelBall = ProductFactory.create("a", "ball", 2.99)

export class ProductRepositorySpy implements ProductRepositoryInterface {
  createInput: Product
  productModel = productModelBall

  async create(entity: Product): Promise<void> {
    this.createInput = entity
  }
  update(entity: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
}