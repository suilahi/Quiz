import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // ✅ Import this
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink], // ✅ Add HttpClientModule here
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  private http = inject(HttpClient);

  categories: Array<any> = [];
  selectedCategory: number = 9;
  selectedDifficulty: string = 'medium';
  numQuestions: number = 10;
  quizData: any;

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.http.get('https://opentdb.com/api_category.php').subscribe({
      next: (res: any) => {
        this.categories = res.trivia_categories;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  startQuiz(): void {
    
      localStorage.setItem('category', this.selectedCategory.toString());
      localStorage.setItem('difficulty', this.selectedDifficulty);
    
    const url = `https://opentdb.com/api.php?amount=${this.numQuestions}&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=multiple`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('api url:', url);
        this.quizData = res.results;
      },
      error: (err) => {
        console.error('api error:', err);
      }
    });
  }
  
}
