import { Component, inject } from '@angular/core';
import { BrowserStorageService } from '../../services/storage.service';
import { Todo } from '../../models/todo.interface';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider'
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-todo-items',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatIcon
],
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {

  storageService = inject(BrowserStorageService);
  
  inputValue = '';
  
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
  }

  getCheckedTodoItems(): Todo[] {
    return this.getTodoItems().filter(item => item.checked )
  }

  getTodoItems(): Todo[] {
    const rawItems = this.storageService.get('todo');

    if (!rawItems) {
      return [];
    }

    try {
      const parsed = JSON.parse(rawItems);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  updateTodoItemChecked(id: string, checked: boolean): void {

    const items = this.getTodoItems();

    const item = items.find(item => item.id === id);
    if (!item) return;

    const itemNew: Todo = {
      id: item.id,
      checked: checked,
      value: item.value
    };

    items.splice(items.findIndex(item => item.id === id), 1, itemNew);

    this.updateTodoItems(items);
  }

  removeTodoItem(id: string): void {

    if (!id) return;

    const items = this.getTodoItems();
    items.splice(items.findIndex(item => item.id === id), 1);

    this.updateTodoItems(items);
    
  }

  addTodoItem(): void {
    if (this.inputValue === '') return;

    const items = this.getTodoItems();

    const item: Todo = {
      id: crypto.randomUUID(),
      checked: false,
      value: this.inputValue
    };

    items.push(item);

    this.updateTodoItems(items);

    this.inputValue = '';
  }

  updateTodoItems(items: Todo[]): void {
    this.storageService.set('todo', JSON.stringify(items));
    this.items = items;
    this.checkedItems = items.filter(item => item.checked );
  }

  items: Todo[] = this.getTodoItems();
  checkedItems: Todo[] = this.items.filter(item => item.checked );
}
