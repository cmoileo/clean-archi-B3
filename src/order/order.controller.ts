import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDTO } from './domain/dto/create-order.dto';
import { UpdateOrderDto } from './domain/dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: OrderCreateDTO) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Delete(':id/item/:itemId')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.orderService.removeItem(+id, +itemId);
  }

  @Post(':id/item')
  addItem(@Param('id') id: string, @Body() item: any) {
    return this.orderService.addItem(+id, item);
  }

  @Patch(':id/shippingAddress')
  setShippingMethod(@Param('id') id: string, @Body() shippingAddress: any) {
    return this.orderService.updateShippingAddress(+id, shippingAddress);
  }
}
