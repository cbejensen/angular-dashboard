import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Widget } from 'src/app/widgets/widget-models';
import { GridsterConfig } from 'angular-gridster2';

@Component({
  selector: 'fx-widget-grid',
  templateUrl: './widget-grid.component.html',
  styleUrls: ['./widget-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetGridComponent {
  config: GridsterConfig = {
    resizable: { enabled: true },
    draggable: { enabled: true, ignoreContent: true },
    pushItems: true,
    compactType: 'compactUp',
    gridType: 'verticalFixed',
    fixedRowHeight: 200,
    maxCols: 4,
    margin: 16,
    mobileBreakpoint: 700,
    keepFixedHeightInMobile: true,
    scrollToNewItems: true,
  };

  @Input() widgets: Widget[] = [];

}
