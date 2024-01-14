import { ProductRepositorySpy } from "@/usecase/test";
import { FindProductUseCase } from ".";

const makeSut = () => {
  const repository = new ProductRepositorySpy();
  const sut = new FindProductUseCase(repository);

  return {
    sut,
    productRepositorySpy: repository,
  };
};

describe("FindProduct usecase", () => {
  it("should find a product", async () => {
    const { sut, productRepositorySpy } = makeSut();
    const productModel = productRepositorySpy.productModel;

    const response = await sut.execute({ id: productModel.id });

    const findInput = productRepositorySpy.findInput;

    expect(findInput).toBe(productModel.id);
    expect(response).toStrictEqual({
      id: findInput,
      name: productModel.name,
      price: productModel.price,
    });
  });

  it("should throw if ProductRepository throws", async () => {
    const { sut, productRepositorySpy } = makeSut();

    jest
      .spyOn(productRepositorySpy, "find")
      .mockRejectedValueOnce(new Error("not found"));

    expect(async () => {
      await sut.execute({id: "123"});
    }).rejects.toThrowError("not found");
  });
});
