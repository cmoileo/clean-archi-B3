import {Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Entity} from "typeorm";
import {Order} from "./order.entity";

@Entity()
export class OrderItem {

    constructor( productName: string, quantity: number, price: number,
    ) {
        if (this.productName === '') {
            throw new Error('Product name is required');
        }
        if (this.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (this.quantity > 2) {
            throw new Error('Quantity must be less than or equal to 2');
        }

        this.quantity = quantity;
        this.productName = productName;
        this.price = price;
    }

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    quantity: number;

    @Column()
    private productName: string;

    @Column()
    price: number;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: 'orderId' })
    order: Order;
}
