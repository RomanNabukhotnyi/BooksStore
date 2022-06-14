import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

@Component({
    templateUrl: "bookEditor.component.html"
})
export class BookEditorComponent {
    editing: boolean = false;
    book: Book = new Book();

    constructor(private repository: BookRepository, private router: Router, activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.book, repository.getBook(activeRoute.snapshot.params["id"]));
        }
    }

    save(form: NgForm) {
        this.repository.saveBook(this.book);
        this.router.navigateByUrl("/admin/main/books");
    }
}