import { Router } from "express";
import { ProductRepository } from "@/infrastructure/product/repository/sequelize";
import { ListProductUseCase } from "@/usecase/product/list";
import { UpdateProductUseCase } from "@/usecase/product/update";
import { CreateProductUseCase } from "@/usecase/product/create";
import { FindProductUseCase } from "@/usecase/product/find";

export const productRoute = Router();

productRoute.get("/", async (_, res) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());
    const products = await usecase.execute({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const usecase = new FindProductUseCase(new ProductRepository());
    const products = await usecase.execute({
      id: req.params.id,
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

productRoute.post("/", async (req, res) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const productDTO = {
      name: req.body.name,
      price: req.body.price,
    };
    const product = await usecase.execute(productDTO);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

productRoute.put("/:id", async (req, res) => {
  try {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    const productDTO = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };
    const product = await usecase.execute(productDTO);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
