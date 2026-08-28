import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../book-service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit{

  books: Book[] = [];

  constructor(
    private bookService: BookService
  ){}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: books => {
        this.books = books;
      },

      error: error => {
        console.error('Kunde inte hämta böcker:', error);
      }
    });
  }

  deleteBook(id: number) {
    
    const confirmed = confirm(
      'Är du säker på att du vill radera boken?'
    );

    if (!confirmed){
      return;
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      },

      error: error => {
        console.error('Kunde inte radera boken:', error);
      }
    });
  }
}
