import { Component, OnInit, ChangeDetectionStrategy, ContentChild, ViewEncapsulation, Input } from '@angular/core';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardStore],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @Input() set editing(editing: boolean) {
    this.store.setEditing(editing);
  }

  constructor(private store: DashboardStore) { }

  ngOnInit(): void {
  }

}
