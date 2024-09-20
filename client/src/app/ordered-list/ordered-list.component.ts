import { Component } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ordered-list',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './ordered-list.component.html',
  styleUrl: './ordered-list.component.css'
})
export class OrderedListComponent {
  listItems = [
    'Esimene asi',
    'Teine asi'
  ]

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listItems, event.previousIndex, event.currentIndex)
  }
}
