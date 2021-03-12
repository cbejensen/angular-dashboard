import { InjectionToken, TemplateRef } from '@angular/core';
import { widgetDictionary } from './widget-data';
import { GridsterItem } from 'angular-gridster2';

/**
 * The injection token used to provide the widget dictionary.
 */
export const WIDGET_DICTIONARY = new InjectionToken<any>('WIDGET_DICTIONARY');

/**
 * The injection token used to provide data to a widget component.
 */
export const WIDGET_DATA = new InjectionToken<any>('WIDGET_DATA');

/**
 * Every possible widget name. These names have a 1:1 ratio with widget
 * components; that is, each name can only be assigned to one component.
 */
export type WidgetName = 'HELLO_WORLD' | 'NUMBER' | 'TODO_LIST';

/**
 * An arbitrary UI with a unique name, designed to be used in a grid.
 */
export interface Widget<Name extends WidgetName = WidgetName> {
  /**
   * The unique name of the widget that should be rendered. Note that, although
   * the name is unique to a specific widget component, that widget can be
   * rendered multiple times.
   */
  name: Name;

  /**
   * A custom label that overrides the widget component's label.
   */
  label?: string;

  /**
   * Where this widget should appear on the grid.
   */
  coordinates: Pick<GridsterItem, 'x' | 'y' | 'rows' | 'cols'>;

  /**
   * Any abstract data required by the component.
   */
  data?: WidgetComponentData<Name> | undefined;
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
 * The interface that every widget component should implement.
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
 * Utility type for getting a widget component type from a widget name.
 */
export type WidgetComponentType<
  Name extends WidgetName
> = typeof widgetDictionary[Name]['component'];

/**
 * Utility type for getting a widget component instance from a widget name.
 */
export type WidgetComponentInstance<Name extends WidgetName> = InstanceType<
  WidgetComponentType<Name>
>;

/**
 * Utility type for getting a widget's data type from a widget name.
 */
export type WidgetComponentData<
  Name extends WidgetName
> = WidgetComponentInstance<Name> extends { data: WidgetData }
  ? WidgetComponentInstance<Name>['data']
  : undefined;
