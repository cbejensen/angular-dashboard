import { Component, OnInit, ChangeDetectionStrategy, Inject, Optional } from '@angular/core';
import { AbstractWidgetComponent, WIDGET_DATA } from '../widget-models';

export interface HelloWorldWidgetData {
  name: string;
}

@Component({
  selector: 'fx-hello-world-widget',
  templateUrl: './hello-world-widget.component.html',
  styleUrls: ['./hello-world-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloWorldWidgetComponent implements AbstractWidgetComponent<HelloWorldWidgetData> {

  static hello = 'hey'

  constructor(@Optional() @Inject(WIDGET_DATA) public data: HelloWorldWidgetData) { }

}