import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class BookRepository {
    private books: Book[] = [];
    private genres: (string | undefined)[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getBooks().subscribe(data => {
            this.books = data;
            this.genres = data.map(b => b.genre)
                .filter((g, index, array) => array.indexOf(g) == index).sort();
        });
    }

    getBooks(genre?: string): Book[] {
        return this.books.filter(b => genre == undefined || genre == b.genre);
    }

    getBook(id?: number): Book | undefined {
        return this.books.find(b => b.id == id);
    }

    getGenres(): (string | undefined)[] {
        return this.genres;
    }

    saveBook(book: Book) {
        if (book.id == null || book.id == 0) {
            this.dataSource.saveBook(book)
                .subscribe(b => this.books.push(b));
        } else {
            this.dataSource.updateBook(book)
                .subscribe(b => {
                    this.books.splice(this.books.findIndex(b => b.id == book.id), 1, book);
                });
        }
    }

    deleteBook(id?: number) {
        this.dataSource.deleteBook(id).subscribe(b => {
            this.books.splice(this.books.findIndex(b => b.id == id), 1);
        })
    }
}