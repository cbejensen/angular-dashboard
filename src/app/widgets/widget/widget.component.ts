import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Widget, WidgetComponentInstance, WidgetName } from '../widget-models';
import { createWidgetPortal } from '../widget-utils';

export interface UiWidget<Name extends WidgetName = WidgetName> extends Widget<Name> {
  portal: ComponentPortal<WidgetComponentInstance<Name>>
}

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

  private _w: Observable<Widget> = new Subject();
  w: Observable<UiWidget> = this._w.pipe(
    map(widget => ({...widget, portal: createWidgetPortal(widget?.name, widget?.data)}))
  )

  @Input() editing: boolean = false;

  portal: ComponentPortal<unknown> | undefined;

  constructor() {}

  private _handleWidgetUpdate(widget: Widget | undefined) {
    if (!widget) {
      this.portal = undefined;
      return;
    }
    this.portal = createWidgetPortal(widget.name, widget.data);
  }

}
