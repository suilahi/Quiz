import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // ✅ Import this
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Add HttpClientModule here
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router); 


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
    if (this.selectedCategory) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty
        }
      });
    } else {
      alert('Please select a category!');
    }
  }
  
}
