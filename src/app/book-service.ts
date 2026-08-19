import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  books: any[] = [];

  addBook(book: any){
    this.books.push(book);
  }
}