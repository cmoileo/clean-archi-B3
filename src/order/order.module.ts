import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { CreateOrderService } from './domain/use-case/create-order.service';
import { OrderRepositoryInterface } from './domain/port/order.repository.interface';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { GetOrdersService } from './domain/use-case/get-orders.service';
import { AddOrderItemService } from './domain/use-case/add-order-item.service';
import { OrderCreatedListener } from './infrastructure/order-created-listener.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    OrderCreatedListener,
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: AddOrderItemService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new AddOrderItemService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export class OrderModule {}
