import { InjectionToken, TemplateRef } from '@angular/core';
import { WIDGET_COMPONENTS } from './WIDGET_COMPONENTS';

export type WidgetName = 'HELLO_WORLD' | 'NUMBER' | 'TODO_LIST';

/**
 * The injection token used to pass data into a widget component.
 */
export const WIDGET_DATA = new InjectionToken<any>('WidgetData');

/**
 * An arbitrary UI with a unique name, designed to be used in a grid.
 */
export interface Widget<Name extends WidgetName = WidgetName> {
  name: Name;
  data?: WidgetComponentData<Name> | undefined;
  colSpan?: number;
  rowSpan?: number;
}

/**
 * Forces all widget data to be an object. Useful for readability and
 * consistency.
 */
export type WidgetData = Record<string, any>;

/**
 * All possible widgets to choose from.
 */
export type AllWidgets = { [Name in WidgetName]: Widget<Name> };

/**
 * The interface that a widget can implement.
 */
export interface AbstractWidgetComponent<Data extends WidgetData> {
  /**
   * Anything the component needs from an external source.
   */
  data?: Data;

  /**
   * A reference to some UI that allows the user to edit this widget.
   */
  settingsTemplate?: TemplateRef<unknown>;

  /**
   * The ideal number of columns this widget should span.
   */
  defaultColumns?: number;

  /**
   * The ideal number of rows this widget should span.
   */
  defaultRows?: number;
}

/**
 * Helper type for getting a widget component type from a widget name.
 */
export type WidgetComponentType<
  Name extends WidgetName
> = typeof WIDGET_COMPONENTS[Name];

/**
 * Helper type for getting a widget component instance from a widget name.
 */
export type WidgetComponentInstance<Name extends WidgetName> = InstanceType<
  WidgetComponentType<Name>
>;

/**
 * Helper type for getting a widget's data type from a widget name.
 */
export type WidgetComponentData<
  Name extends WidgetName
> = WidgetComponentInstance<Name> extends { data: WidgetData }
  ? WidgetComponentInstance<Name>['data']
  : undefined;
