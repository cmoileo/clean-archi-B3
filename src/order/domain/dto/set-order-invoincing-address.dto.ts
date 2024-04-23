import { IsString, IsUUID } from 'class-validator';

export class SetOrderInvoincingAddressDto {
  @IsString()
  @IsUUID()
  orderId: string;

  @IsString()
  invoicingAddress: string;
}
