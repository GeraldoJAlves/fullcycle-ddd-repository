import { ProductRepositorySpy } from "@/usecase/test";
import ListProductUseCase from "./list.product.usecase";

const makeSut = () => {
  const repository = new ProductRepositorySpy();
  const sut = new ListProductUseCase(repository);

  return {
    sut,
    productRepositorySpy: repository,
  };
};

describe("ListProduct usecase", () => {
  it("should list all products", async () => {
    const { sut, productRepositorySpy } = makeSut();
    const products = productRepositorySpy.products;

    const response = await sut.execute({});

    expect(response).toStrictEqual({
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    });
  });

  it("should throw if ProductRepository throws", async () => {
    const { sut, productRepositorySpy } = makeSut();

    jest
      .spyOn(productRepositorySpy, "findAll")
      .mockRejectedValueOnce(new Error("error to retrieve data"));

    expect(async () => {
      await sut.execute({});
    }).rejects.toThrowError("error to retrieve data");
  });
});
