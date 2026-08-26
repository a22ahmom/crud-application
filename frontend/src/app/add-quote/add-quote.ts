import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteService } from '../services/quote-service';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-add-quote',
  imports: [FormsModule],
  templateUrl: './add-quote.html',
  styleUrl: './add-quote.css',
})
export class AddQuote {

  text = '';
  author = '';

  constructor(
    private quoteService: QuoteService,
    private router: Router
  ){}

  addQuote() {

    const newQuote: Quote = {
      text: this.text,
      author: this.author
    };

    this.quoteService.addQuote(newQuote).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },

      error: error => {
        console.error('Kunde inte lägga till citatet:', error);
      }
    });
  }

}
