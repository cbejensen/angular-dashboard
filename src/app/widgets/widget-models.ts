import { InjectionToken, TemplateRef } from '@angular/core';
import { WIDGET_COMPONENTS } from './WIDGET_COMPONENTS';
import { GridsterItem } from 'angular-gridster2';

// REMOVE ME
interface MetaEntity {
  name: string;
  label: string;
  deprecated: boolean;
}

/**
 * The injection token used to provide a mobile breakpoint for the grid.
 */
export const WIDGET_GRID_BREAKPOINT = new InjectionToken<number>(
  'WIDGET_GRID_BREAKPOINT'
);

/**
 * The injection token used to provide abstract data to a widget component.
 */
export const WIDGET_DATA = new InjectionToken<WidgetData>('WIDGET_DATA');

/**
 * Represents all the unique names for widgets.
 */
export type WidgetName = keyof typeof WIDGET_COMPONENTS;

/**
 * Forces all widget data to be an object. Useful for readability and
 * consistency.
 */
export type WidgetData = Record<string, any>;

/**
 * The coordinates and size of a widget on the grid.
 */
export type WidgetGridArea = Pick<GridsterItem, 'x' | 'y' | 'rows' | 'cols'>;

/**
 * Metadata about a particular widget.
 */
export interface WidgetMeta<Name extends WidgetName = WidgetName>
  extends MetaEntity {
  name: Name;
}

/**
 * Utility type for getting a widget component's constructor function.
 */
export type WidgetComponentType<
  Name extends WidgetName
> = typeof WIDGET_COMPONENTS[Name]['component'];

/**
 * Utility type for getting a widget component instance.
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

export interface WidgetComponentMetaEntity<Name extends WidgetName> {
  component: WidgetComponentType<Name>;
  defaultSize: [number, number];
  defaultData: WidgetComponentData<Name>;
}

/**
 * Think of this as an actual instance of a widget. This is what can be updated
 * and saved by the user.
 */
export interface Widget<Name extends WidgetName = WidgetName> {
  /**
   * The unique name corresponding to the component that should be rendered.
   */
  name: Name;

  /**
   * The user-friendly text used to identify this widget.
   */
  label: string;

  /**
   * Where this widget should appear on the grid.
   */
  gridArea: WidgetGridArea;

  /**
   * Any abstract data required by this widget's component.
   */
  data?: WidgetComponentData<Name> | undefined;
}

/**
 * An interface that widget components can implement.
 */
export interface AbstractWidgetComponent<Data extends WidgetData = {}> {
  /**
   * Anything the component needs from an external source.
   */
  data?: Data;

  /**
   * If this property is present (not undefined), this widget will be considered
   * mutable. The containing component will then pass down a boolean as an input
   * with the same name to indicate whether this component should be in edit
   * mode or not. Because of this, the component should decorate this prop with
   * as an `@Input()`.
   */
  editing?: boolean;
}
