import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoListService {

  private _items = new BehaviorSubject<string[]>([
    'Get bacon',
    'Be smarter'
  ])
  items = this._items.asObservable();

  addItem(item: string) {
    this._items.next([...this._items.value, item])
  }

}
