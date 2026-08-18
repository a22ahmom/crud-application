import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';

export const routes: Routes = [
    {
        path: 'books/new',
        component: AddBook
    }
];
