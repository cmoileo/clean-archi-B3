import {Order} from "../entity/order.entity";

export class GetOrdersService {
    constructor(private orderRepository: OrderRepository) {}
    public getOrders(): Order[] {
        const orders: Order[] = this.orderRepository.findOrders()
        return orders;
    }
}