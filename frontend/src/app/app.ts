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

  isDarkMode = false;

  constructor(
    public authService: Auth,
    private router: Router
  ){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    
    this.isDarkMode = !this.isDarkMode;

    const theme = this.isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute(
      'data-bs-theme',
      theme
    );

    localStorage.setItem('theme', theme);
  }

  loadTheme() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.isDarkMode = true;

      document.documentElement.setAttribute(
        'data-bs-theme',
        'dark'
      );
    } else {
      this.isDarkMode = false;

      document.documentElement.setAttribute(
        'data-bs-theme',
        'light'
      );
    }
  }
}
