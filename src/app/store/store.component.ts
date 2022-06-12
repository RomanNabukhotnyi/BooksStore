import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BookRepository } from "../model/book.repository";
import { Book } from "../model/book.model";
import { Cart } from "../model/cart.model";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    public selectedGenre: string | undefined = undefined;
    public booksPerPage = 4;
    public selectedPage = 1;

    constructor(private repository: BookRepository, private cart: Cart, 
        private router: Router) { }

    get books(): Book[] {
        let pageIndex = (this.selectedPage - 1) * this.booksPerPage;
        return this.repository.getBooks(this.selectedGenre)
            .slice(pageIndex, pageIndex + this.booksPerPage);
    }

    get genres(): string[] {
        return this.repository.getGenres();
    }

    changeGenre(newGenre?: string) {
        this.selectedGenre = newGenre;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(event: Event) {
        const target = event.target as HTMLInputElement;
        this.booksPerPage = Number(target.value);
        this.changePage(1);
    }

    get pageCount(): number {
        return Math.ceil(this.repository
            .getBooks(this.selectedGenre).length / this.booksPerPage);
    }

    addBookToCart(book: Book) {
        this.cart.addLine(book);
        this.router.navigateByUrl("/cart");
    }
}