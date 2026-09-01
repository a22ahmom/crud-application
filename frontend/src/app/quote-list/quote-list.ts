import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuoteService } from '../services/quote-service';
import { Quote } from '../models/quote';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-quote-list',
  imports: [RouterLink],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteList implements OnInit{

  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    public authService: Auth
  ) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: quotes => {
        this.quotes = quotes;
      },

      error: error => {
        console.error(
          'Kunde inte hämta citaten',
          error
        );
      }
    });
  }

  deleteQuote(id: number) {

    const confirmed = confirm(
      'Är du säker på att du vill radera citaten?'
    );

    if (!confirmed) {
      return;
    }

    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.loadQuotes();
      },

      error: error => {
        console.error(
          'Kunde inte radera citaten:',
          error
        );
      }
    });
  }

  isOwner(quote: Quote): boolean {
    const currentUserId = this.authService.getCurrentUserId();

    return currentUserId !== null &&
      quote.userId === currentUserId;
  }
}
