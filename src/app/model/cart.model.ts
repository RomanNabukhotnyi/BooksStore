import { Injectable } from "@angular/core";
import { Book } from "./book.model";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    addLine(book: Book, quantity: number = 1) {
        const line = this.lines.find(line => line.book.id == book.id);
        if (line) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(book, quantity));
        }
        this.recalculate();
    }

    updateQuantity(book: Book, quantity: number) {
        const line = this.lines.find(line => line.book.id == book.id);
        if (line) {
            line.quantity = quantity;
        }
        this.recalculate();
    }

    removeLine(id: number) {
        const index = this.lines.findIndex(line => line.book.id == id);
        this.lines.splice(index);
        this.recalculate();
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(line => {
            this.itemCount += line.quantity;
            this.cartPrice += (line.quantity * line.book.price);
        });
    }
}

export class CartLine {
    constructor(public book: Book, public quantity: number) { }

    get lineTotal() {
        return this.quantity * this.book.price;
    }
}