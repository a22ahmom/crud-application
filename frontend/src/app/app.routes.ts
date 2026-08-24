import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { BookList } from './book-list/book-list';
import { EditBook } from './edit-book/edit-book';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'books',
        component: BookList
    },
    {
        path: 'books/new',
        component: AddBook
    },
    {
        path: 'books/edit/:id',
        component: EditBook
    }
];
