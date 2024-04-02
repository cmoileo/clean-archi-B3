import { PartialType } from '@nestjs/mapped-types';
import { OrderCreateDTO } from './create-order.dto';

export class UpdateOrderDto extends PartialType(OrderCreateDTO) {}
