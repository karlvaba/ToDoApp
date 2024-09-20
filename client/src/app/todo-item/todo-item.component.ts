import { Component, input, output } from '@angular/core';
import { Todo } from '../_models/todo';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todoData = input.required<Todo>()

  onDelete = output<number>()
  onToggleDone = output<Todo>()

  toggleDone() : void {
    this.onToggleDone.emit(this.todoData())
  }

  delete() {
    console.log("delete pressed")
    this.onDelete.emit(this.todoData().id)
  }

  log() {
    console.log(this.todoData())  
  }
}
