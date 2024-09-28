import { Component, Directive, ElementRef, EventEmitter, HostListener, input, OnInit, Output, output, ViewChild } from '@angular/core';
import { Todo } from '../_models/todo';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import { NgClass, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatCheckboxModule, MatDividerModule, NgIf, FormsModule, DragDropModule, NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent{
 
  todoData = input.required<Todo>()

  onDelete = output<number>()
  onToggleDone = output<Todo>()
  onDataChanged = output<Todo>()
  onEndEdit = output<number>();


  line: any;


  toggleDone() : void {
    this.onToggleDone.emit(this.todoData())
  }

  delete() {
    this.onDelete.emit(this.todoData().id)
  }

  endEdit(elem: HTMLDivElement) {
    elem.blur()
    this.onEndEdit.emit(this.todoData().sequenceNumber);
    if (this.todoData().description != elem.textContent && elem.textContent != null) {
      this.onDataChanged.emit(
        {
          id: this.todoData().id,
          description: elem.textContent,
          deadline: this.todoData().deadline,
          done: this.todoData().done,
          sequenceNumber: this.todoData().sequenceNumber
        })
      }
    }
    
  log(info : any) {
    console.log(info)  
  }
}