import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router
  ){}

  login() {

    this.errorMessage = '';

    this.authService
      .login(this.username, this.password)
      .subscribe({
        next: response => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate(['/books']);
        },

        error: error => {
          
          if (error.status === 401){
            this.errorMessage =
              'Fel användarnamn eller lösenord.';
          } else {
            this.errorMessage =
              'Något gick fel. Försök igen.';
          }
        }
      });
  }

}
