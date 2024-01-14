import { Product } from "@/domain/product/entity";
import { ProductFactory } from "@/domain/product/factory";
import { ProductRepositoryInterface } from "@/domain/product/repository";

const productModelBall = ProductFactory.create("a", "ball", 2.99) as Product;

export class ProductRepositorySpy implements ProductRepositoryInterface {
  findInput: string;
  createInput: Product;
  productModel = productModelBall;

  async create(entity: Product): Promise<void> {
    this.createInput = entity;
  }

  update(entity: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }

  find(id: string): Promise<Product> {
    this.findInput = id;
    return Promise.resolve(this.productModel);
  }

  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
}
