import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { BookList } from './book-list/book-list';

export const routes: Routes = [
    {
        path: 'books/new',
        component: AddBook
    },
    {
        path: 'books',
        component: BookList
    }
];
