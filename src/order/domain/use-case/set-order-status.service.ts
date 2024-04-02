import OrderRepository from "../../infrastructure/order.repository";

export class SetOrderStatusService {
    constructor(private readonly orderRepository: OrderRepository) {}
    async setOrderStatus({orderId, status}: {
        orderId: string;
        status: "CART" | "SHIPPING_ADDRESS_SET" | "PAID";
    }) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = status;
        if (status === "PAID") {
            order.paidAt = new Date();
        }
        return this.orderRepository.save(order);
    }

    async getOrderStatus(orderId: string) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order.status;
    }
}