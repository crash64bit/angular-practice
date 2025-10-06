import { inject, Injectable } from '@angular/core';
import { BrowserStorageService } from './storage.servive';
import { Todo } from '../interfaces/todo';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
    storageService = inject(BrowserStorageService);
  
    inputValue = '';
  
    onInputChange(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.inputValue = value;
    }
  
    getTodoItems() {
      const rawItems = this.storageService.get('todo');
      if (!rawItems || !Array.isArray( JSON.parse(rawItems) )) {
        this.storageService.set('todo', JSON.stringify([]));
  
        return [];
      }
  
      const items = JSON.parse(rawItems);
  
      return items;
    }
  
    updateTodoItemChecked(index: number, event: CheckboxChangeEvent) {
        
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
  
    removeTodoItem(index: number) {

      const items = this.getTodoItems();
      
      items.splice(index, 1);
  
      this.updateTodoItems(items);
      
    }
  
    addTodoItem() {
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
  
    updateTodoItems(items: object) {
      this.storageService.set('todo', JSON.stringify(items));
    }
}