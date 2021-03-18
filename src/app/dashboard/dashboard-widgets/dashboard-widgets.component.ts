import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TrackByFunction,
  ContentChild,
  ViewChild,
} from '@angular/core';
import { GridsterComponent, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Widget } from 'src/app/widgets/widget-models';
import { WidgetService } from 'src/app/widgets/widget.service';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetsComponent {
  @Input('widgets') set setWidgets(widgets: Widget[]) {
    this.store.setWidgets(widgets || []) 
  }

  @ViewChild(GridsterComponent) gridsterComponent: GridsterComponent | undefined;

  widgets = this.store.widgets;

  config: GridsterConfig = {
    resizable: { enabled: true },
    draggable: { enabled: true, ignoreContent: true },
    // @ts-ignore
    itemChangeCallback: (widget: Widget) => this._updateStore(widget),
    pushItems: true,
    compactType: 'compactLeft&Up',
    gridType: 'verticalFixed',
    fixedRowHeight: 200,
    maxCols: 4,
    margin: 16,
    mobileBreakpoint: 700,
    keepFixedHeightInMobile: true,
    scrollToNewItems: true,
    // outerMargin: false
  };

  constructor(private store: DashboardStore) { }

  removeWidget(id: string) {
    this.store.removeWidget(id);
  }

  trackById: TrackByFunction<Widget> = (index, widget) => widget.id;

  private _updateStore({ id, ...widget }: Widget) {
    this.store.updateWidget({ id, widget });
  }
}
