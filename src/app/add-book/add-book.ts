import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book-service';

@Component({
  selector: 'app-add-book',
  imports: [RouterLink, FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {

  title = '';
  author = '';
  publicationDate = '';

  constructor (
    private bookService: BookService,
    private router: Router
  ) {}

  addBook(){

    const newBook = {
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    this.bookService.addBook(newBook);

    this.router.navigate(['/books']);
  }
}
