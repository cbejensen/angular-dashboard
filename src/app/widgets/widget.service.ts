import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AllWidgets, Widget } from './widget-models';

const WIDGETS: AllWidgets  = {
  HELLO_WORLD: {
    name: 'HELLO_WORLD',
    label: 'Hello Christian',
    data: {
      name: 'Christian'
    },
    coordinates: {
      x: 1,
      y: 1,
      cols: 1,
      rows: 1,
    }
  },
  NUMBER: {
    name: 'NUMBER',
    label: 'Just a random number',
    data: {
      label: 'name',
      number: 12
    },
    coordinates: {
      x: 1,
      y: 2,
      cols: 2,
      rows: 1
    }
  },
  TODO_LIST: {
    name: 'TODO_LIST',
    label: 'Shopping List',
    data: {
      title: 'Shopping List'
    },
    coordinates: {
      x: 4,
      y: 1,
      cols: 1,
      rows: 4
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