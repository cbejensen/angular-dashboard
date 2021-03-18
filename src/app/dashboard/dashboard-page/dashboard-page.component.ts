import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetService } from 'src/app/widgets/widget.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {

  widgets = this.widgetService.getUserWidgets();

  constructor(private widgetService: WidgetService) { }

}
