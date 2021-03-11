import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AllWidgets, Widget } from './widget-models';

const WIDGETS: AllWidgets  = {
  HELLO_WORLD: {
    name: 'HELLO_WORLD',
    data: {
      name: 'Christian'
    }
  },
  NUMBER: {
    name: 'NUMBER',
    data: {
      label: 'name',
      number: 12
    }
  },
  TODO_LIST: {
    name: 'TODO_LIST',
    data: {
      title: 'Shopping List'
    }
  },
}

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  getAllWidgets(): Observable<Widget[]> {
    return this._fakeFetch(Object.values(WIDGETS))
  }

  getUserWidgets(): Observable<Widget[]> {
    return this._fakeFetch(JSON.parse(localStorage.getItem('widgets') || '[]'))
  }

  private _fakeFetch<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }
}