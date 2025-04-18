import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { QuizComponent } from './quiz/quiz.component';


@Component({
  selector: 'app-root',
  imports: [NavbarComponent ,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz';
}
