import { OrderItem } from '../entity/order-item.entity';
import { OrderStatus } from '../enum/order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

export const GROUP_ORDER = 'group_order_details';
export const GROUP_ALL_ORDERS = 'group_all_orders';

@Entity()
export class Order {
  constructor(customerName: string, orderItems: OrderItem[]) {
    this.customerName = customerName;
    this.orderItems = orderItems;

    this.status = OrderStatus.CART;
  }

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_ORDER, GROUP_ALL_ORDERS] })
  id: string;

  @Column()
  @Expose({ groups: [GROUP_ORDER, GROUP_ALL_ORDERS] })
  price: number;

  @Column()
  @Expose({ groups: [GROUP_ORDER, GROUP_ALL_ORDERS] })
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: [GROUP_ORDER, GROUP_ALL_ORDERS] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Exclude()
  shippingAddress: string | null;

  @Column({ nullable: true })
  @Exclude()
  invoicingAddress: string | null;

  @Column({ nullable: true })
  @Exclude()
  shippingAddressSetAt: Date | null;

  @Column()
  @Exclude()
  status: OrderStatus;

  @Column()
  @Exclude()
  paidAt: Date | null;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = OrderStatus.SHIPPING_ADDRESS_SET;
  }
  addOrderItem(orderItem: OrderItem): void {
    if (this.status !== OrderStatus.CART) {
      throw new Error('You cannot add items to a paid order');
    }
    if (orderItem.productName === '') {
      throw new Error('Product name is required');
    }
    if (orderItem.quantity <= 0 || orderItem.quantity > 2) {
      throw new Error(
        'Quantity must be greater than 0 and less than or equal to 2',
      );
    }
    this.orderItems.push(orderItem);
  }

  pay() {
    if (this.status !== OrderStatus.SHIPPING_ADDRESS_SET) {
      throw new Error('You have to select a shipping adress');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  setInvoiceAddress(invoiceAddress: string): void {
    if (invoiceAddress === '') {
      throw new Error('Invoice address is required');
    }

    if (invoiceAddress.length > 100) {
      throw new Error(
        'Invoice address must be less than or equal to 100 characters',
      );
    }

    this.invoicingAddress = invoiceAddress;
    this.status = OrderStatus.INVOICING_ADDRESS_SET;
  }
}
