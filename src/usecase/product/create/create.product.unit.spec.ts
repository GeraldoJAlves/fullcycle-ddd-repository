import { ProductRepositorySpy } from "@/usecase/test";
import { CreateProductUseCase } from ".";

const makeSut = () => {
  const repository = new ProductRepositorySpy();
  const sut = new CreateProductUseCase(repository);

  return {
    sut,
    productRepositorySpy: repository,
  };
};

describe("CreateProduct usecase", () => {
  it("should create a product", async () => {
    const { sut, productRepositorySpy } = makeSut();

    const productModel = productRepositorySpy.productModel;

    const input = {
      name: productModel.name,
      price: productModel.price,
    };

    const response = await sut.execute(input);

    const inputProduct = productRepositorySpy.createInput;

    expect(inputProduct.name).toBe(input.name);
    expect(inputProduct.price).toBe(input.price);

    expect(response).toStrictEqual({
      id: inputProduct.id,
      name: productModel.name,
      price: productModel.price,
    });
  });

  it("should throw if ProductRepository throws", async () => {
    const { sut, productRepositorySpy } = makeSut();

    jest
      .spyOn(productRepositorySpy, "create")
      .mockRejectedValueOnce(new Error("error to create"));

    const productModel = productRepositorySpy.productModel;

    const input = {
      name: productModel.name,
      price: productModel.price,
    };

    expect(async () => {
      await sut.execute(input);
    }).rejects.toThrowError("error to create");
  });
});
