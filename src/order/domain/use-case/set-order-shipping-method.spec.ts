// import { Order } from '../entity/order.entity';
// import { OrderRepositoryInterface } from '../port/order.repository.interface';
// import { PaidOrderService } from './paid-order.service';
// import { OrderStatus } from '../enum/order-status.enum';
// import { SetOrderShippingAddressService } from './set-order-shipping-method.service';
// describe('paid order', () => {
//   const order = new Order('ordername', []);
//   const orderRepositoryMock = {
//     findById() {
//       return order;
//     },
//     save(order: Order) {
//       return order;
//     },
//   } as any as OrderRepositoryInterface;
//   order.setShippingAddress('address');
//   it('should update an order to paid', async () => {
//     const setOrderShippingAddressService = new SetOrderShippingAddressService(
//       orderRepositoryMock,
//     );
//
//     const updatedOrder =
//       await setOrderShippingAddressService.setOrderShippingAddress({
//         orderId: 'order',
//         shippingAddress: 'address',
//       });
//     expect(updatedOrder.shippingAddress).toEqual('address');
//     expect(updatedOrder.status).toBe(OrderStatus.SHIPPING_ADDRESS_SET);
//   });
//
//   it('should throw an error if shipping address is empty', async () => {
//     try {
//       await new SetOrderShippingAddressService(
//         orderRepositoryMock,
//       ).setOrderShippingAddress({
//         orderId: 'order',
//         shippingAddress: '',
//       });
//     } catch (error) {
//       expect(error.message).toBe('Shipping address is required');
//     }
//   });
// });
