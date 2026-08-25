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
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    this.bookService.addBook(newBook).subscribe({
      next: book => {
        console.log('Boken skapades:', book);

        this.router.navigate(['/books']);
      },

      error: error => {
        console.error('Kunde inte skapa boken:', error);
      }
    });
  }
}
