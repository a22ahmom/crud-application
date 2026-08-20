import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service';
import { Book } from '../models/book';

@Component({
  selector: 'app-edit-book',
  imports: [FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook {

  bookId: number;

  title = '';
  author = '';
  publicationDate = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ){

    this.bookId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const book = this.bookService.books.find(
      book => book.id === this.bookId
    );

    if (book) {
      this.title = book.title;
      this.author = book.author;
      this.publicationDate = book.publicationDate;
    }
  }

  saveBook(){

    const updatedBook: Book = {
      id: this.bookId,
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    this.bookService.updateBook(
      this.bookId,
      updatedBook
    );

    this.router.navigate(['/books']);
  }
}
