import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AddWidgetDialogComponent } from '../widgets/add-widget-dialog/add-widget-dialog.component';
import { Widget, WidgetGridArea } from '../widgets/widget-models';

export interface DashboardState {
  widgets: Widget[];
  // editing: boolean;
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  readonly widgets = this.select((state) => state.widgets);

  constructor(private dialog: MatDialog) {
    super({
      widgets: [],
    });
  }

  // readonly setEditing = this.updater((state, editing: boolean) => ({
  //   ...state,
  //   editing,
  // }));

  // readonly toggleEditing = this.updater((state) => {
  //   console.log(!state.editing);
  //   return {
  //     ...state,
  //     editing: !state.editing,
  //   };
  // });

  readonly addWidget = this.updater((state, widget: Widget) => ({
    ...state,
    widgets: [...state.widgets, widget],
  }));

  readonly removeWidget = this.updater((state, index: number) => ({
    ...state,
    widgets: state.widgets.filter((_, i) => i !== index),
  }));

  // Should only be called by the corresponding effect below.
  private readonly _setWidgets = this.updater((state, widgets: Widget[]) => ({
    ...state,
    widgets,
  }));

  // EFFECTS -------------------------------------------------------------------

  readonly setWidgets = this.effect((widgets: Observable<Widget[]>) => {
    return widgets.pipe(
      tap((widgets) => {
        localStorage.setItem('widgets', JSON.stringify(widgets));
        this._setWidgets(widgets);
      })
    );
  });

  readonly openAddWidgetDialog = this.effect(
    (coords: Observable<Pick<WidgetGridArea, 'x' | 'y'> | undefined>) => {
      return coords.pipe(
        switchMap(
          ({ x, y }: Pick<WidgetGridArea, 'x' | 'y'> = { x: 0, y: 0 }) =>
            this.dialog
              .open(AddWidgetDialogComponent)
              .afterClosed()
              .pipe(
                filter((widget: Widget) => !!widget),
                tap((widget) =>
                  this.addWidget({
                    ...widget,
                    gridArea: { ...widget.gridArea, x, y },
                  })
                )
              )
        )
      );
    }
  );
}
