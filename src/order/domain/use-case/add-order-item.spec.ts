import { AddOrderItemService } from './add-order-item.service';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

describe('add order item', () => {
  const order = new Order('John Doe', []);

  const orderItemRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  const addOrderItemService = new AddOrderItemService(orderItemRepositoryMock);
  it('should add an order item to an order', async () => {
    expect(
      await addOrderItemService.addOrderItem({
        orderId: 'orderId',
        orderItem: new OrderItem('productName', 1, 1),
      }),
    ).toEqual('orderId');
  });
});
