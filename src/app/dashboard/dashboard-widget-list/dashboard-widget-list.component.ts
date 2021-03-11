import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Widget } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-widget-list',
  templateUrl: './dashboard-widget-list.component.html',
  styleUrls: ['./dashboard-widget-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWidgetListComponent {
  
  widgets = this.store.allWidgets

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setAllWidgets(widgets || []);
  }

  constructor(private store: DashboardStore) { }

}
