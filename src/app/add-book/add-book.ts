import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book-service';
import { Book } from '../models/book';

@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
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

    const newBook: Book = {
      id: Date.now(),
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    console.log('Ny bok:', newBook);
    
    this.bookService.addBook(newBook);

    this.router.navigate(['/books']);
  }
}
