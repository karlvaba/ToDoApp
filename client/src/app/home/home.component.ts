import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from "../todo/todo.component";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import {MatDividerModule} from '@angular/material/divider'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, TodoComponent, TodoItemComponent, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private todoService = inject(TodoService)
  model: any = {}
  todos: any

  ngOnInit() : void {
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: response => this.todos = response,
      error: () => {},
      complete: () => console.log('Request completed')
    })
  }

  addTodo() {
    this.todoService.createTodo(this.model).subscribe({
      next: response => {
        console.log(response)
        this.getTodos()
      },
      error: error => console.log(error)
    })
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: response => {
        console.log(response)
        this.getTodos()
      },
      error: error => console.log(error)
    })
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done

    this.todoService.updateTodo(todo).subscribe({
      next: response => {
        console.log(response)
        this.getTodos()
      },
      error: error => console.log(error)
    })
  }
}
