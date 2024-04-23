import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetOrderInvoincingAddressDto } from '../dto/set-order-invoincing-address.dto';

export class SetOrderInvoicingAddressService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async setOrderInvoicingAddress(
    setOrderInvoicingAddressDto: SetOrderInvoincingAddressDto,
  ) {
    const order = await this.orderRepository.findById(
      setOrderInvoicingAddressDto.orderId,
    );

    order.setInvoiceAddress(setOrderInvoicingAddressDto.invoicingAddress);

    return this.orderRepository.save(order);
  }
}
