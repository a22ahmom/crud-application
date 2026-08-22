import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../book-service';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  constructor(public bookService: BookService){}

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
  }
}
