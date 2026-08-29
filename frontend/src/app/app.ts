import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    public authService: Auth,
    private router: Router
  ){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
