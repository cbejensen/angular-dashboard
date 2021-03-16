import { CdkPortal, CdkPortalOutlet, CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ContentChild,
  ViewChild,
  ComponentRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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

  @ViewChild(CdkPortalOutlet) cdkPortalOutlet: CdkPortalOutlet | undefined;

  portal: ComponentPortal<unknown> | undefined;

  private get portalComponentInstance(): AbstractWidgetComponent | undefined {
    return (this.cdkPortalOutlet?.attachedRef as ComponentRef<AbstractWidgetComponent>)?.instance;
  }

  constructor() {}

  private _handleWidgetUpdate(widget: Widget | undefined) {
    if (!widget) {
      this.portal = undefined;
      return;
    }
    this.portal = createWidgetPortal(widget.name, widget.data);
  }

  edit() {
    console.log(this.portalComponentInstance);
  }

}
