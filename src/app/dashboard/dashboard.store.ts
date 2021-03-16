import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { createEntityAdapter } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Widget, WidgetMeta } from '../widgets/widget-models';
import { DashboardState } from './dashboard-models';

export const entityAdapter = createEntityAdapter<WidgetMeta>({
  selectId: (widget) => widget.name,
});

export const initialState = entityAdapter.getInitialState();

export const { selectAll, selectEntities } = entityAdapter.getSelectors();

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  readonly editing = this.select((state) => state.editing);

  readonly allWidgets = this.select((state) => selectAll(state));

  readonly allWidgetEntities = this.select((state) => selectEntities(state));

  readonly selectedWidgets = this.select((state) => state.selectedWidgets);

  constructor() {
    super(
      entityAdapter.getInitialState({
        selectedWidgets: [],
        editing: false,
      })
    );
  }

  readonly setEditing = this.updater((state, editing: boolean) => ({
    ...state,
    editing,
  }));

  readonly toggleEditing = this.updater((state) => {
    console.log(!state.editing);
    return {
      ...state,
      editing: !state.editing,
    };
  });

  readonly setPresetWidgets = this.updater((state, widgets: WidgetMeta[]) =>
    entityAdapter.setAll(widgets, state)
  );

  readonly selectWidget = this.updater((state, widget: Widget) => ({
    ...state,
    selectedWidgets: [...state.selectedWidgets, widget],
  }));

  readonly removeWidget = this.updater((state, index: number) => ({
    ...state,
    selectedWidgets: state.selectedWidgets.filter((_, i) => i !== index),
  }));

  // Should only be called by the corresponding effect below.
  private readonly _setSelectedWidgets = this.updater(
    (state, selectedWidgets: Widget[]) =>
      entityAdapter.upsertMany(
        selectedWidgets.map(({ name, label }) => ({
          name,
          label,
          deprecated: false,
        })),
        {
          ...state,
          selectedWidgets,
        }
      )
  );

  // EFFECTS -------------------------------------------------------------------

  readonly setSelectedWidgets = this.effect(
    (selectedWidgets: Observable<Widget[]>) => {
      return selectedWidgets.pipe(
        tap((widgets) => {
          localStorage.setItem('widgets', JSON.stringify(widgets));
          this._setSelectedWidgets(widgets);
        })
      );
    }
  );

  // getAllWidgets = this.effect(() => {
  //   return this.widgetService.getAllWidgets().pipe(
  //     tapResponse(
  //       (widgets) => entityAdapter.setAll(Object.values(widgets), this.get()),
  //       (error) => {
  //         console.error(error);
  //       }
  //     )
  //   );
  // });
}
