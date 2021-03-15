import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WidgetMeta, Widget, WidgetName } from './widget-models';

const helloWorldWidgetMeta: WidgetMeta<'HELLO_WORLD'> = {
  name: 'HELLO_WORLD',
  label: 'Hello World',
  deprecated: false,
  data: {
    name: 'YOUR NAME HERE'
  }
}

const numberWidgetMeta: WidgetMeta<'NUMBER'> = {
  name: 'NUMBER',
  label: 'Number',
  deprecated: false,
  data: {
    label: 'Unread',
    number: 12,
  }
}

const todoListWidgetMeta: WidgetMeta<'TODO_LIST'> = {
  name: 'TODO_LIST',
  label: 'To-Do List',
  deprecated: false,
  data: {
    items: ['Contact Ashley', 'File report']
  }
}

const WIDGET_META: WidgetMeta[]  = [
  helloWorldWidgetMeta,
  numberWidgetMeta,
  todoListWidgetMeta
]

const DEFAULT_USER_WIDGETS: Widget[] = [
  {
    name: 'HELLO_WORLD',
    label: 'Hello World',
    data: {
      name: 'Christian'
    },
    gridArea: {
      x: 1,
      y: 1,
      cols: 1,
      rows: 1,
    }
  },
  {
    name: 'NUMBER',
    label: 'Just some random number',
    data: {
      label: 'name',
      number: Math.floor(Math.random() * 100)
    },
    gridArea: {
      x: 1,
      y: 2,
      cols: 2,
      rows: 1
    }
  },
  {
    name: 'TODO_LIST',
    label: 'Shopping List',
    data: {
      title: 'Shopping List',
      items: [
        'Bread',
        ''
      ]
    },
    gridArea: {
      x: 4,
      y: 1,
      cols: 1,
      rows: 4
    }
  },
]

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  getWidgetMeta(): Observable<WidgetMeta[]> {
    return this._fakeFetch(WIDGET_META)
  }

  getUserWidgets(): Observable<Widget[]> {
    const widgets = localStorage.getItem('widgets');
    return widgets ? this._fakeFetch(JSON.parse(widgets)) : of(DEFAULT_USER_WIDGETS);
  }

  private _fakeFetch<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }
}