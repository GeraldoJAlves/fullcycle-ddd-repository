import { Sequelize } from "sequelize-typescript";
import { Order, OrderItem } from "@/domain/checkout/entity";
import { Customer } from "@/domain/customer/entity";
import { Address } from "@/domain/customer/value-object";
import {
  CustomerModel,
  CustomerRepository,
} from "@/infrastructure/customer/repository/sequelize";
import {
  ProductModel,
  ProductRepository,
} from "@/infrastructure/product/repository/sequelize";
import { Product } from "@/domain/product/entity";
import { OrderItemModel, OrderModel, OrderRepository } from ".";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("create()", () => {
    it("should create a new order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("123", "123", [orderItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            order_id: "123",
            product_id: "123",
          },
        ],
      });
    });
  });

  describe("find()", () => {
    const orderRepository = new OrderRepository();
    let orderItem: OrderItem;
    let order: Order;
    let product: Product;

    beforeEach(async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      order = new Order("123", "123", [orderItem]);

      await orderRepository.create(order);
    });

    it("should return an order if order data exists", async () => {
      const currentOrder = await orderRepository.find(order.id);

      expect(currentOrder.id).toBe(order.id);
      expect(currentOrder.items).toStrictEqual(order.items);
      expect(currentOrder.total()).toBe(order.total());
    });

    it("should throw if order data does not exists", async () => {
      expect(async () => {
        await orderRepository.find("1234")
      }).rejects.toThrow("Order not found");
    });
  });

  describe("findAll()", () => {
    const orderRepository = new OrderRepository();
    let orderItem: OrderItem;
    let order: Order;
    let product: Product;

    beforeEach(async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      let x = 0;
      while (x < 4) {
        orderItem = new OrderItem(
          "p-" + x.toString(),
          product.name,
          product.price,
          product.id,
          2
        );

        order = new Order("o-" + x.toString(), "123", [orderItem]);

        await orderRepository.create(order);
        x++;
      }
    });

    it("should return all orders", async () => {
      const orders = await orderRepository.findAll();
      expect(orders.length).toBe(4);
    });

    it("should return an empty list when there is no orders", async () => {
      await OrderModel.destroy({ truncate: true });
      const orders = await orderRepository.findAll();
      expect(orders.length).toBe(0);
    });
  });

  describe("update()", () => {
    const orderRepository = new OrderRepository();
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();

    let orderItem: OrderItem;
    let order: Order;
    let product: Product;

    beforeEach(async () => {
      let customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      order = new Order("123", "123", [orderItem]);

      await orderRepository.create(order);
    });

    // it("should update order if already exists", async () => {
    //   const orders = await orderRepository.findAll();
    //   expect(orders.length).toBe(4);
    // });

    it("should update order if already exists", async () => {
      const product2 = new Product("1234", "Product 2", 10);
      productRepository.create(product2);

      const customer2 = new Customer("234", "Customer 2");
      const address = new Address("Street 2", 1, "Zipcode 2", "City 2");
      customer2.changeAddress(address);
      customerRepository.create(customer2);

      const orderItem2 = new OrderItem(
        "2",
        product2.name,
        product2.price,
        product2.id,
        2
      );

      order.addItem(orderItem2);
      order.changeCustomer(customer2.id);

      await orderRepository.update(order);

      const orderModel = await OrderModel.findOne({
          where: { id: order.id },
          include: [{ model: OrderItemModel }],
        });

      expect(orderModel.toJSON()).toStrictEqual({
        id: order.id,
        customer_id: customer2.id,
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            order_id: order.id,
            product_id: product.id,
          },
          {
            id: orderItem2.id,
            name: orderItem2.name,
            price: orderItem2.price,
            quantity: orderItem2.quantity,
            order_id: order.id,
            product_id: product2.id,
          },
        ],
      });
    });
  });
});
