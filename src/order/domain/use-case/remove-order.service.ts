export class RemoveOrderService {
    constructor(private orderRepository: OrderRepository) {}
    removeOrder(id: string): void {
        const order = this.orderRepository.findOrder(id);

        if (!order) {
            throw new Error('Order not found');
        }

        try {
            this.orderRepository.deleteOrder(order);
        } catch (error) {
            throw new Error('Error while deleting order');
        }
    }
}