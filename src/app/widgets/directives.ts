import { Directive } from "@angular/core";

@Directive({
  selector: 'fx-widget, [fx-widget], [fxWidget]',
  host: { class: 'fx-widget' }
})
export class WidgetDirective {};