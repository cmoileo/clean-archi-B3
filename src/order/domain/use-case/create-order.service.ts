import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedListener } from '../../infrastructure/order-created-listener.service';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems = createOrderDto.orderItems.map(
      (orderItem) =>
        new OrderItem(
          orderItem.productName,
          orderItem.quantity,
          orderItem.price,
        ),
    );

    const order = new Order(createOrderDto.customerName, orderItems);

    this.eventEmitter.emit('order.created', () => {
      new OrderCreatedListener(order);
    });

    return await this.orderRepository.save(order);
  }
}
