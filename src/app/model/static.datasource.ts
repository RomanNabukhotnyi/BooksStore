import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { Book } from "./book.model";
import { Order } from "./order.model";

@Injectable()
export class StaticDataSource {
    private books: Book[] = [
        new Book(1, "Tittle 1", "Author 1", "Genre 1", 10),
        new Book(2, "Tittle 2", "Author 1", "Genre 1", 10),
        new Book(3, "Tittle 3", "Author 1", "Genre 1", 10),
        new Book(4, "Tittle 4", "Author 1", "Genre 1", 10),
        new Book(5, "Tittle 5", "Author 1", "Genre 1", 10),
        new Book(6, "Tittle 6", "Author 2", "Genre 2", 10),
        new Book(7, "Tittle 7", "Author 2", "Genre 2", 10),
        new Book(8, "Tittle 8", "Author 2", "Genre 2", 10),
        new Book(9, "Tittle 9", "Author 2", "Genre 2", 10),
        new Book(10, "Tittle 10", "Author 2", "Genre 2", 10),
        new Book(11, "Tittle 11", "Author 3", "Genre 3", 10),
        new Book(12, "Tittle 12", "Author 3", "Genre 3", 10),
        new Book(13, "Tittle 13", "Author 3", "Genre 3", 10),
        new Book(14, "Tittle 14", "Author 3", "Genre 3", 10),
        new Book(15, "Tittle 15", "Author 3", "Genre 3", 10),
    ];

    getBooks(): Observable<Book[]> {
        return from([this.books]);
    }

    saveOrder(order: Order): Observable<Order> {
        console.log(JSON.stringify(order));
        return from([order]);
    }
}