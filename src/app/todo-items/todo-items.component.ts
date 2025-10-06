import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.servive';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: 'todo-items',
  imports: [TodoItemComponent, TodoItemComponent],
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {
  todoService = inject(TodoService);

  // getTodoItems(): Array<object> {
  //   return this.todoService.getTodoItems();
  // }

  // items: Array<object> = this.getTodoItems();
}
