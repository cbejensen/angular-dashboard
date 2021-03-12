import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  Inject,
} from '@angular/core';
import { Widget } from '../widget-models';
import { createWidgetPortal } from '../widget-utils';

@Component({
  selector: 'fx-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @Input() set widget(widget: Widget | undefined) {
    this._widget = widget;
    this._handleWidgetUpdate(widget);
  }
  get widget(): Widget | undefined {
    return this._widget;
  }
  private _widget: Widget | undefined;

  @Input() editing: boolean = false;

  portal: ComponentPortal<unknown> | undefined;

  // constructor(@Inject(WIDGET_DICTIONARY) private widgetDictionary: {}) {}

  private _handleWidgetUpdate(widget: Widget | undefined) {
    if (!widget) {
      this.portal = undefined;
      return;
    }
    this.portal = createWidgetPortal(widget.name, widget.data);
    // this.label = this.widgetDictionary[widget.name].label;
  }

}
