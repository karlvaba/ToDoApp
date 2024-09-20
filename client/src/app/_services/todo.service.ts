import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:5001/api'

  createTodo(model: any) {
    return this.http.post(this.baseUrl +'/todos', model)
  }

  getTodos() {
    return this.http.get(this.baseUrl +'/todos')
  }

  deleteTodo(id: number) {
    return this.http.delete(this.baseUrl +'/todos/' + id)
  }

  updateTodo(todo: Todo) {
    let todoDto : any = {
      description : todo.description,
      deadline : todo.deadline,
      done : !todo.done
    }
    return this.http.post(this.baseUrl +'/todos/' + todo.id, todo)
  }
}
