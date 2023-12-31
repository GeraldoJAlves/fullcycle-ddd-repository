import { Order, OrderItem } from "@/domain/checkout/entity";
import { OrderRepositoryInterface } from "@/domain/checkout/repository";
import { OrderItemModel, OrderModel } from ".";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item: OrderItem) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total(), customer_id: entity.customerId },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order> {
    let order;
    try {
      order = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items: OrderItem[] = order.items.map((orderItem) => {
      return new OrderItem(
        orderItem.id,
        orderItem.name,
        orderItem.price,
        orderItem.product_id,
        orderItem.quantity
      );
    });

    return new Order(order.id, order.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    if (orders.length == 0) {
      return [];
    }

    return orders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((orderItem) => {
          return new OrderItem(
            orderItem.id,
            orderItem.name,
            orderItem.price,
            orderItem.product_id,
            orderItem.quantity
          );
        })
      );
    });
  }
}
