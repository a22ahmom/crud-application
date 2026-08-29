import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private apiURL = 'https://crud-application-34e5.onrender.com/api/Books';

  constructor(private http: HttpClient){}

  books: Book[] = [];

  getBooks(){
    return this.http.get<Book[]>(this.apiURL);
  }

  getBook(id: number){
    return this.http.get<Book>(
      `${this.apiURL}/${id}`
    );
  }

  addBook(book: Book){
    return this.http.post<Book>(
      this.apiURL,
      book
    );
  }

  updateBook(id: number, book: Book) {

    return this.http.put(
      `${this.apiURL}/${id}`,
      book
    );
  }

  deleteBook(id: number) {
    
    return this.http.delete(
      `${this.apiURL}/${id}`
    );
  }
}