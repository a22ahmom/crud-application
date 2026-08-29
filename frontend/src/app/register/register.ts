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
    this.isLoading = true;

    if (this.password !== this.confirmedPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
      return;
    }

    this.authService
      .register(this.username, this.password)
      .subscribe({
        next: response => {
          console.log(response);

          this.isLoading = false;
          this.router.navigate(['/login']);
        },

        error: error => {
          this.isLoading = false;
          console.error('Registreringen misslyckades:', error);
        }
      });
  }
}
