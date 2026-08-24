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

  constructor(
    private authService: Auth,
    private router: Router
  ){}

  register() {
    this.authService
      .register(this.username, this.password)
      .subscribe({
        next: response => {
          console.log(response);

          this.router.navigate(['/login']);
        },

        error: error => {
          console.error('Registreringen misslyckades:', error);
        }
      });
  }
}
