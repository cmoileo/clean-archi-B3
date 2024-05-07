import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { GetOrdersByCustomerService } from '../domain/use-case/get-orders-by-customer.service';

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
  async getOrders(): Promise<Order[]> {
    return this.getOrdersService.getOrders();
  }

  @Get('/:id')
  async getOrderById(@Req() customerId: string): Promise<Order[]> {
    return this.getOrderByCustomerIdService.getOrdersByCustomer(customerId);
  }
}
