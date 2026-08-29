import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {

  private apiUrl = 'https://crud-application-34e5.onrender.com/api/Quotes';

  constructor(private http: HttpClient) {}

  getQuotes() {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  getQuote(id: number) {
    return this.http.get<Quote>(
      `${this.apiUrl}/${id}`
    )
  }

  addQuote(quote: Quote) {
    return this.http.post<Quote>(
      this.apiUrl,
      quote
    );
  }

  updateQuote(id: number, quote: Quote) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      quote
    );
  }

  deleteQuote(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
