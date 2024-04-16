import {Order} from "../entity/order.entity";
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { PaidOrderService } from './paid-order.service';

describe('piad order', () => {
  const order = new Order('name', []);
  order.setShippingAddress('address');
  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should return order w/ updated status', async () => {
    const orderPaidService = new PaidOrderService(orderRepositoryMock);
    const orderPaid = await orderPaidService.paidOrder('123');
    expect(orderPaid.status).toBe('PAID');

  });
});
