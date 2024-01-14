import { Product } from "@/domain/product/entity";
import { ProductFactory } from "@/domain/product/factory";
import { ProductRepositoryInterface } from "@/domain/product/repository";

const productModelBall = ProductFactory.create("a", "ball", 2.99) as Product;
const productModelWallet = ProductFactory.create(
  "a",
  "wallet",
  14.39
) as Product;
const productModelDoll = ProductFactory.create("a", "doll", 19.79) as Product;

export class ProductRepositorySpy implements ProductRepositoryInterface {
  findInput: string;
  createInput: Product;
  updateInput: Product;
  productModel = productModelBall;
  products = [productModelBall, productModelWallet, productModelDoll];

  async create(entity: Product): Promise<void> {
    this.createInput = entity;
  }

  async update(entity: Product): Promise<void> {
    this.updateInput = entity;
  }

  find(id: string): Promise<Product> {
    this.findInput = id;
    return Promise.resolve(this.productModel);
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}
