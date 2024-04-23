import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../domain/port/order.repository.interface';
import { OrderItem } from '../domain/entity/order-item.entity';

export default class OrderRepository
  extends Repository<Order>
  implements OrderRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Order, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Order | null> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Order[]> {
    const queryBuilder = this.createQueryBuilder('order');

    return queryBuilder.getMany();
  }
  async addOrderItem(orderItem: OrderItem): Promise<Order> {
    const queryBuilder = this.createQueryBuilder('order');
    queryBuilder.where('order.id = :id', { id: orderItem.id });

    const order = await queryBuilder.getOne();

    return queryBuilder.getOne();
  }

  async findByCustomerName(customerName: string): Promise<Order[]> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.customerName = :customerName', { customerName });

    return queryBuilder.getMany();
  }

  async deleteOrder(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
