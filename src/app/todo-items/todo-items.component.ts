import { Component, inject } from '@angular/core';
import { BrowserStorageService } from '../services/storage.servive';
import { CheckboxChangeEvent, Checkbox } from 'primeng/checkbox';
import { Todo } from '../interfaces/todo';
import { Button } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';



@Component({
  selector: 'todo-items',
  imports: [Checkbox, Button, CheckboxModule, FormsModule, ButtonModule, InputTextModule, InputGroupModule],
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {

  storageService = inject(BrowserStorageService);
  
  inputValue: string = '';
  
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
  }

  getTodoItems() {
    const rawItems = this.storageService.get('todo');
    if (!rawItems || !Array.isArray( JSON.parse(rawItems) )) {
      return [];
    }

    return JSON.parse(rawItems);
  }

  updateTodoItemChecked(index: number, event: CheckboxChangeEvent): void {

    const checked = event.checked;

    const items = this.getTodoItems();

    const item = items[index];

    const itemNew: Todo = {
      checked: checked,
      value: item.value
    };

    items.splice(index, 1, itemNew);

    this.updateTodoItems(items);
  }

  removeTodoItem(index: number): void {

    const items = this.getTodoItems();
    
    items.splice(index, 1);

    this.updateTodoItems(items);
    
  }

  addTodoItem(): void {
    if (this.inputValue == '') return;

    const items = this.getTodoItems();

    const item: Todo = {
      checked: false,
      value: this.inputValue
    };

    items.push(item);

    this.updateTodoItems(items);

    this.inputValue = '';
  }

  updateTodoItems(items: object): void {
    this.storageService.set('todo', JSON.stringify(items));
  }

  items: Todo[] = this.getTodoItems();
  
  ngOnInit() {
    // items: Todo[] = this.getTodoItems(); ?
  }
}
