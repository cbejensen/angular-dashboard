import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { createEntityAdapter } from '@ngrx/entity';
import { Widget } from '../widgets/widget-models';
import { DashboardState } from './dashboard-models';

export const entityAdapter = createEntityAdapter<Widget>({
  selectId: (widget) => widget.name,
});

export const initialState = entityAdapter.getInitialState();

export const { selectAll, selectEntities } = entityAdapter.getSelectors();

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  readonly editing = this.select((state) => state.editing);

  readonly allWidgets = this.select((state) => selectAll(state));

  readonly allWidgetEntities = this.select((state) => selectEntities(state));

  readonly userWidgets = this.select((state) => state.userWidgets);

  constructor() {
    super(
      entityAdapter.getInitialState({
        userWidgets: [],
        editing: false,
      })
    );
  }

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

  readonly setEditing = this.updater((state, editing: boolean) => ({
    ...state,
    editing,
  }));

  readonly toggleEditing = this.updater((state) => {
    console.log(!state.editing)
    return ({
      ...state,
      editing: !state.editing,
    });
  });

  readonly setAllWidgets = this.updater((state, widgets: Widget[]) =>
    entityAdapter.setAll(widgets, state)
  );

  readonly addWidget = this.updater((state, widget: Widget) => ({
    ...state,
    userWidgets: [...state.userWidgets, widget],
  }));

  readonly removeWidget = this.updater((state, index: number) => ({
    ...state,
    userWidgets: state.userWidgets.filter((_, i) => i !== index),
  }));
}
