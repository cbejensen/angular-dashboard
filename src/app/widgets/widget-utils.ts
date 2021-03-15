import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import {
  WidgetComponentInstance,
  WidgetName,
  WIDGET_DATA,
} from './widget-models';
import { WidgetComponentData } from './widget-models';
import { widgetComponents } from './widget-data';

export function getWidgetComponent<Name extends WidgetName>(
  name: Name
): typeof widgetComponents[Name] {
  return widgetComponents[name];
}

/**
 * A utility function for creating a widget portal.
 * @param component The component that will be displayed.
 * @param data The data that will be injected into the component.
 */
export function createWidgetPortal<Name extends WidgetName>(
  name: Name,
  data?: WidgetComponentData<Name>
): ComponentPortal<WidgetComponentInstance<Name>> {
  const component = getWidgetComponent(name);
  if (component === undefined) {
    throw new Error(`No component is registered with name ${name}`);
  }
  return new ComponentPortal<WidgetComponentInstance<Name>>(
    component as any, // Can't get this typing to work properly!
    null,
    data
      ? Injector.create({
          providers: [{ provide: WIDGET_DATA, useValue: data, deps: [] }],
        })
      : null
  );
}