import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service';

@Component({
  selector: 'app-edit-book',
  imports: [FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook {

  bookIndex: number;

  title = '';
  author = '';
  publicationDate = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ){

    this.bookIndex = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const book = this.bookService.books[this.bookIndex];

    if (book) {
      this.title = book.title;
      this.author = book.author;
      this.publicationDate = book.publicationDate;
    }
  }

  saveBook(){

    const updatedBook = {
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    this.bookService.updateBook(
      this.bookIndex,
      updatedBook
    );

    this.router.navigate(['/books']);
  }
}
