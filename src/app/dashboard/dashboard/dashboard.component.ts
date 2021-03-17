import { Component, OnInit, ChangeDetectionStrategy, ContentChild, ViewEncapsulation, Input } from '@angular/core';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
  providers: [DashboardStore]
})
export class DashboardComponent {

  constructor(private store: DashboardStore) {}
}
