import { Component, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Widget } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'fx-dashboard-widget-list',
  templateUrl: './dashboard-widget-list.component.html',
  styleUrls: ['./dashboard-widget-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetListComponent implements OnDestroy {
  
  config: GridsterConfig = {
    pushItems: true,
    compactType: 'compactUp',
    gridType: 'verticalFixed',
    margin: 16,
  };

  widgets = this.store.allWidgets;

  editing = this.store.editing.pipe(
    tap(editing => {
      this._editing = editing;
      this._updateConfig(editing);
    }),
  );

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setAllWidgets(widgets || []);
  }

  @HostBinding('class.editing') private _editing = false;

  private _destroyed = new Subject();

  constructor(private store: DashboardStore, private cd: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit() {
    this.config.emptyCellClickCallback = (_, gridArea) => {
      console.log(gridArea);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _updateConfig(editing: boolean) {
    this.config.resizable = { enabled: editing }
    this.config.draggable = { enabled: editing }
    this.config.displayGrid = editing ? 'always' : 'none';
    this.config.enableEmptyCellClick = editing;
    this.config.emptyCellClickCallback = editing ? this._emptyCellClickCallback : undefined;
    // Tell Gridster the config has changed.
    this.config.api?.optionsChanged?.();
    // Tell Angular the view should update.
    this.cd.detectChanges();
  }

  private _emptyCellClickCallback(_: MouseEvent, item: GridsterItem) {
    // this.dialog.open()
  }
}
