import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetService } from 'src/app/widgets/widget.service';

@Component({
  selector: 'fx-dashboard-container',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainer {

  widgets = this.widgetService.getAllWidgets();

  constructor(private widgetService: WidgetService) { }

}
