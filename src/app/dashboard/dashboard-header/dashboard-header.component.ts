import { Component, ChangeDetectionStrategy, HostBinding,} from '@angular/core';
import { tap } from 'rxjs/operators';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {

  constructor(private store: DashboardStore) { }

  openAddWidgetDialog() {
    this.store.openAddWidgetDialog(undefined);
  };

}
