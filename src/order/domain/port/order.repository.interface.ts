import { Order } from '../entity/order.entity';
import { OrderItem } from '../entity/order-item.entity';

export interface OrderRepositoryInterface {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  addOrderItem(orderItem: OrderItem): Promise<Order>;
  findAll(): Promise<Order[]>;
  findByCustomerName(customerName: string): Promise<Order[]>;
  deleteOrder(id: string): Promise<void>;
}
