import { Directive } from "@angular/core";

@Directive({
  selector: 'fx-dashboard-header, [fx-dashboard-header], [fxDashboardHeader]',
  host: { class: 'fx-dashboard-header' }
})
export class DashboardHeaderDirective {};