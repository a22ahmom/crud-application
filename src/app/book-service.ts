import { Injectable } from '@angular/core';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  books: Book[] = [];

  addBook(book: Book){
    this.books.push(book);
  }

  updateBook(id: number, updatedBook: Book) {
    const index = this.books.findIndex(book => book.id === id);

    if (index !== -1){
      this.books[index] = updatedBook;
    }
  }
}