import { Order } from '../entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

export const GROUP_ORDER_ITEM = 'group_order_item_details';
export const GROUP_ALL_ORDERS_ITEMS = 'group_all_orders_items';

@Entity('order-item')
export class OrderItem {
  constructor(productName: string, quantity: number, price: number) {
    this.verifyNameIsCorrect(productName);

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (quantity > 2) {
      throw new Error('Quantity must be less than or equal to 2');
    }

    this.productName = productName;
    this.quantity = quantity;
    this.price = price;
  }

  verifyNameIsCorrect(productName: string) {
    if (productName === '') {
      throw new Error('Product name is required');
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose({ groups: [GROUP_ORDER_ITEM, GROUP_ALL_ORDERS_ITEMS] })
  id: string;

  @Column()
  @Expose({ groups: [GROUP_ORDER_ITEM, GROUP_ALL_ORDERS_ITEMS] })
  productName: string;

  @Column({
    type: 'int',
  })
  @Exclude()
  quantity: number;

  @Column({
    type: 'int',
  })
  @Exclude()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @Exclude()
  order: Order;

  getTotalPrice(): number {
    return this.quantity * this.price;
  }
}
