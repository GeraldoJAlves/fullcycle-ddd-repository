import { Sequelize } from "sequelize-typescript";
import {
  ProductModel,
  ProductRepository,
} from "@/infrastructure/product/repository/sequelize";
import { Product } from "@/domain/product/entity";
import { FindProductUseCase } from ".";

describe("FindProduct usecase integration", () => {
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

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const usecase = new FindProductUseCase(repository);

    const product = new Product("1", "Product 1", 100);
    await repository.create(product);
    const input = {
      id: product.id,
    };

    const response = await usecase.execute(input);

    expect(response).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throw if product does not exist", async () => {
    const repository = new ProductRepository();
    const usecase = new FindProductUseCase(repository);

    const input = {
      id: "1111",
    };

    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow();
  });
});
