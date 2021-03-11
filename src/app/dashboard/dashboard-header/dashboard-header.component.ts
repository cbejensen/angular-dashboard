import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {

  constructor(private store: DashboardStore) { }

  toggleEditing() {
    this.store.toggleEditing();
  }

}
