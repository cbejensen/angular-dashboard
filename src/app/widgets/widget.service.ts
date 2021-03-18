import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';
import { WidgetMeta, Widget, WidgetName } from './widget-models';

const helloWorldWidgetMeta: WidgetMeta<'HELLO_WORLD'> = {
  name: 'HELLO_WORLD',
  label: 'Hello World',
  deprecated: false,
}

const numberWidgetMeta: WidgetMeta<'NUMBER'> = {
  name: 'NUMBER',
  label: 'Number',
  deprecated: false,
}

const todoListWidgetMeta: WidgetMeta<'TODO_LIST'> = {
  name: 'TODO_LIST',
  label: 'To-Do List',
  deprecated: false,
}

// For testing
const deprecatedWidgetMeta = {
  name: 'HELLO_WORLD' as WidgetName,
  label: 'Deprecated',
  deprecated: true
}

const WIDGET_META: WidgetMeta[]  = [
  helloWorldWidgetMeta,
  numberWidgetMeta,
  todoListWidgetMeta,
  deprecatedWidgetMeta
]


@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private _widgetMeta = this._fakeFetch(WIDGET_META).pipe(
    shareReplay({
      bufferSize: 1,
      refCount: false
    })
  )

  getWidgetMeta(): Observable<WidgetMeta[]> {
    return this._widgetMeta;
  }

  getUserWidgets(): Observable<Widget[]> {
    const widgets = localStorage.getItem('widgets');
    return widgets ? this._fakeFetch(JSON.parse(widgets)) : of([]);
  }

  private _fakeFetch<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }
}