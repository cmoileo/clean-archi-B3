import {Column, OneToMany, PrimaryGeneratedColumn, Entity, CreateDateColumn } from "typeorm";
import {OrderItem} from "./orderItem.entity";

@Entity()
export class Order {
    constructor(
        customerName: string,
        orderItems: OrderItem[],
        orderDate: Date,
        shippingAddress: string
    ) {
        this.customerName = customerName;
        this.orderItems = orderItems;
        this.createdDate = orderDate;
        this.shippingAddress = shippingAddress
    }

    @CreateDateColumn()
    createdDate: Date;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column({nullable: true})
    shippingAddress: string

    @Column()
    customerName: string;

    @Column()
    price: number;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @Column()
    status: "CART" | "SHIPPING_ADDRESS_SET" | "PAID";

    @Column()
    paidAt: Date;
}
