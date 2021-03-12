import { Directive } from "@angular/core";

@Directive({
  selector: 'fx-dashboard-header, [fx-dashboard-header], [fxDashboardHeader]',
  host: { class: 'fx-dashboard-header' }
})
export class DashboardHeaderDirective {};

@Directive({
  selector: 'fx-dashboard-widget-list, [fx-dashboard-widget-list], [fxDashboardwidget-list]',
  host: { class: 'fx-dashboard-widget-list' }
})
export class DashboardWidgetListDirective {};