import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote-service';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-edit-quote',
  imports: [FormsModule],
  templateUrl: './edit-quote.html',
  styleUrl: './edit-quote.css',
})
export class EditQuote implements OnInit{

  quoteId!: number;

  text = '';
  author = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService
  ){}

  ngOnInit() {

    this.quoteId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.quoteService.getQuote(this.quoteId).subscribe({
      next: quote => {
        this.text = quote.text;
        this.author = quote.author;
      },

      error: error => {
        console.error('Kunde inte hämta citatet:', error);
      }
    });
  }

  saveQuote() {

    const updatedQuote: Quote = {
      id: this.quoteId,
      text: this.text,
      author: this.author
    };

    this.quoteService
      .updateQuote(this.quoteId, updatedQuote)
      .subscribe({
        next: () => {
          this.router.navigate(['/quotes']);
        },

        error: error => {
          console.error(
            'Kunde inte uppdatera citatet:',
            error
          );
        }
      });
  }

}
