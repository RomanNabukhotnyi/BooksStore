import { NgModule } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { BookRepository } from "./book.repository";
import { Cart } from "./cart.model";

@NgModule({
    providers: [BookRepository, StaticDataSource, Cart]
})
export class ModelModule { }