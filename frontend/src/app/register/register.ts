import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  username = '';
  password = '';
  confirmedPassword = '';
  errorMessage = '';

  isLoading = false;

  constructor(
    private authService: Auth,
    private router: Router
  ){}

  register() {

    this.errorMessage = '';

    if (this.password !== this.confirmedPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register(this.username, this.password)
      .subscribe({
        next: response => {
          this.isLoading = false;
          console.log(response);
          this.router.navigate(['/login']);
        },

        error: error => {
          this.isLoading = false;

          if (error.status === 409 || error.status === 400) {
            this.errorMessage = 'Användarnamnet finns redan.';
          } else {
            this.errorMessage = 'Något fick fel. Försök igen.';
          }
        }
      });
  }
}
