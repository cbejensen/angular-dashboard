import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Injector, Input } from '@angular/core';

@Component({
  selector: 'fx-dashboard-header-ui',
  templateUrl: './dashboard-header-ui.component.html',
  styleUrls: ['./dashboard-header-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderUiComponent implements OnInit {
  @Input() editing: boolean | null = false;
  
  @Output() toggleEditing = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
