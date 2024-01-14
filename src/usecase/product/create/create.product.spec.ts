import { Sequelize } from "sequelize-typescript";
import * as uuid from "uuid";
import {
  ProductModel,
  ProductRepository,
} from "@/infrastructure/product/repository/sequelize";
import { CreateProductUseCase } from ".";

jest.mock('uuid');

describe("CreateProduct usecase integration", () => {
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

  it("should create a product", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

    jest.spyOn(uuid, "v4").mockImplementationOnce(() => "1");

    const input = {
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
});
