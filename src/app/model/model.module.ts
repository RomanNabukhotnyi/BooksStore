import { NgModule } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { BookRepository } from "./book.repository";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [BookRepository, StaticDataSource, Cart, Order, OrderRepository, 
        {provide: StaticDataSource, useClass: RestDataSource}, 
        RestDataSource, AuthService]
})
export class ModelModule { }