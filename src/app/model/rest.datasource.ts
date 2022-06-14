import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "./book.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { map } from "rxjs/operators";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string | undefined;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : undefined;
            return response.success;
        }));
    }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + "books");
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }

    saveBook(book: Book): Observable<Book> {
        return this.http.post<Book>(this.baseUrl + "books",
            book, this.getOptions());
    }

    updateBook(book: Book): Observable<Book> {
        return this.http.put<Book>(`${this.baseUrl}books/${book.id}`,
        book, this.getOptions());
    }

    deleteBook(id?: number): Observable<Book> {
        return this.http.delete<Book>(`${this.baseUrl}books/${id}`,
            this.getOptions());
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }

    deleteOrder(id?: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`,
            this.getOptions());
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,
            order, this.getOptions());
    }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            })
        }
    }
}