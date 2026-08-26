import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
