import { ProductRepositorySpy } from "@/usecase/test";
import { UpdateProductUseCase } from ".";

const makeSut = () => {
  const repository = new ProductRepositorySpy();
  const sut = new UpdateProductUseCase(repository);

  return {
    sut,
    productRepositorySpy: repository,
  };
};

describe("UpdateProduct usecase", () => {
  it("should update a product", async () => {
    const { sut, productRepositorySpy } = makeSut();
    const productModel = productRepositorySpy.productModel;

    const input = {
      id: productModel.id,
      name: "green ball",
      price: 9.99,
    };

    const response = await sut.execute(input);

    const updateInput = productRepositorySpy.updateInput;

    expect(updateInput.name).toBe(productModel.name);
    expect(updateInput.price).toBe(productModel.price);
    expect(response).toStrictEqual({
      id: productModel.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should throw if ProductRepository throws", async () => {
    const { sut, productRepositorySpy } = makeSut();

    jest
      .spyOn(productRepositorySpy, "find")
      .mockRejectedValueOnce(new Error("not found"));

    const input = {
      id: "1234",
      name: "green ball",
      price: 9.99,
    };

    expect(async () => {
      await sut.execute(input);
    }).rejects.toThrowError("not found");
  });
});
