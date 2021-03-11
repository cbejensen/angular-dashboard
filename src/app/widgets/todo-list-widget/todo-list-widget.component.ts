import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { TodoListService } from 'src/app/todo-list.service';
import { AbstractWidgetComponent, WidgetData, WIDGET_DATA } from '../widget-models';

interface TodoListWidgetData extends WidgetData {
  title: string;
}

@Component({
  selector: 'fx-todo-list-widget',
  templateUrl: './todo-list-widget.component.html',
  styleUrls: ['./todo-list-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListWidgetComponent
  implements AbstractWidgetComponent<TodoListWidgetData> {
  items = this.todoListService.items;

  constructor(
    @Inject(WIDGET_DATA)
    public data: TodoListWidgetData,
    private todoListService: TodoListService
  ) {}

  addItem() {
    this.todoListService.addItem('New Item!');
  }
}
