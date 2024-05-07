import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { GetOrdersByCustomerService } from '../domain/use-case/get-orders-by-customer.service';
import { GROUP_ALL_ORDERS } from '../domain/entity/order.entity';
import { GROUP_ORDER } from '../domain/entity/order.entity';
import { OrderPresenter } from 'src/order/presentation/order.presenter';

@Controller('/orders')
@UseInterceptors(ClassSerializerInterceptor)
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly getOrderByCustomerIdService: GetOrdersByCustomerService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderService.createOrder(createOrderDto);
  }

  @Get()
  @SerializeOptions({
    groups: [GROUP_ALL_ORDERS],
  })
  async getOrders(): Promise<OrderPresenter[]> {
    const orders: Order[] = await this.getOrdersService.getOrders();
    return orders.map((order: Order) => {
      return new OrderPresenter(order);
    });
  }

  @Get('/:id')
  @SerializeOptions({
    groups: [GROUP_ORDER],
  })
  async getOrderById(@Req() customerId: string): Promise<Order[]> {
    return this.getOrderByCustomerIdService.getOrdersByCustomer(customerId);
  }
}
