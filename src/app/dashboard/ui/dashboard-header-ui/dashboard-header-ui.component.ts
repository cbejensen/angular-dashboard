import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'fx-dashboard-header-ui',
  templateUrl: './dashboard-header-ui.component.html',
  styleUrls: ['./dashboard-header-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderUiComponent implements OnInit {
  @Output() toggleEditing = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  i = Injector.create({
    providers: []
  })

}
