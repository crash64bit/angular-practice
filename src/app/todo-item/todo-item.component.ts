import { Component, inject, Input } from '@angular/core';
import { TodoService } from '../services/todo.servive';
import { Todo } from '../interfaces/todo';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'todo-item',
  imports: [CheckboxModule, FormsModule, ButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  @Input() item!: Todo
  @Input() index!: number
}
