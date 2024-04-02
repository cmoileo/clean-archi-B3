import OrderRepository from "../../infrastructure/order.repository";

export class UpdatePaidService {
    constructor(private readonly orderRepository: OrderRepository) {}
    async updatePaid(orderId) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = "PAID";
        order.paidAt = new Date();
        return this.orderRepository.save(order);
    }
}