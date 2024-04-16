import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { Order } from 'src/order/domain/entity/order.entity';
import {OrderModule} from "../../src/order/order.module";
import {PaidOrderService} from "../../src/order/domain/use-case/paid-order.service";
import {OrderRepositoryInterface} from "../../src/order/domain/port/order.repository.interface";
import OrderRepository from "../../src/order/infrastructure/order.repository";

// Pour run le test : npm run test:e2e get-orders

// AAA

// Arrange
// préparer les données pour que le test soit valide
// GIVEN

// ACT
// faire la requête avec la bonne url, les bons query params, la bonne méthode
// HTTP, et les bonnes données dans le body
// WHEN

// ASSERT
// Vérifier que les données retournées par le ACT, correspondent à ce qui est attendu
// THEN

describe('Get Orders (e2e)', () => {
  let app: INestApplication;
  let order1: Order;
        //order1 = création d'une commande en BDD de test
    });

const orderMock = {
    id: "order",
    items: []
}

    it('should pay one', async () => {
        const order =
        const orderRepository: OrderRepositoryInterface = await new OrderRepository(order);

        const paidOrder = await new PaidOrderService(orderRepository).paidOrder(order.id)
    });
});
