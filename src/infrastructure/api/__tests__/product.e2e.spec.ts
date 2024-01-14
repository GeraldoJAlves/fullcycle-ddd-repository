import { app, sequelize } from "../express";
import request from "supertest";

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /product", () => {
    it("should create a product", async () => {
      const response = await request(app).post("/product").send({
        name: "ball",
        price: 2.44,
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe("ball");
      expect(response.body.price).toBe(2.44);
    });

    it("should not create a product", async () => {
      const response = await request(app).post("/product").send({
        price: 1.99,
      });
      expect(response.status).toBe(500);
    });
  });

  describe("PUT /product/:id", () => {
    it("should update a product", async () => {
      const response = await request(app).post("/product").send({
        name: "ball",
        price: 2.44,
      });

      expect(response.status).toBe(201);

      const productResponse = await request(app).put(`/product/${response.body.id}`).send({
        name: "wallet",
        price: 6.22,
      });

      expect(productResponse.status).toBe(200);
      expect(productResponse.body).toEqual({
        id: response.body.id,
        name: "wallet",
        price: 6.22,
      });
    });

    it("should not udpate a product", async () => {
      const response = await request(app).post("/product").send({
        name: "ball",
        price: 2.44,
      });

      expect(response.status).toBe(201);

      const productResponse = await request(app).put(`/product/${response.body.id}`).send({
        price: 1.99,
      });
      expect(productResponse.status).toBe(500);
    });
  });

  describe("GET /product/:id", () => {
    it("should find a product", async () => {
      const response = await request(app).post("/product").send({
        name: "ball",
        price: 2.44,
      });

      expect(response.status).toBe(201);

      const productResponse = await request(app)
        .get(`/product/${response.body.id}`)
        .send({
          name: "ball",
          price: 2.44,
        });

      expect(productResponse.body).toEqual({
        id: response.body.id,
        name: response.body.name,
        price: response.body.price,
      });
    });
  });

  describe("GET /product", () => {
    it("should list all products", async () => {
      const response = await request(app).post("/product").send({
        name: "ball",
        price: 1.88,
      });
      expect(response.status).toBe(201);
      const response2 = await request(app).post("/product").send({
        name: "wallet",
        price: 1.89,
      });
      expect(response2.status).toBe(201);

      const listResponse = await request(app).get("/product").send();

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.products.length).toBe(2);
      const customer = listResponse.body.products[0];
      expect(customer.name).toBe("ball");
      expect(customer.price).toBe(1.88);
      const customer2 = listResponse.body.products[1];
      expect(customer2.name).toBe("wallet");
      expect(customer2.price).toBe(1.89);
    });
  });
});
