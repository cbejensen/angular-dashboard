import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddWidgetDialogComponent } from 'src/app/widgets/add-widget-dialog/add-widget-dialog.component';
import { Widget, WidgetGridArea } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetsComponent {
  widgets = this.store.widgets;

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setWidgets(widgets || []);
  }

  private _destroyed = new Subject();

  constructor(private store: DashboardStore) {}

  openAddWidgetDialog({ x, y }: WidgetGridArea) {
    this.store.openAddWidgetDialog({ x, y });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
