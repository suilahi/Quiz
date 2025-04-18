import { Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

export const routes: Routes = [
    {
        path :'',
        redirectTo :'acceuil',
        pathMatch :'full'
    },
    
    {path:'quiz',
        component : QuizComponent

    },
    {
        path:'acceuil',
        component : AcceuilComponent
    }
];
