import { Sequelize } from "sequelize-typescript";
import {
  ProductModel,
  ProductRepository,
} from "@/infrastructure/product/repository/sequelize";
import { Product } from "@/domain/product/entity";
import { UpdateProductUseCase } from ".";

jest.mock('uuid');

describe("UpdateProduct usecase integration", () => {
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

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);


    const product = new Product("1", "Product 1", 100);
    await repository.create(product);

    const input = {
      id: "1",
      name: "ball",
      price: 3.44,
    };

    await usecase.execute(input);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "ball",
      price: 3.44,
    });
  });

  it("should throw if product does not exist", async () => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);

    const input = {
      id: "1111",
      name: "teste",
      price: 1.18
    };

    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow();
  });
});
