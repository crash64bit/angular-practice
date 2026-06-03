import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserStorageService } from '../../services/storage.service';
import { Todo } from '../../models/todo.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider'
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-todo-items',
  imports: [
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatIcon,
    ReactiveFormsModule
],
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {

  storageService = inject(BrowserStorageService);

  newTodoControl = new FormControl('', {
    nonNullable: true,
  });

  formMode: 'add' | 'edit' = 'add';
  editTodoItemId: string | null = null;

  getCheckedTodoItems(): Todo[] {
    return this.items.filter(item => item.checked )
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

  updateTodoItem(id: string, checked: boolean, value: string): void {

    const items = this.getTodoItems();

    const item = items.find(item => item.id === id);
    if (!item) return;

    const itemNew: Todo = {
      id: item.id,
      checked: checked,
      value: value
    };

    const index = items.findIndex(item => item.id === id);
    if (index === -1) return;
    items.splice(index, 1, itemNew);

    this.updateTodoItems(items);
  }

  updateTodoItemChecked(id: string, checked: boolean): void {

    const items = this.getTodoItems();

    const item = items.find(item => item.id === id);
    if (!item) return;

    this.updateTodoItem(id, checked, item.value);
  }

  removeTodoItem(id: string): void {

    if (!id) return;

    const items = this.getTodoItems();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return;
    items.splice(index, 1);

    this.updateTodoItems(items);
    if (this.editTodoItemId === id) {
      this.cancelEditTodoItem();
    }
  }

  addTodoItem(): void {
    const value = this.newTodoControl.value.trim();

    if (!value) return;

    const items = this.getTodoItems();

    const item: Todo = {
      id: crypto.randomUUID(),
      checked: false,
      value: value
    };

    items.push(item);

    this.updateTodoItems(items);
    this.newTodoControl.reset();
  }

  updateTodoItems(items: Todo[]): void {
    this.storageService.set('todo', JSON.stringify(items));
    this.items = items;
    this.checkedItems = this.getCheckedTodoItems();
  }


  get isEditing(): boolean {
    return this.editTodoItemId !== null;
  }

  editTodoItem(item: Todo): void {
    this.editTodoItemId = item.id;
    this.formMode = 'edit';
    this.newTodoControl.setValue(item.value);
  }

  cancelEditTodoItem(): void {
    this.editTodoItemId = null;
    this.formMode = 'add';
    this.newTodoControl.reset();
  }

  saveTodoItem(): void {
    const value = this.newTodoControl.value.trim();
    if (!value) return;

    if (this.formMode === 'add') {
      this.addTodoItem();
      return;
    }

    if (!this.editTodoItemId) return;

    const items = this.getTodoItems();
    const index = items.findIndex((todo) => todo.id === this.editTodoItemId);

    if (index === -1) {
      this.cancelEditTodoItem();
      return;
    }

    const item = items[index];
    this.updateTodoItem(item.id, item.checked, value);
    this.cancelEditTodoItem();
  }

  items: Todo[] = this.getTodoItems();
  checkedItems: Todo[] = this.getCheckedTodoItems();
}
