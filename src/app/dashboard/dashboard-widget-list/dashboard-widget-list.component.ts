import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Widget } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';
import { GridsterConfig } from 'angular-gridster2';

@Component({
  selector: 'fx-dashboard-widget-list',
  templateUrl: './dashboard-widget-list.component.html',
  styleUrls: ['./dashboard-widget-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetListComponent {
  options: GridsterConfig = {
    resizable: { enabled: true },
    draggable: { enabled: true },
    itemChangeCallback: (i, g) => {
      console.log(i, g);
    },
    pushItems: true,
    compactType: 'compactUp',
    gridType: 'verticalFixed',
    fixedColWidth: 200,
    fixedRowWidth: 200,
    margin: 16,
    outerMargin: false
  };

  widgets = this.store.allWidgets;

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setAllWidgets(widgets || []);
  }

  constructor(private store: DashboardStore) {}
}
