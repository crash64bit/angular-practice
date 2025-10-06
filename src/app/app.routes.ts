import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

export const routes: Routes = [
    {
        path: '',
        // component: HomePageComponent
        loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
    }, // Default route
    {
        path: 'todo',
        // component: TodoPageComponent
        loadComponent: () =>
            import('./pages/todo-page/todo-page.component').then(m => m.TodoPageComponent),
    },
    { path: '**', redirectTo: '' } // Wildcard route for handling unknown paths
];
