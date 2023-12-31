import { OrderItem } from ".";
export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  addItem(orderItem: OrderItem): void {
    if (orderItem.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    this._items.push(orderItem)
  }

  removeItem(orderItem: OrderItem): void {
    if (this._items.length === 1) {
      throw new Error("Must have at least one order item");
    }

    this._items = this.items.filter((item) => item.id !== orderItem.id)
  }

  changeCustomer(customerId: string) {
    if (customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    this._customerId = customerId
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
