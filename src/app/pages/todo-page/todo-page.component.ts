import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.servive';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { TodoItemsComponent } from '../../todo-items/todo-items.component';


@Component({
  selector: 'todo-page',
  imports: [
    TodoItemsComponent,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent {
  todoService = inject(TodoService);
}
