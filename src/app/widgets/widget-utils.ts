import { ComponentType, ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { HelloWorldWidgetComponent } from './hello-world-widget/hello-world-widget.component';
import {
  Widget,
  AbstractWidgetComponent,
  WidgetComponentInstance,
  WidgetComponentType,
  WidgetName,
  WIDGET_DATA,
} from './widget-models';
import { WidgetComponentData } from './widget-models';
import { WIDGET_COMPONENTS } from './WIDGET_COMPONENTS';

/**
 * A utility function for creating a widget portal.
 * @param component The component that will be displayed.
 * @param data The data that will be injected into the component.
 */
export function createWidgetPortal<Name extends WidgetName>(
  name: Name,
  data?: WidgetComponentData<WidgetName>
) {
  return new ComponentPortal<WidgetComponentInstance<Name>>(
    WIDGET_COMPONENTS[name] as any, // not sure why `as any` is needed.
    null,
    data
      ? Injector.create({
          providers: [{ provide: WIDGET_DATA, useValue: data, deps: [] }],
        })
      : null
  );
}

// const t = <Name extends WidgetName>(name: Name) => WIDGET_COMPONENTS[name]
// const s = t('HELLO_WORLD');
// new s({ name: 's'})

// const d: WidgetComponentType<'HELLO_WORLD'> = WIDGET_COMPONENTS['HELLO_WORLD'];

// type Hey<N extends WidgetName> = typeof WIDGET_COMPONENTS[N]

// const g = new ComponentPortal<InstanceType<typeof WIDGET_COMPONENTS['HELLO_WORLD']>>(WIDGET_COMPONENTS['HELLO_WORLD'])

// const maker = <T extends WidgetName>(name: T) => new ComponentPortal<WidgetComponentInstance<'HELLO_WORLD'>>(WIDGET_COMPONENTS[name])

// type Test = InstanceType<typeof WIDGET_COMPONENTS['HELLO_WORLD']>
// const test: Test = HelloWorldWidgetComponent;

// type Test2 = WidgetComponentInstance<'HELLO_WORLD'>;

// // type Type = {new (...args: any[]): HelloWorldWidgetComponent}
// type Type = typeof WIDGET_COMPONENTS['HELLO_WORLD'];