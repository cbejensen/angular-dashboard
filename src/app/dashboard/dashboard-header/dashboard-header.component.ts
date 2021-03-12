import { Component, ChangeDetectionStrategy, Output, Input } from '@angular/core';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {

  editing = this.store.editing;

  constructor(private store: DashboardStore) { }

  toggleEditing = this.store.toggleEditing;

}
