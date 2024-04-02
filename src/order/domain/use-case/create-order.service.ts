import {OrderCreateDTO} from "../dto/create-order.dto";
import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/orderItem.entity";

export class CreateOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async createOrder(createOrderDto: OrderCreateDTO) {
        const orderItems: OrderItem[] = createOrderDto.orderItems.map(item =>
            (orderItems) =>
                new orderItems(
                    orderItems.id,
                    orderItems.name,
                    orderItems.price,
                    orderItems.quantity
                )
            )
        const order = new Order(
            createOrderDto.customer_name,
            orderItems,
            createOrderDto.orderDate,
        )

        return await this.orderRepository.save(order)
    }
}