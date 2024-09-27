import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import {MatDividerModule} from '@angular/material/divider'; 
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, TodoItemComponent, MatDividerModule, DragDropModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private todoService = inject(TodoService)
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
    let newTodo = {
      description: "",
      done: false
    }
    this.todoService.createTodo(newTodo).subscribe({
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

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
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

  drop(event: CdkDragDrop<Todo[]>) {
    let movedTodo : Todo = this.todos[event.previousIndex]
    movedTodo.sequenceNumber = event.currentIndex
    let subTodos : Todo[];

    if (event.previousIndex < event.currentIndex) {
      subTodos = this.todos.slice(event.previousIndex + 1, event.currentIndex +1)

      for (var todo of subTodos) {
        todo.sequenceNumber -= 1
      }
    } else {
      subTodos = this.todos.slice(event.currentIndex, event.previousIndex)

      for (var todo of subTodos) {
        todo.sequenceNumber += 1
      }

    }
  
    subTodos.push(movedTodo)

    console.log(subTodos)

    this.todoService.updateTodos(subTodos).subscribe({
      next: response => {
        console.log(response)
        this.getTodos()
      },
      error: error => console.log(error)
    }); 
  }
}
