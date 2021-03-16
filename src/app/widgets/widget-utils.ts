import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { HelloWorldWidgetComponent } from './hello-world-widget/hello-world-widget.component';
import {
  WidgetComponentInstance,
  WidgetName,
  WIDGET_DATA,
} from './widget-models';
import { WidgetComponentData } from './widget-models';
import { WIDGET_COMPONENTS } from './WIDGET_COMPONENTS';

/**
 * A utility function that gets a component constructor function (not an 
 * instance) based on a provided name.
 * @param name The unique widget name that maps to the desired component.
 * @returns The component constructor function.
 */
export function getWidgetComponent<Name extends WidgetName>(
  name: Name
): typeof WIDGET_COMPONENTS[Name]['component'] {
  return WIDGET_COMPONENTS[name].component;
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