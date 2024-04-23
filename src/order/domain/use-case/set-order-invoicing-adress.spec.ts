import { OrderStatus } from '../enum/order-status.enum';
import { SetOrderInvoicingAddressService } from './set-order-invoicing-adress.service';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

describe('set order invoincing address', () => {
  const order = new Order('John Doe', []);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order with a invoicing method', async () => {
    const setOrderInvoicingAddressService = new SetOrderInvoicingAddressService(
      orderRepositoryMock,
    );

    const orderUpdated =
      await setOrderInvoicingAddressService.setOrderInvoicingAddress({
        orderId: '1234',
        invoicingAddress: '13 rue de la paix',
      });

    expect(orderUpdated.status).toEqual(OrderStatus.INVOICING_ADDRESS_SET);
    expect(orderUpdated.invoicingAddress).toEqual('13 rue de la paix');
  });
});
