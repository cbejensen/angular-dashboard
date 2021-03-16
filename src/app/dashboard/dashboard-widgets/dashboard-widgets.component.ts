import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddWidgetDialogComponent } from 'src/app/widgets/add-widget-dialog/add-widget-dialog.component';
import { Widget, WidgetGridArea } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';

@Component({
  selector: 'fx-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWidgetsComponent {

  widgets = this.store.selectedWidgets;

  editing = this.store.editing;

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setSelectedWidgets(widgets || []);
  }

  private _destroyed = new Subject();

  constructor(private store: DashboardStore, private dialog: MatDialog) { }

  openWidgetsDialog(area: WidgetGridArea) {
    this.dialog.open(AddWidgetDialogComponent).afterClosed().pipe(
      takeUntil(this._destroyed)
    ).subscribe(widget => {
      console.log(widget);
      this.store.selectWidget(widget);
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

}
