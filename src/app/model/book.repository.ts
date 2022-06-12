import { Injectable } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { Book } from "./book.model";

@Injectable()
export class BookRepository {
    private books: Book[] = [];
    private genres: string[] = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getBooks().subscribe(data => {
            this.books = data;
            this.genres = data.map(b => b.genre)
                .filter((g, index, array) => array.indexOf(g) == index).sort();
        });
    }

    getBooks(genre?: string): Book[] {
        return this.books.filter(b => genre == undefined || genre == b.genre);
    }

    getBook(id: number): Book | undefined {
        return this.books.find(b => b.id == id);
    }

    getGenres(): string[] {
        return this.genres;
    }
}