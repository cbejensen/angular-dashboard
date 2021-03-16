import { Directive } from "@angular/core";

@Directive({
  selector: 'fx-dashboard-header, [fx-dashboard-header], [fxDashboardHeader]',
  host: { class: 'fx-dashboard-header' }
})
export class DashboardHeaderDirective {};

@Directive({
  selector: 'fx-widget-grid, [fx-widget-grid], [fxDashboardwidget-grid]',
  host: { class: 'fx-widget-grid' }
})
export class DashboardWidgetListDirective {};