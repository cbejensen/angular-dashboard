import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ViewChild,
  ComponentRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractWidgetComponent, Widget, WidgetComponentInstance, WidgetName } from '../widget-models';
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

  @Input() @HostBinding('class.editing') editing = false;

  @Output() edit = new EventEmitter();

  @ViewChild(CdkPortalOutlet) cdkPortalOutlet: CdkPortalOutlet | undefined;

  portal: ComponentPortal<unknown> | undefined;

  mutable = false;

  private get widgetComponentInstance(): AbstractWidgetComponent | undefined {
    return (this.cdkPortalOutlet?.attachedRef as ComponentRef<AbstractWidgetComponent>)?.instance;
  }

  constructor() {}

  ngAfterViewInit() {
    if (this.widgetComponentInstance?.editing !== undefined) {
      this.mutable = true;
    }
  }

  private _handleWidgetUpdate(widget: Widget | undefined) {
    if (!widget) {
      this.portal = undefined;
      return;
    }
    this.portal = createWidgetPortal(widget.name, widget.data);
  }

}
