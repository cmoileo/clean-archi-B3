import {IsArray, IsNotEmpty, IsString, IsInt } from "class-validator";
import {CreateDateColumn} from "typeorm";

export class OrderCreateDTO {
    @IsNotEmpty()
    @IsString()
    customer_name: string;
    @IsNotEmpty()
    @IsArray()
    orderItems: OrderItemCreateDto[];
    @CreateDateColumn()
    orderDate: Date;
}

export class OrderItemCreateDto {
    @IsNotEmpty()
    @IsString()
    product_name: string;
    @IsNotEmpty()
    @IsInt()
    quantity: number;
    @IsNotEmpty()
    @IsInt()
    price: number;
}