import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../_models/todo';
import { environtment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient)
  baseUrl = environtment.apiUrl

  createTodo(model: any) {
    model.done = false
    return this.http.post(this.baseUrl +'/todos/new', model)
  }

  getTodos() {
    return this.http.get(this.baseUrl +'/todos')
  }

  deleteTodo(id: number) {
    return this.http.delete(this.baseUrl +'/todos/' + id)
  }

  updateTodo(todo: Todo) {
    return this.http.post(this.baseUrl +'/todos/update', [todo])
  }

  updateTodos(todos: Todo[]) {
    return this.http.post(this.baseUrl +'/todos/update', todos)
  }
}
