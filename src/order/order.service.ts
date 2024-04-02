import { Injectable } from '@nestjs/common';
import { OrderCreateDTO } from './domain/dto/create-order.dto';
import { UpdateOrderDto } from './domain/dto/update-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { Order} from "./domain/entity/order.entity";
import {Repository} from "typeorm";
import {SetOrderShippingMethodService} from "./domain/use-case/set-order-shipping-method.service";
import OrderRepository from "./infrastructure/order.repository";

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(Order)
      private orderRepository: OrderRepository,
  ) {}
  async create(createOrderDto: OrderCreateDTO) {
    const existingOrder = await this.orderRepository.findOneBy({
      customerName: createOrderDto.customerName
    });
    return existingOrder ? this.update(existingOrder.id, createOrderDto) : this.orderRepository.save(createOrderDto);
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders ? orders : new Error('No order found');
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({id});
    return order ? order : new Error('Order not found');
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({id});
    return this.orderRepository.save(Object.assign(order, updateOrderDto));
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({id});
    return this.orderRepository.remove(order);
  }

  async removeItem(id: string, itemId: string) {
    const order = await this.orderRepository.findOneBy({id});
    const updatedOrder = Object.assign(order, {
        orderItems: order.orderItems.filter(item => item.id !== itemId)
        });
    return this.orderRepository.save(updatedOrder);
  }

  async addItem(id: string, item: any) {
    const order = await this.orderRepository.findOneBy({id});
    const updatedOrder = Object.assign(order, {
        orderItems: [...order.orderItems, item]
        });
    return this.orderRepository.save(updatedOrder);
  }

  async updateShippingAddress(id: string, shippingAddress: any) {
    const order = await this.orderRepository.findOneBy({id});
    const updatedOrder = await new SetOrderShippingMethodService(this.orderRepository).setShippingMethod(order.id, shippingAddress);
    return this.orderRepository.save(updatedOrder);
  }
}
