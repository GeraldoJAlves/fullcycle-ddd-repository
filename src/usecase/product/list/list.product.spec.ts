import { Sequelize } from "sequelize-typescript";
import {
  ProductModel,
  ProductRepository,
} from "@/infrastructure/product/repository/sequelize";
import { Product } from "@/domain/product/entity";
import { ListProductUseCase } from ".";

describe("ListProduct usecase integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products", async () => {
    const repository = new ProductRepository();
    const usecase = new ListProductUseCase(repository);

    const products = [
      new Product("1", "Product 1", 100),
      new Product("2", "Product 2", 40.1),
      new Product("3", "Product 3", 50.2),
    ];

    for (const product of products) {
      await repository.create(product);
    }

    const response = await usecase.execute({});

    expect(response).toEqual({
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    });
  });

  it("should return an empty list of products", async () => {
    const repository = new ProductRepository();
    const usecase = new ListProductUseCase(repository);

    const response = await usecase.execute({});

    expect(response).toEqual({
      products: []
    })
  });
});
