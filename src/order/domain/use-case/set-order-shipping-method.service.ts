import OrderRepository from "../../infrastructure/order.repository";

export class SetOrderShippingMethodService {
    constructor(private readonly orderRepository: OrderRepository) {}
    async setShippingMethod(orderId, shippingAddress) {
        const order = await this.orderRepository.findOne(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        if (shippingAddress && (shippingAddress.length < 5 || shippingAddress.length > 20)) {
            throw new Error('Address must be between 5 and 20 characters')
        }

        try {
            order.shippingAddress = shippingAddress;
            return this.orderRepository.save(order);
        } catch (error) {
            throw new Error('Error while setting shipping method');
        }
    }
}