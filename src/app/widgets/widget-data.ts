import { ComponentType } from "@angular/cdk/portal";
import { InjectionToken } from "@angular/core";
import { HelloWorldWidgetComponent } from "./hello-world-widget/hello-world-widget.component";
import { NumberWidgetComponent } from "./number-widget/number-widget.component";
import { TodoListWidgetComponent } from "./todo-list-widget/todo-list-widget.component";
import { WidgetName } from "./widget-models";

 
// Purposefully left untyped since doing so hinders type checking elsewhere.
export const widgetDictionary = {
  HELLO_WORLD: {
    component: HelloWorldWidgetComponent,
    label: 'Hello World'
  },
  NUMBER: {
    component: NumberWidgetComponent,
    label: 'Number'
  },
  TODO_LIST: {
    component: TodoListWidgetComponent,
    label: 'To-Do List'
  },
};