import { Component, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Widget } from 'src/app/widgets/widget-models';
import { DashboardStore } from '../dashboard.store';
import { GridsterConfig } from 'angular-gridster2';
import { Subject } from 'rxjs';

const defaultConfig: GridsterConfig = {
  resizable: { enabled: false },
  draggable: { enabled: false },
  itemChangeCallback: undefined,
  displayGrid: 'none',
  pushItems: true,
  compactType: 'compactUp',
  gridType: 'verticalFixed',
  fixedColWidth: 200,
  fixedRowWidth: 200,
  margin: 16,
  outerMargin: false,
};

const editingConfig: GridsterConfig = {
  resizable: { enabled: true },
  draggable: { enabled: true },
  itemChangeCallback: (i, g) => {
    console.log(i, g);
  },
  displayGrid: 'always'
}

@Component({
  selector: 'fx-dashboard-widget-list',
  templateUrl: './dashboard-widget-list.component.html',
  styleUrls: ['./dashboard-widget-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetListComponent implements OnDestroy {
  
  private _config: GridsterConfig = defaultConfig;
  public get config(): GridsterConfig {
    return this._config;
  }
  public set config(config: GridsterConfig) {
    this._config = config;
    config.api?.optionsChanged?.();
    this.cd.detectChanges();
  }

  widgets = this.store.allWidgets;

  editing = this.store.editing.pipe(
    tap(editing => {
      this.config = editing ? editingConfig : defaultConfig;
    }),
  );

  @Input('widgets') set setWidgets(widgets: Widget[] | null) {
    this.store.setAllWidgets(widgets || []);
  }

  private _destroyed = new Subject();

  constructor(private store: DashboardStore, private cd: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
