import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { AbstractWidgetComponentWithData } from '../widget-models';
import { WIDGET_DATA } from '../widget-models';

export interface NumberWidgetData {
  number: number;
}

@Component({
  selector: 'fx-number-widget',
  templateUrl: './number-widget.component.html',
  styleUrls: ['./number-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberWidgetComponent implements AbstractWidgetComponentWithData<NumberWidgetData> {

  constructor(@Inject(WIDGET_DATA) public data: NumberWidgetData) { }

}
