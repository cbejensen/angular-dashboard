import { HelloWorldWidgetComponent } from "./hello-world-widget/hello-world-widget.component";
import { NumberWidgetComponent } from "./number-widget/number-widget.component";
import { TodoListWidgetComponent } from "./todo-list-widget/todo-list-widget.component";

export const WIDGET_COMPONENTS = {
  HELLO_WORLD: HelloWorldWidgetComponent,
  NUMBER: NumberWidgetComponent,
  TODO_LIST: TodoListWidgetComponent,
} as const;
