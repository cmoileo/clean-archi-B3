import {Order} from "../entity/order.entity";

export class GetOrderByCustomerService {
    constructor(private orderRepository: OrderRepository) {}
    public getOrderByCustomer(customerId: number): Order[] {
        const orders: Order[] = this.orderRepository.findOrdersByCustomer(customerId);
        return orders;
    }
}
