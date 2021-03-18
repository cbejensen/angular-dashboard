import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AddWidgetDialogComponent } from '../widgets/add-widget-dialog/add-widget-dialog.component';
import { Widget, WidgetGridCoords } from '../widgets/widget-models';

export interface DashboardState extends EntityState<Widget> {}

export const entityAdapter = createEntityAdapter<Widget>();

export const initialState = entityAdapter.getInitialState();

export const { selectAll, selectEntities } = entityAdapter.getSelectors();

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  readonly widgets = this.select(selectAll);

  readonly widgetEntities = this.select(selectEntities);

  constructor(private dialog: MatDialog) {
    super(initialState);
    // sync with local storage
    this.widgets
      .pipe(takeUntil(this.destroy$))
      .subscribe((widgets) =>
        localStorage.setItem('widgets', JSON.stringify(widgets))
      );
  }

  readonly addWidget = this.updater((state, widget: Widget) =>
    entityAdapter.addOne(widget, state)
  );

  readonly removeWidget = this.updater((state, id: string) =>
    entityAdapter.removeOne(id, state)
  );

  readonly updateWidget = this.updater(
    (state, { id, widget }: { id: string; widget: Partial<Widget> }) =>
      entityAdapter.updateOne({ id, changes: widget }, state)
  );

  readonly setWidgets = this.updater((state, widgets: Widget[]) =>
    entityAdapter.setAll(widgets, state)
  );

  // EFFECTS -------------------------------------------------------------------

  readonly openAddWidgetDialog = this.effect(
    (coords: Observable<WidgetGridCoords | undefined>) => {
      return coords.pipe(
        switchMap(({ x, y }: WidgetGridCoords = { x: 0, y: 0 }) =>
          this.dialog
            .open(AddWidgetDialogComponent)
            .afterClosed()
            .pipe(
              filter((widget: Widget) => !!widget),
              tap((widget) =>
                this.addWidget({
                  ...widget,
                  x,
                  y,
                })
              )
            )
        )
      );
    }
  );
}
