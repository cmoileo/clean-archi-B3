import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { AddOrderItemDto } from '../dto/add-order-item.dto';

export class AddOrderItemService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}
  async addOrderItem(addOrderItemDto: AddOrderItemDto): Promise<string> {
    const order = await this.orderRepository.findById(addOrderItemDto.orderId);
    order.addOrderItem(addOrderItemDto.orderItem);
    return addOrderItemDto.orderId;
  }
}
