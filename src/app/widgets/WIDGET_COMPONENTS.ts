import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { HelloWorldWidgetComponent } from './hello-world-widget/hello-world-widget.component';
import { NumberWidgetComponent } from './number-widget/number-widget.component';
import { TodoListWidgetComponent } from './todo-list-widget/todo-list-widget.component';

/**
 * For a component to be used as a widget, it must be registered here.
 *
 * TODO: Place this somewhere that components can't directly get it. They
 * should be using the injection token above.
 */
export const WIDGET_COMPONENTS = {
  HELLO_WORLD: <WidgetComponentMeta<HelloWorldWidgetComponent>>{
    component: HelloWorldWidgetComponent,
    defaultGridSize: [1, 1],
    defaultData: {
      name: 'sdf',
    },
  },
  NUMBER: <WidgetComponentMeta<NumberWidgetComponent>>{
    component: NumberWidgetComponent,
    defaultGridSize: [1, 1],
    defaultData: {
      number: 42,
    },
  },
  TODO_LIST: <WidgetComponentMeta<TodoListWidgetComponent>>{
    component: TodoListWidgetComponent,
    defaultGridSize: [1, 3],
    defaultData: {
      items: ['Contact Ashley', 'File report'],
    },
  },
};

/**
 * The injection token used to provide abstract data to a widget component.
 */
 export const WIDGET_COMPONENTS_TOKEN = new InjectionToken<WidgetComponents>(
  'WIDGET_COMPONENTS_TOKEN'
);

export type WidgetComponents = typeof WIDGET_COMPONENTS;

export type WidgetComponentGridSize = [number, number];

interface WidgetComponentMeta<Component> {
  component: ComponentType<Component>;

  /**
   * [columns, rows]
   */
  defaultGridSize: WidgetComponentGridSize;

  defaultData: Component extends { data: any } ? Component['data'] : Component;
}
