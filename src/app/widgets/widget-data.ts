import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { InjectionToken } from "@angular/core";
import { HelloWorldWidgetComponent } from "./hello-world-widget/hello-world-widget.component";
import { NumberWidgetComponent } from "./number-widget/number-widget.component";
import { TodoListWidgetComponent } from "./todo-list-widget/todo-list-widget.component";
import { AbstractWidgetComponent } from "./widget-models";
 
/**
 * Every possible widget name and their corresponding components.
 * 
 * All names are unique. All components should probably be unique too; you could
 * hypothetically assign a component to multiple names, but it's probably not
 * the best way to do what you're wanting.
 */
 export const widgetComponents = {
  HELLO_WORLD: HelloWorldWidgetComponent,
  NUMBER: NumberWidgetComponent,
  TODO_LIST: TodoListWidgetComponent,
} as const;