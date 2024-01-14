import express, { Request, Response } from "express";
import { CustomerRepository } from "@/infrastructure/customer/repository/sequelize";
import { CreateCustomerUseCase } from "@/usecase/customer/create";
import { ListCustomerUseCase } from "@/usecase/customer/list";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});
    res.send(output);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
