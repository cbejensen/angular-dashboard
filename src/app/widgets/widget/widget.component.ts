import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Injector,
  HostBinding,
} from '@angular/core';
import { Widget, WidgetName, WIDGET_DATA } from '../widget-models';
import { createWidgetPortal } from '../widget-utils';
import { WIDGET_COMPONENTS } from '../WIDGET_COMPONENTS';

@Component({
  selector: 'fx-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @Input() set widget(widget: Widget) {
    if (!widget) {
      this.portal = undefined;
      return;
    }
    this.portal = createWidgetPortal(widget.name, widget.data);
    this.colSpan = `span ${widget.colSpan || 1}`;
    this.rowSpan = `span ${widget.rowSpan || 1}`;
  }

  // @Input() mutable: boolean = false;
  @Input() editing: boolean = false;

  // @Output() select = new EventEmitter();
  // @Output() remove = new EventEmitter();

  @HostBinding('style.grid-column') colSpan: string = 'span 1';
  @HostBinding('style.grid-row') rowSpan: string = 'span 1';

  portal: ComponentPortal<unknown> | undefined;

  constructor() {}

}
