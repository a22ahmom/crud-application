import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { BookList } from './book-list/book-list';
import { EditBook } from './edit-book/edit-book';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './guards/auth.guard';
import { QuoteList } from './quote-list/quote-list';
import { AddQuote } from './add-quote/add-quote';
import { EditQuote } from './edit-quote/edit-quote';

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
        component: BookList,
        canActivate: [authGuard]
    },
    {
        path: 'books/new',
        component: AddBook,
        canActivate: [authGuard]
    },
    {
        path: 'books/edit/:id',
        component: EditBook,
        canActivate: [authGuard]
    },
    {
        path: 'quotes',
        component: QuoteList,
        canActivate: [authGuard]
    },
    {
        path: 'quotes/new',
        component: AddQuote,
        canActivate: [authGuard]
    },
    {
        path: 'quotes/edit/:id',
        component: EditQuote,
        canActivate: [authGuard]
    }
];
