import { IsNotEmpty, IsString } from 'class-validator';
import { OrderItem } from '../entity/order-item.entity';

export class AddOrderItemDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  orderItem: OrderItem;
}
