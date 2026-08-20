import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { BookList } from './book-list/book-list';
import { EditBook } from './edit-book/edit-book';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'books/new',
        component: AddBook
    },
    {
        path: 'books',
        component: BookList
    },
    {
        path: 'books/edit/:id',
        component: EditBook
    }
];
