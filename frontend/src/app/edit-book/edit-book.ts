import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service';
import { Book } from '../models/book';

@Component({
  selector: 'app-edit-book',
  imports: [FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook implements OnInit {

  bookId!: number;

  title = '';
  author = '';
  publicationDate = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {

    this.bookId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.bookService.getBook(this.bookId).subscribe({
      next: book => {
        this.title = book.title;
        this.author = book.author;

        this.publicationDate =
          book.publicationDate.substring(0, 10);
      },

      error: error => {
        console.log('Kunde inte hämta boken:', error);
      }
    });
  }

  saveBook() {

    const updatedBook: Book = {
      id: this.bookId,
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate
    };

    this.bookService.
      updateBook(this.bookId, updatedBook)
      .subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },

        error: error => {
          console.error(
            'Kunde inte uppdatera boken:',
            error
          );
        }
      });
  }
}

