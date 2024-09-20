import { Component, input, model, output } from '@angular/core';
import { Todo } from '../_models/todo';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
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
