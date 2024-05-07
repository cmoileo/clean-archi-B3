import { Order } from '../domain/entity/order.entity';

export class OrderCreatedListener {
  constructor(private readonly order: Order) {
    this.init();
  }
  init() {
    console.log(this.order);
  }
}
