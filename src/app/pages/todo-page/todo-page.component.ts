import { Component } from '@angular/core';
import { TodoItemsComponent } from '../../todo-items/todo-items.component';


@Component({
  selector: 'todo-page',
  imports: [
    TodoItemsComponent,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent {
}
