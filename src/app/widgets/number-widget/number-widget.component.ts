import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { AbstractWidgetComponent } from '../widget-models';
import { WIDGET_DATA } from '../widget-models';


export interface NumberWidgetData {
  label: string;
  number: number;
}

@Component({
  selector: 'fx-number-widget',
  templateUrl: './number-widget.component.html',
  styleUrls: ['./number-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberWidgetComponent implements AbstractWidgetComponent<NumberWidgetData> {

  label = 'Number'

  constructor(@Inject(WIDGET_DATA) public data: NumberWidgetData) { }

}
