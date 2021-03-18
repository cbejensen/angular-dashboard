import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import {
  Widget,
  WidgetComponentData,
  WidgetMeta,
  WidgetName,
} from '../widget-models';
import { WidgetService } from '../widget.service';
import {
  WidgetComponentGridSize,
  WidgetComponents,
  WIDGET_COMPONENTS_TOKEN,
} from '../WIDGET_COMPONENTS';
import { v4 as uuidv4 } from 'uuid';

export type AddWidgetDialogComponentReturnValue = string;

@Component({
  selector: 'fx-add-widget-dialog',
  templateUrl: './add-widget-dialog.component.html',
  styleUrls: ['./add-widget-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWidgetDialogComponent {
  widgets = this.widgetService.getWidgetMeta().pipe(
    // TODO: use noDeprecatedPipe?
    map((widgets) => widgets.filter((w) => !w.deprecated)),
    // Convert widget metadata into a widget.
    map<WidgetMeta[], Widget[]>((widgets) =>
      widgets.map(({ name, label }) => {
        const gridSize = this._getDefaultGridArea(name);
        const data = this._getDefaultData(name);
        return {
          id: uuidv4(),
          name,
          label,
          x: 0,
          y: 0,
          cols: gridSize[0],
          rows: gridSize[1],
          data,
        };
      })
    )
  );

  constructor(
    private widgetService: WidgetService,
    public matDialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(WIDGET_COMPONENTS_TOKEN) public widgetComponents: WidgetComponents
  ) {}

  private _getDefaultGridArea(name: WidgetName): WidgetComponentGridSize {
    return this.widgetComponents[name]?.defaultGridSize || [1, 1];
  }

  private _getDefaultData<Name extends WidgetName>(
    name: Name
  ): WidgetComponentData<Name> | undefined {
    return this.widgetComponents[name]
      ?.defaultData as WidgetComponentData<Name>;
  }

  close(selectedWidget: Widget) {
    this.matDialogRef.close(selectedWidget);
  }
}
