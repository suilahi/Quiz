import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quiz',
  standalone: true, // si standalone, bien le préciser
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  answers: string[] = [];

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(res => res.json())
      .then(data => {
        this.questions = data.results;
        this.setAnswers();
      });
  }
  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.getQuestions(); // Or however you're loading your questions
  }
  

  setAnswers() {
    if (this.questions.length > 0) {
      const current = this.questions[this.currentQuestionIndex];
      const allAnswers = [...current.incorrect_answers, current.correct_answer];
      this.answers = this.shuffleArray(allAnswers);
    }
  }

  selectAnswer(answer: string) {
    const correct = this.questions[this.currentQuestionIndex].correct_answer;
    if (answer === correct) {
      this.score++;
    }

    // Aller à la question suivante
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.setAnswers();
    }
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  get progress(): number {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }
}
